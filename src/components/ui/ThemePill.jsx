import { CATEGORY_LIBRARY } from '../../data/categories'

export function ThemePill({ theme, isActive, onClick }) {
  const data = CATEGORY_LIBRARY[theme]
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        borderRadius: '24px',
        border: isActive ? `2px solid ${data.color}` : '2px solid var(--text-muted)',
        background: isActive ? `${data.color}22` : 'transparent',
        color: isActive ? data.color : 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <span>{data.icon}</span>
      <span>{data.name}</span>
    </button>
  )
}
