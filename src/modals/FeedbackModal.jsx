import { useState } from 'react'
import { Button } from '../components/ui'
import { supabase } from '../lib/supabase'

export function FeedbackModal({ onClose }) {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle, sending, sent, error

  const handleSubmit = async () => {
    if (!message.trim()) return

    setStatus('sending')
    try {
      const { error } = await supabase
        .from('feedback')
        .insert([{ message: message.trim(), category: 'general' }])

      if (error) throw error
      setStatus('sent')
      setTimeout(() => onClose(), 1500)
    } catch (err) {
      console.error('Feedback error:', err)
      setStatus('error')
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px',
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '2px solid var(--accent-gold)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: 'var(--accent-gold)',
          letterSpacing: '2px',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          SEND FEEDBACK
        </div>

        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '16px',
          textAlign: 'center',
          fontSize: '14px',
        }}>
          What's broken? What's fun? What would make you play again?
        </p>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your feedback..."
          disabled={status !== 'idle'}
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '12px',
            background: 'var(--bg-deep)',
            border: '2px solid var(--text-muted)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            resize: 'vertical',
            marginBottom: '16px',
          }}
        />

        {status === 'sent' && (
          <div style={{
            color: 'var(--accent-green)',
            textAlign: 'center',
            marginBottom: '16px',
            fontWeight: '600',
          }}>
            Thanks! BOB appreciates it.
          </div>
        )}

        {status === 'error' && (
          <div style={{
            color: 'var(--accent-red)',
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            Oops, something went wrong. Try again?
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={status === 'sending'}
            style={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!message.trim() || status === 'sending' || status === 'sent'}
            style={{ flex: 1 }}
          >
            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent!' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  )
}
