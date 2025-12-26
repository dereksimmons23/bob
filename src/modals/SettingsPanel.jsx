import { Button } from '../components/ui'

export function SettingsPanel({ soundEnabled, onToggleSound, onFeedback, onAdmin, onAbout, onLegal, onDevTools, isDevMode, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'var(--bg-card)',
      border: '2px solid var(--text-muted)',
      borderRadius: '16px',
      padding: '20px',
      zIndex: 100,
      minWidth: '200px',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '16px',
        color: 'var(--accent-gold)',
        letterSpacing: '2px',
        marginBottom: '16px',
      }}>
        SETTINGS
      </div>

      <div
        onClick={onToggleSound}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          background: 'var(--bg-card-hover)',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        <span style={{ color: 'var(--text-primary)' }}>Sound Effects</span>
        <span style={{ color: soundEnabled ? 'var(--accent-green)' : 'var(--text-muted)' }}>
          {soundEnabled ? 'ON' : 'OFF'}
        </span>
      </div>

      <div
        onClick={() => { onClose(); onFeedback(); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          background: 'var(--bg-card-hover)',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        <span style={{ color: 'var(--text-primary)' }}>Send Feedback</span>
        <span style={{ color: 'var(--accent-blue)' }}></span>
      </div>

      <div
        onClick={() => { onClose(); onAdmin(); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          background: 'var(--bg-card-hover)',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        <span style={{ color: 'var(--text-primary)' }}>View Feedback</span>
        <span style={{ color: 'var(--accent-purple)' }}></span>
      </div>

      <div
        onClick={() => { onClose(); onAbout(); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          background: 'var(--bg-card-hover)',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        <span style={{ color: 'var(--text-primary)' }}>About</span>
        <span style={{ color: 'var(--accent-gold)' }}>i</span>
      </div>

      <div
        onClick={() => { window.open('https://ko-fi.com/derekclaude', '_blank'); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          background: 'linear-gradient(135deg, #ff5e5b22, #ff793f22)',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '12px',
          border: '1px solid #ff5e5b44',
        }}
      >
        <span style={{ color: 'var(--text-primary)' }}>Tip BOB a Coffee</span>
        <span></span>
      </div>

      <div
        onClick={() => { onClose(); onLegal(); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          background: 'var(--bg-card-hover)',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
      >
        <span style={{ color: 'var(--text-primary)' }}>Privacy & Terms</span>
        <span style={{ color: 'var(--text-muted)' }}></span>
      </div>

      {isDevMode && (
        <div
          onClick={() => { onClose(); onDevTools(); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            background: 'var(--bg-card-hover)',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '12px',
            border: '1px dashed var(--accent-pink)',
          }}
        >
          <span style={{ color: 'var(--accent-pink)' }}>Dev Tools</span>
          <span style={{ color: 'var(--accent-pink)' }}></span>
        </div>
      )}

      <Button variant="ghost" size="small" onClick={onClose} style={{ width: '100%' }}>
        Close
      </Button>
    </div>
  )
}
