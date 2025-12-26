import { useState, useEffect } from 'react'
import { Button } from '../components/ui'
import { supabase } from '../lib/supabase'

export function FeedbackAdmin({ onClose }) {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeedback()
  }, [])

  const loadFeedback = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setFeedback(data)
    }
    setLoading(false)
  }

  const deleteFeedback = async (id) => {
    await supabase.from('feedback').delete().eq('id', id)
    setFeedback(feedback.filter(f => f.id !== id))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px',
      overflowY: 'auto',
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '2px solid var(--accent-purple)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '600px',
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            color: 'var(--accent-purple)',
            letterSpacing: '2px',
          }}>
            FEEDBACK ({feedback.length})
          </div>
          <Button variant="ghost" size="small" onClick={onClose}>Close</Button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
            Loading...
          </div>
        ) : feedback.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
            No feedback yet
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {feedback.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-deep)',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid var(--text-muted)',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                  }}>
                    {formatDate(item.created_at)}
                  </div>
                  <button
                    onClick={() => deleteFeedback(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-red)',
                      cursor: 'pointer',
                      fontSize: '12px',
                      opacity: 0.7,
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div style={{
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                }}>
                  {item.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
