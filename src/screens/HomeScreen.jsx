import { useState } from 'react'
import { Logo, Button } from '../components/ui'
import { BobSays } from '../components'
import { BOB } from '../data/bob'

/**
 * Home screen with main navigation
 */
export function HomeScreen({
  historyCount,
  onQuickStart,
  onCustomBracket,
  onViewVault,
  onYearInReview,
  onOpenSettings,
}) {
  const [welcomeMessage] = useState(() => BOB.random(BOB.welcome))

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <Logo size="large" />
      <BobSays message={welcomeMessage} mood="normal" />

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary" size="huge" onClick={onQuickStart}>
          🎯 Quick Start
        </Button>
        <Button variant="secondary" size="huge" onClick={onCustomBracket}>
          ✏️ Custom Bracket
        </Button>
      </div>

      <div style={{ marginTop: '24px' }}>
        <Button variant="ghost" size="large" onClick={onViewVault}>
          🏆 The Vault{historyCount > 0 ? ` (${historyCount})` : ''}
        </Button>
      </div>

      {/* Year in Review - special NYE mode */}
      <div style={{ marginTop: '16px' }}>
        <button
          onClick={onYearInReview}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 28px',
            cursor: 'pointer',
            fontSize: '16px',
            fontFamily: 'var(--font-display)',
            color: '#1a1a2e',
            letterSpacing: '2px',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.6)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.4)'
          }}
        >
          🥂 YEAR IN REVIEW 2025
        </button>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
          4 brackets → 1 MVP
        </div>
      </div>

      <button
        onClick={onOpenSettings}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--bg-card)',
          border: '2px solid var(--text-muted)',
          borderRadius: '12px',
          padding: '10px 14px',
          cursor: 'pointer',
          fontSize: '18px',
          color: 'var(--text-primary)',
        }}
      >
        ⚙️
      </button>
    </div>
  )
}
