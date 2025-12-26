export function Button({ children, onClick, variant = 'primary', disabled = false, size = 'medium', style = {}, className = '' }) {
  const variants = {
    primary: { background: 'linear-gradient(135deg, var(--accent-gold) 0%, #e6c200 100%)', color: 'var(--bg-deep)', border: 'none' },
    secondary: { background: 'transparent', color: 'var(--text-primary)', border: '2px solid var(--text-muted)' },
    danger: { background: 'linear-gradient(135deg, var(--accent-red) 0%, #cc2f4a 100%)', color: 'white', border: 'none' },
    success: { background: 'linear-gradient(135deg, var(--accent-green) 0%, #00b862 100%)', color: 'var(--bg-deep)', border: 'none' },
    ghost: { background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--text-muted)' },
  }
  const sizes = {
    tiny: { padding: '6px 12px', fontSize: '12px' },
    small: { padding: '14px 24px', fontSize: '14px', minHeight: '44px' },
    medium: { padding: '14px 28px', fontSize: '16px' },
    large: { padding: '18px 36px', fontSize: '18px' },
    huge: { padding: '24px 48px', fontSize: '22px' },
  }

  return (
    <button onClick={onClick} disabled={disabled} className={className} style={{
      ...variants[variant], ...sizes[size],
      fontFamily: 'var(--font-display)',
      letterSpacing: '2px',
      borderRadius: '12px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s ease',
      textTransform: 'uppercase',
      ...style,
    }}>
      {children}
    </button>
  )
}
