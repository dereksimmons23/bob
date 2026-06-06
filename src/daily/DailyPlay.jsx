import { useState, useEffect } from 'react'
import { getPanelPick, PANEL_MODELS } from '../lib/panel'
import { getCrowdSplitSync } from '../lib/crowd'
import { simulateBobPath, simulateCrowdPath, roundLabel } from '../lib/dailyGame'
import { submitVote } from '../lib/crowd'
import { SoundEffects } from '../lib/sound'
import { BobVoice } from '../lib/voice'
import { getDeviceId } from '../lib/storage'

/**
 * The daily play loop. Two modes:
 *  - 'room'  (Read the Room): reveal BOB + crowd after every pick, score vs crowd.
 *  - 'panel' (Beat the Panel): blind — pick fast, BOB & crowd hidden until the end.
 */
export default function DailyPlay({ bracket, mode, onComplete, onExit }) {
  const totalRounds = Math.round(Math.log2(bracket.order.length))
  const totalMatchups = bracket.order.length - 1

  const [field, setField] = useState(bracket.order)
  const [winners, setWinners] = useState([])
  const [roundIndex, setRoundIndex] = useState(0)
  const [pairIndex, setPairIndex] = useState(0)
  const [phase, setPhase] = useState('choose') // choose | reveal
  const [reveal, setReveal] = useState(null)
  const [records, setRecords] = useState([])
  const [barFilled, setBarFilled] = useState(false)

  const a = field[pairIndex * 2]
  const b = field[pairIndex * 2 + 1]
  const matchupNo = records.length + 1

  const youScore = records.filter((r) => r.youHit).length
  const bobScore = records.filter((r) => r.bobHit).length

  // animate the crowd bar from 50/50 to actual once the reveal mounts
  useEffect(() => {
    if (phase === 'reveal' && mode === 'room') {
      setBarFilled(false)
      const t = setTimeout(() => setBarFilled(true), 60)
      return () => clearTimeout(t)
    }
  }, [phase, mode, matchupNo])

  function choose(youPick) {
    if (phase !== 'choose') return
    const panel = getPanelPick(a, b, bracket.bobRanking, { youPick })
    const crowd = getCrowdSplitSync(a, b, bracket, bracket.dayNumber)
    const youHit = youPick === crowd.winner
    const bobHit = panel.pick === crowd.winner

    const record = {
      a, b, youPick, bobPick: panel.pick, crowdWinner: crowd.winner,
      youHit, bobHit, roundIndex, panel, crowd,
    }
    const nextRecords = [...records, record]
    setRecords(nextRecords)

    // fire-and-forget real vote (no-op until Supabase is live)
    submitVote({ dayNumber: bracket.dayNumber, matchupId: `${a}|${b}`, pick: youPick, deviceId: getDeviceId() })

    SoundEffects.play('vote')

    if (mode === 'room') {
      setReveal({ youPick, panel, crowd, youHit, bobHit, records: nextRecords })
      setPhase('reveal')
      if (BobVoice.isAvailable()) BobVoice.speak(panel.line)
    } else {
      advance(youPick, nextRecords)
    }
  }

  function advance(forcedPick, recs) {
    const youPick = forcedPick ?? reveal.youPick
    const allRecords = recs ?? reveal?.records ?? records
    const newWinners = [...winners, youPick]
    const isLastPairInRound = (pairIndex + 1) * 2 >= field.length

    if (isLastPairInRound) {
      if (newWinners.length === 1) {
        finish(newWinners[0], allRecords)
        return
      }
      SoundEffects.play('roundComplete')
      setField(newWinners)
      setWinners([])
      setRoundIndex((r) => r + 1)
      setPairIndex(0)
    } else {
      SoundEffects.play('advance')
      setWinners(newWinners)
      setPairIndex((p) => p + 1)
    }
    setPhase('choose')
    setReveal(null)
  }

  function finish(youChampion, allRecords) {
    const bobSim = simulateBobPath(bracket.order, bracket)
    const crowdSim = simulateCrowdPath(bracket.order, bracket, bracket.dayNumber)

    const yScore = allRecords.filter((r) => r.youHit).length
    const bScore = allRecords.filter((r) => r.bobHit).length

    let outcome
    if (mode === 'room') {
      outcome = yScore > bScore ? 'win' : yScore < bScore ? 'loss' : 'push'
    } else {
      // Beat the Panel: your champion vs BOB's champion, crowd breaks ties
      if (youChampion === bobSim.champion) outcome = 'agree'
      else {
        const h2h = getCrowdSplitSync(youChampion, bobSim.champion, bracket, bracket.dayNumber)
        outcome = h2h.winner === youChampion ? 'win' : 'loss'
      }
    }

    SoundEffects.play('champion')
    onComplete({
      dayNumber: bracket.dayNumber,
      title: bracket.title,
      slug: bracket.slug,
      mode,
      youChampion,
      bobChampion: bobSim.champion,
      crowdChampion: crowdSim.champion,
      youScore: yScore,
      bobScore: bScore,
      total: totalMatchups,
      outcome,
      youWon: outcome === 'win',
      grid: allRecords.map((r) => ({ youHit: r.youHit, bobHit: r.bobHit })),
      playedAt: Date.now(),
    })
  }

  const seedA = bracket.bobRanking.indexOf(a) + 1
  const seedB = bracket.bobRanking.indexOf(b) + 1

  return (
    <div className="bd">
      <div className="bd-wrap">
        {/* header */}
        <div className="bd-mast">
          <button className="bd-iconbtn" onClick={onExit} aria-label="Exit">✕</button>
          <div className="bd-kicker">{roundLabel(roundIndex, totalRounds)} · {matchupNo}/{totalMatchups}</div>
          <div style={{ width: 38 }} />
        </div>

        {mode === 'room' && (
          <div className="bd-score" style={{ justifyContent: 'center', marginTop: 14 }}>
            <span className="s"><span className="lab">YOU</span> <span className="you-n">{youScore}</span></span>
            <span className="bd-dim">vs</span>
            <span className="s"><span className="bob-n">{bobScore}</span> <span className="lab">BOB</span></span>
          </div>
        )}

        <div className="bd-progress">
          {Array.from({ length: totalMatchups }).map((_, i) => (
            <span key={i} className={`bd-prog ${i < records.length ? 'done' : i === records.length ? 'now' : ''}`} />
          ))}
        </div>

        {/* matchup */}
        <div className="bd-spacer" style={{ minHeight: 18 }} />
        <div key={matchupNo}>
          <PickCard
            name={a} seed={seedA}
            chosen={phase === 'reveal' && reveal.youPick === a}
            faded={phase === 'reveal' && reveal.youPick !== a}
            disabled={phase === 'reveal'}
            onClick={() => choose(a)}
          />
          <div className="bd-vs">VS</div>
          <PickCard
            name={b} seed={seedB}
            chosen={phase === 'reveal' && reveal.youPick === b}
            faded={phase === 'reveal' && reveal.youPick !== b}
            disabled={phase === 'reveal'}
            onClick={() => choose(b)}
          />
        </div>

        {/* reveal */}
        {phase === 'reveal' && (
          <div className="bd-stack" style={{ marginTop: 18 }}>
            <BobReveal panel={reveal.panel} className="bd-anim bd-d1" />
            <CrowdBar a={a} b={b} crowd={reveal.crowd} filled={barFilled} className="bd-anim bd-d2" />
            <div className="bd-verdict bd-anim bd-d3">
              <Verdict who="YOU" hit={reveal.youHit} />
              <Verdict who="BOB" hit={reveal.bobHit} />
            </div>
            <button className="bd-btn bd-anim bd-d4" onClick={() => advance()}>
              {matchupNo === totalMatchups ? 'See the verdict' : 'Next'}
            </button>
          </div>
        )}

        {mode === 'panel' && phase === 'choose' && (
          <p className="bd-center bd-dim" style={{ marginTop: 18, fontSize: 13 }}>
            Blind mode. BOB and the crowd stay hidden until the end. Trust your gut.
          </p>
        )}

        <div className="bd-spacer" />
      </div>
    </div>
  )
}

