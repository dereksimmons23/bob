import { Button } from '../components/ui'

export function DevToolsModal({ onClose, onClearAll, onResetFirstVisit, onResetVault }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 300,
      padding: '20px',
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '2px solid var(--accent-pink)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: 'var(--accent-pink)',
          letterSpacing: '2px',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          DEV TOOLS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button variant="secondary" onClick={() => { onResetFirstVisit(); onClose(); }}>
            Reset First Visit (show About)
          </Button>
          <Button variant="secondary" onClick={() => { onResetVault(); onClose(); }}>
            Reset Vault to Seed Data
          </Button>
          <Button variant="danger" onClick={() => { onClearAll(); onClose(); }}>
            Clear All localStorage
          </Button>
        </div>

        <div style={{
          marginTop: '24px',
          padding: '12px',
          background: 'var(--bg-deep)',
          borderRadius: '8px',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}>
          <div><strong>Tip:</strong> Add <code>?dev=true</code> to URL to access dev tools</div>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}
