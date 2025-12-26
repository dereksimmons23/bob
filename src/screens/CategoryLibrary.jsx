import { useState } from 'react'
import { Button, Logo, CategoryCard, ThemePill } from '../components/ui'
import { CATEGORY_LIBRARY } from '../data/categories'

export function CategoryLibrary({ onSelect, onCustom, onBack, customCategories }) {
  const [activeTheme, setActiveTheme] = useState('food')
  const themes = Object.keys(CATEGORY_LIBRARY)
  const currentThemeData = CATEGORY_LIBRARY[activeTheme]

  const handleSurpriseMe = () => {
    const allCategories = []
    Object.entries(CATEGORY_LIBRARY).forEach(([theme, data]) => {
      data.categories.forEach(cat => {
        allCategories.push({ ...cat, theme })
      })
    })
    const random = allCategories[Math.floor(Math.random() * allCategories.length)]
    onSelect(random, random.theme)
  }

  // Get featured categories
  const featuredCategories = []
  Object.entries(CATEGORY_LIBRARY).forEach(([theme, data]) => {
    data.categories.forEach(cat => {
      if (cat.featured) {
        featuredCategories.push({ ...cat, theme, color: data.color })
      }
    })
  })

  return (
    <div style={{ minHeight: '100vh', padding: '24px', maxWidth: '700px', margin: '0 auto' }}>
      <Logo size="small" onClick={onBack} />

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          color: 'var(--accent-gold)',
          letterSpacing: '3px',
          marginBottom: '8px',
        }}>
          PICK A CATEGORY
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '16px',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--bg-elevated)',
      }}>
        <div style={{ width: '100%', textAlign: 'center', marginBottom: '8px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Quick start:</span>
        </div>
        <Button variant="primary" size="large" onClick={handleSurpriseMe}>Surprise Me!</Button>
        <Button variant="secondary" onClick={onCustom}>Create Custom</Button>
      </div>

      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            color: 'var(--accent-gold)',
            letterSpacing: '2px',
            marginBottom: '12px',
            textAlign: 'center',
          }}>
            HOT TAKES
          </div>
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px',
            WebkitOverflowScrolling: 'touch',
          }}>
            {featuredCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onSelect(cat, cat.theme)}
                style={{
                  flexShrink: 0,
                  background: 'var(--bg-card)',
                  border: `2px solid ${cat.color}`,
                  borderRadius: '12px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  minWidth: '160px',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  color: cat.color,
                  letterSpacing: '1px',
                }}>
                  {cat.name}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}>
                  {cat.entrants.length} entrants
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
         or browse by theme
      </div>

      {/* Theme Pills */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '24px',
        justifyContent: 'center',
      }}>
        {themes.map(theme => (
          <ThemePill
            key={theme}
            theme={theme}
            isActive={activeTheme === theme}
            onClick={() => setActiveTheme(theme)}
          />
        ))}
      </div>

      {/* Category Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {currentThemeData.categories.map((cat, i) => (
          <CategoryCard
            key={cat.name}
            category={cat}
            color={currentThemeData.color}
            onSelect={() => onSelect(cat, activeTheme)}
          />
        ))}
      </div>

      {/* Custom Categories */}
      {customCategories.length > 0 && (
        <>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            color: 'var(--text-secondary)',
            letterSpacing: '2px',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            YOUR CUSTOM CATEGORIES
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {customCategories.map((cat, i) => (
              <CategoryCard
                key={cat.name}
                category={cat}
                color="var(--accent-pink)"
                onSelect={() => onSelect(cat, 'custom')}
              />
            ))}
          </div>
        </>
      )}

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Button variant="ghost" onClick={onBack}>Home</Button>
      </div>
    </div>
  )
}
