export function Input({ value, onChange, placeholder, onKeyDown, style = {} }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '16px 20px',
        fontSize: '18px',
        fontFamily: 'var(--font-body)',
        background: 'var(--bg-card)',
        border: '2px solid var(--text-muted)',
        borderRadius: '12px',
        color: 'var(--text-primary)',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        ...style,
      }}
      onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
      onBlur={(e) => e.target.style.borderColor = 'var(--text-muted)'}
    />
  )
}
