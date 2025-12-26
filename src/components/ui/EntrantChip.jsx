export function EntrantChip({ name, onRemove, index }) {
  return (
    <div className="animate-scaleIn" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'var(--bg-card-hover)',
      border: '1px solid var(--text-muted)',
      borderRadius: '24px',
      padding: '8px 16px',
      animationDelay: `${index * 0.03}s`,
    }}>
      <span style={{ fontSize: '14px' }}>{name}</span>
      {onRemove && (
        <button onClick={onRemove} style={{
          background: 'none', border: 'none', color: 'var(--text-secondary)',
          cursor: 'pointer', padding: '2px', display: 'flex', fontSize: '16px',
        }}>×</button>
      )}
    </div>
  )
}
