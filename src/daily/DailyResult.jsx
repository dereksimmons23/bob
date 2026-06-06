import { useState, useEffect } from 'react'
import { msUntilTomorrow, getStreak } from '../lib/daily'

const HEADLINE = {
  win:   { room: 'You read the room better than BOB.', panel: 'You beat the panel.' },
  loss:  { room: 'BOB read the room better. Today.',    panel: 'The panel held. BOB takes it.' },
  push:  { room: 'Dead even with BOB.',                 panel: 'Dead even with BOB.' },
  agree: { room: 'You and BOB think alike.',            panel: 'You picked exactly what the panel did.' },
}

const BOB_CLOSER = {
  win:   ['Beginner\'s luck. Probably. See you tomorrow.', 'Enjoy it. The panel reconvenes at midnight.', 'Well played. I won\'t forget this.'],
  loss:  ['The panel and I thank you for playing.', 'Twelve models don\'t lie. Often.', 'Better luck tomorrow. You\'ll need it.'],
  push:  ['A draw. We are evenly matched, you and I.', 'Nobody wins. Nobody loses. Very European.'],
  agree: ['You think like the machine. Take that however you like.', 'Spooky. Almost suspicious.'],
}

function pick(arr, seed) { return arr[seed % arr.length] }

export default function DailyResult({ result, onReplay, onFreeplay, onHome }) {
  const [copied, setCopied] = useState(false)
  const [countdown, setCountdown] = useState(fmt(msUntilTomorrow()))
  const streak = getStreak()

  useEffect(() => {
    const t = setInterval(() => setCountdown(fmt(msUntilTomorrow())), 1000)
    return () => clearInterval(t)
  }, [])

  const headline = HEADLINE[result.outcome][result.mode]
  const closer = pick(BOB_CLOSER[result.outcome] || BOB_CLOSER.push, result.dayNumber)

  const shareText = buildShareText(result)

  async function share() {
    try {
      if (navigator.share && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        await navigator.share({ text: shareText })
        return
      }
    } catch { /* fall through to clipboard */ }
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  return (
    <div className="bd">
      <div className="bd-wrap">
        <div className="bd-mast">
          <div className="bd-mast-logo">BOB <b>DAILY</b></div>
          <div className="bd-kicker">#{result.dayNumber}</div>
        </div>

        <div className="bd-stack" style={{ marginTop: 22 }}>
          <div className="bd-center bd-anim bd-d1">
            <div className="bd-kicker">{result.title}</div>
            <h1 className="bd-display" style={{ fontSize: 'clamp(30px,9vw,46px)', marginTop: 10 }}>
              {headline}
            </h1>
            {result.mode === 'room' && (
              <div className="bd-score" style={{ justifyContent: 'center', marginTop: 14, fontSize: 16 }}>
                <span className="s"><span className="lab">YOU</span> <span className="you-n">{result.youScore}</span></span>
                <span className="bd-dim">/{result.total} · </span>
                <span className="s"><span className="bob-n">{result.bobScore}</span> <span className="lab">BOB</span></span>
              </div>
            )}
          </div>

          {/* three champions */}
          <div className="bd-champ-grid bd-anim bd-d2">
            <Champ who="You" name={result.youChampion} cls="you" />
            <Champ who="The Crowd" name={result.crowdChampion} cls="crowd" />
            <Champ who="BOB" name={result.bobChampion} cls="bob" />
          </div>

          {/* grid */}
          {result.mode === 'room' && (
            <div className="bd-anim bd-d2" style={{ marginTop: 4 }}>
              <GridRow lab="YOU" cells={result.grid.map((g) => g.youHit)} mark />
              <GridRow lab="BOB" cells={result.grid.map((g) => g.bobHit)} />
            </div>
          )}

          {/* BOB closer */}
          <div className="bd-bob bd-anim bd-d3">
            <div className="bd-bob-head">🎙 BOB</div>
            <div className="bd-bob-line">{closer}</div>
          </div>

          {/* streak */}
          <div className="bd-center bd-mono bd-anim bd-d3" style={{ fontSize: 12, color: 'var(--bd-dim)', letterSpacing: '0.08em' }}>
            PLAYED {streak.played} · BEAT BOB {streak.beatBob} · 🔥 {streak.currentStreak}
          </div>

          <button className="bd-btn bd-anim bd-d4" onClick={share}>
            {copied ? 'Copied ✓' : 'Share result'}
          </button>

          <div className="bd-center bd-kicker bd-anim bd-d4">Next bracket in {countdown}</div>

          <div className="bd-anim bd-d4" style={{ display: 'flex', gap: 10 }}>
            <button className="bd-btn bd-btn--ghost" onClick={onFreeplay} style={{ flex: 1 }}>Free Play</button>
            <button className="bd-btn bd-btn--ghost" onClick={onHome} style={{ flex: 1 }}>Home</button>
          </div>

          {import.meta.env?.DEV && (
            <button className="bd-btn bd-btn--ghost" onClick={onReplay}>↻ Replay (dev)</button>
          )}
        </div>
        <div className="bd-spacer" />
      </div>
    </div>
  )
}

function Champ({ who, name, cls }) {
  return (
    <div className={`bd-champ ${cls}`}>
      <div className="who">{who}</div>
      <div className="name">{name}</div>
    </div>
  )
}

function GridRow({ lab, cells, mark }) {
  return (
    <div className="bd-grid-row">
      <span className="lab">{lab}</span>
      {cells.map((hit, i) => (
        <span key={i} className={`bd-sq ${hit ? 'win' : ''} ${mark ? 'you' : ''}`} />
      ))}
    </div>
  )
}

/* ---------- share text ---------- */

function buildShareText(r) {
  const url = 'bob.claudewill.io'
  const head = `BOB Daily #${r.dayNumber} — ${r.title}`
  if (r.mode === 'room') {
    const grid = r.grid.map((g) => (g.youHit ? '🟩' : '⬛')).join('')
    return `${head}\nRead the Room: Me ${r.youScore}/${r.total} 🆚 BOB ${r.bobScore}/${r.total}\n${grid}\n${url}`
  }
  // panel mode
  const verdict =
    r.outcome === 'win' ? `I beat the 12-model panel 🏆`
    : r.outcome === 'agree' ? `I picked exactly what the panel did 🤖`
    : `The panel held. BOB got me.`
  return `${head}\nBeat the Panel — ${verdict}\nMy champ: ${r.youChampion} · BOB's: ${r.bobChampion}\n${url}`
}

function fmt(ms) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = String(Math.floor(s / 3600)).padStart(2, '0')
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const sec = String(s % 60).padStart(2, '0')
  return `${h}:${m}:${sec}`
}
