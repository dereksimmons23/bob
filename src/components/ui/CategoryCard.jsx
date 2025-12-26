export function CategoryCard({ category, onSelect, color }) {
  return (
    <div
      onClick={() => onSelect(category)}
      className="animate-scaleIn"
      style={{
        background: 'var(--bg-card)',
        border: `2px solid ${color}33`,
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}33`
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '18px',
        color: color,
        letterSpacing: '1px',
        marginBottom: '8px',
      }}>
        {category.name}
      </div>
      <div style={{
        fontSize: '13px',
        color: 'var(--text-secondary)',
      }}>
        {category.entrants.length} entrants
      </div>
    </div>
  )
}
