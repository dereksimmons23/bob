import { Button } from './ui'

export function ConfirmModal({ message, onConfirm, onCancel, confirmText = "Yes", cancelText = "Cancel", variant = "danger" }) {
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
        border: `2px solid ${variant === 'danger' ? 'var(--accent-red)' : 'var(--accent-gold)'}`,
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '18px',
          color: 'var(--text-primary)',
          lineHeight: '1.6',
          marginBottom: '24px',
        }}>
          {message}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Button variant="ghost" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'secondary' : 'primary'}
            onClick={onConfirm}
            style={variant === 'danger' ? { background: 'var(--accent-red)', borderColor: 'var(--accent-red)' } : {}}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
