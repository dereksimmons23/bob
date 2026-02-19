import { useState, useEffect } from 'react'
import { Logo, Button } from '../components/ui'
import { BobSays } from '../components'
import { BOB } from '../data/bob'
import { BobVoice } from '../lib/voice'

/**
 * Home screen with main navigation
 */
export function HomeScreen({
  historyCount,
  onQuickStart,
  onCustomBracket,
  onViewVault,
  onMarchMadness,
  onOpenSettings,
  onHowToPlay,
}) {
  const [welcomeMessage] = useState(() => BOB.random(BOB.welcome))

  useEffect(() => {
    BobVoice.speak(welcomeMessage)
  }, [welcomeMessage])

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
          🎯 Pick a Category
        </Button>
        <Button variant="secondary" size="huge" onClick={onCustomBracket}>
          ✏️ Custom Bracket
        </Button>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button variant="ghost" onClick={onViewVault}>
          🏆 The Vault{historyCount > 0 ? ` (${historyCount})` : ''}
        </Button>
        {onHowToPlay && (
          <Button variant="ghost" onClick={onHowToPlay}>
            ❓ How to Play
          </Button>
        )}
      </div>

      {/* March Madness */}
      <div style={{ marginTop: '16px' }}>
        <button
          onClick={onMarchMadness}
          style={{
            background: 'linear-gradient(135deg, #FF6D00 0%, #FF8F00 50%, #FF6D00 100%)',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 28px',
            cursor: 'pointer',
            fontSize: '16px',
            fontFamily: 'var(--font-display)',
            color: '#1a1a2e',
            letterSpacing: '2px',
            boxShadow: '0 4px 15px rgba(255, 109, 0, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 109, 0, 0.6)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 109, 0, 0.4)'
          }}
        >
          🏀 MARCH MADNESS
        </button>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
          8 tournament brackets · settle the debates
        </div>
      </div>

      <a
        href="https://claudewill.io"
        style={{
          marginTop: '32px',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--text-muted)',
          textDecoration: 'none',
          letterSpacing: '0.5px',
          opacity: 0.6,
          transition: 'opacity 0.2s',
        }}
        onMouseOver={e => { e.currentTarget.style.opacity = '1' }}
        onMouseOut={e => { e.currentTarget.style.opacity = '0.6' }}
      >
        claudewill<span style={{ color: 'var(--accent-gold)' }}>*</span>
      </a>

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
