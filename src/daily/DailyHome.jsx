import { getStreak } from '../lib/daily'

const MODE_COPY = {
  room:  { label: 'Read the Room', sub: 'Match the board. Beat BOB.' },
  panel: { label: 'Beat the Panel', sub: 'Blind. You vs 12 models.' },
}

export default function DailyHome({ bracket, mode, setMode, onPlay, todayResult, onSeeResult, onFreeplay, onSettings }) {
  const streak = getStreak()
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="bd">
      <div className="bd-wrap">
        <div className="bd-mast">
          <div className="bd-mast-logo">BOB <b>DAILY</b></div>
          <button className="bd-iconbtn" onClick={onSettings} aria-label="Settings">⚙</button>
        </div>

        <div className="bd-spacer" style={{ minHeight: 16 }} />

        {/* the ticket */}
        <div className="bd-ticket bd-anim bd-d1">
          <div className="bd-kicker">Today's Card · #{bracket.dayNumber} · {dateStr}</div>
          <h1 className="bd-display" style={{ fontSize: 'clamp(40px,13vw,68px)', marginTop: 14 }}>
            {bracket.title}
          </h1>
          <p className="bd-dim" style={{ marginTop: 14, fontSize: 15, lineHeight: 1.5 }}>
            {bracket.blurb}
          </p>
          <div className="bd-kicker" style={{ marginTop: 16, color: 'var(--bd-faint)' }}>
            8 enter · 1 leaves · ~30 seconds
          </div>
        </div>

        <div className="bd-spacer" style={{ minHeight: 18 }} />

        {todayResult ? (
          <div className="bd-stack bd-anim bd-d2">
            <div className="bd-center">
              <div className="bd-kicker">You've played today</div>
              <div className="bd-display" style={{ fontSize: 28, marginTop: 8 }}>
                {todayResult.mode === 'room'
                  ? `You ${todayResult.youScore} · BOB ${todayResult.bobScore}`
                  : todayResult.outcome === 'win' ? 'You beat the panel' : 'The panel held'}
              </div>
            </div>
            <button className="bd-btn" onClick={onSeeResult}>See your result</button>
            <button className="bd-btn bd-btn--ghost" onClick={onFreeplay}>Free Play — more brackets</button>
          </div>
        ) : (
          <div className="bd-stack bd-anim bd-d2">
            <div className="bd-toggle">
              {Object.entries(MODE_COPY).map(([key, copy]) => (
                <button key={key} className={mode === key ? 'on' : ''} onClick={() => setMode(key)}>
                  {copy.label}
                  <small>{copy.sub}</small>
                </button>
              ))}
            </div>
            <button className="bd-btn" onClick={onPlay}>Step In</button>
            <button className="bd-btn bd-btn--ghost" onClick={onFreeplay}>Free Play — more brackets</button>
          </div>
        )}

        <div className="bd-spacer" />

        <div className="bd-center bd-mono bd-anim bd-d3" style={{ fontSize: 12, color: 'var(--bd-faint)', letterSpacing: '0.08em', marginTop: 24 }}>
          {streak.played > 0
            ? `PLAYED ${streak.played} · BEAT BOB ${streak.beatBob} · 🔥 ${streak.currentStreak}`
            : 'Play against BOB and the panel of 12 models'}
        </div>
      </div>
    </div>
  )
}