function PickCard({ name, seed, chosen, faded, disabled, onClick }) {
  return (
    <button
      className={`bd-pick ${chosen ? 'you' : ''} ${faded ? 'fade' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {chosen && <span className="bd-pick-tag">Your pick</span>}
      <span className="bd-pick-seed">#{seed}</span>
      <span className="bd-pick-name">{name}</span>
    </button>
  )
}

function BobReveal({ panel, className }) {
  return (
    <div className={`bd-bob ${className}`}>
      <div className="bd-bob-head">🎙 BOB · the panel ruled {panel.onBob}/12</div>
      <div className="bd-bob-line">{panel.line}</div>
      <div className="bd-panel-dots">
        {PANEL_MODELS.map((m, i) => (
          <span key={m} className={`bd-dot ${i < panel.onBob ? 'on' : ''}`} title={m} />
        ))}
        <span className="bd-panel-label">picks {panel.pick}</span>
      </div>
    </div>
  )
}

function CrowdBar({ a, b, crowd, filled, className }) {
  const pctA = filled ? crowd.pctA : 50
  const pctB = filled ? crowd.pctB : 50
  return (
    <div className={`bd-crowd-row ${className}`}>
      <div className="bd-crowd-head">
        <span>The Crowd</span>
        <span>{crowd.winner} takes it</span>
      </div>
      <div className="bd-bar">
        <div className="bd-bar-seg bd-bar-a" style={{ width: `${pctA}%` }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{a}</span>
          <span className="pct">{crowd.pctA}%</span>
        </div>
        <div className="bd-bar-seg bd-bar-b" style={{ width: `${pctB}%` }}>
          <span className="pct">{crowd.pctB}%</span>
        </div>
      </div>
      {crowd.source === 'estimate' && (
        <div className="bd-estimate">◦ early read — live crowd data coming soon</div>
      )}
    </div>
  )
}

function Verdict({ who, hit }) {
  return (
    <div className={`bd-chip ${hit ? 'hit' : 'miss'}`}>
      <span className="who">{who}</span>
      <span>{hit ? '✓ read it' : '✗ missed'}</span>
    </div>
  )
}
