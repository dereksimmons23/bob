export function BobSays({ message, mood = 'normal', subtext = null }) {
  const moodColors = {
    normal: 'var(--accent-blue)',
    excited: 'var(--accent-gold)',
    dramatic: 'var(--accent-red)',
    victory: 'var(--accent-green)',
    chaos: 'var(--accent-pink)',
  }

  return (
    <div className="animate-slideUp" style={{
      background: 'var(--bg-card)',
      border: `2px solid ${moodColors[mood]}`,
      borderRadius: '16px',
      padding: '20px 24px',
      marginBottom: '24px',
      position: 'relative',
      boxShadow: `0 4px 24px ${moodColors[mood]}33`,
    }}>
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '20px',
        background: moodColors[mood],
        color: 'var(--bg-deep)',
        padding: '4px 12px',
        borderRadius: '20px',
        fontFamily: 'var(--font-display)',
        fontSize: '14px',
        letterSpacing: '1px',
      }}>
        BOB SAYS
      </div>
      <p style={{
        fontSize: '18px',
        lineHeight: '1.6',
        color: 'var(--text-primary)',
        marginTop: '8px',
      }}>
        "{message}"
      </p>
      {subtext && (
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          marginTop: '8px',
          fontStyle: 'italic',
        }}>
          {subtext}
        </p>
      )}
    </div>
  )
}
