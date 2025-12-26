export function Logo({ size = 'large', onClick = null }) {
  const sizes = {
    large: { title: '64px', sub: '18px' },
    medium: { title: '42px', sub: '14px' },
    small: { title: '28px', sub: '12px' },
  }

  return (
    <div
      onClick={onClick}
      style={{
        textAlign: 'center',
        marginBottom: size === 'large' ? '40px' : '20px',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: sizes[size].title,
        letterSpacing: '3px',
        background: 'linear-gradient(135deg, var(--accent-gold) 0%, #ffed4a 50%, var(--accent-gold) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 4px 30px rgba(255, 215, 0, 0.3)',
        lineHeight: 1.1,
      }}>
        BATTLE o'<br/>BRACKETS
      </h1>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: sizes[size].sub,
        color: 'var(--text-secondary)',
        marginTop: '8px',
        letterSpacing: '4px',
        textTransform: 'uppercase',
      }}>
        Hosted by BOB
      </p>
    </div>
  )
}
