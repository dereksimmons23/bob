import { useState, useEffect } from 'react'
import { Button, Logo } from '../components/ui'
import { BobSays } from '../components/BobSays'
import { BOB } from '../data/bob'
import { supabase } from '../lib/supabase'

export function VaultScreen({ history, onBack, onNewGame, onClearHistory, onDeleteEntry, onEditEntry, onConfirmDelete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [isSharing, setIsSharing] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const [vaultShareLink, setVaultShareLink] = useState(null)
  const [vaultShareCopied, setVaultShareCopied] = useState(false)
  const [isVaultSharing, setIsVaultSharing] = useState(false)

  // Share individual vault entry
  const shareEntry = async (entry) => {
    setIsSharing(true)
    try {
      const { data, error } = await supabase
        .from('shared_brackets')
        .insert({
          category: entry.category,
          champion: entry.champion,
          runner_up: entry.runnerUp,
          entrants: entry.entrants || [],
          player_count: entry.playerCount || 1,
          bob_comment: entry.bobComment || entry.note || '',
          matchup_results: entry.matchupResults || [],
        })
        .select('id')
        .single()

      if (error) throw error

      const link = `${window.location.origin}/b/${data.id}`

      if (navigator.share) {
        try {
          await navigator.share({
            title: `${entry.champion} - ${entry.category}`,
            text: `${entry.champion} was crowned champion of ${entry.category}!`,
            url: link,
          })
          setIsSharing(false)
          return
        } catch (e) {
          // Fall through to clipboard
        }
      }

      await navigator.clipboard.writeText(link)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    } catch (err) {
      console.error('Error sharing entry:', err)
      alert('Failed to create share link. Please try again.')
    } finally {
      setIsSharing(false)
    }
  }

  // Share entire vault
  const shareVault = async () => {
    if (history.length === 0) return

    setIsVaultSharing(true)
    try {
      const { data, error } = await supabase
        .from('shared_vaults')
        .insert({
          champions: history.map(h => ({
            category: h.category,
            champion: h.champion,
            runnerUp: h.runnerUp,
            date: h.date,
            bobComment: h.bobComment || h.note || '',
          })),
          champion_count: history.length,
        })
        .select('id')
        .single()

      if (error) throw error

      const link = `${window.location.origin}/v/${data.id}`
      setVaultShareLink(link)

      if (navigator.share) {
        try {
          await navigator.share({
            title: `My Champion Vault (${history.length})`,
            text: `Check out my ${history.length} crowned champions!`,
            url: link,
          })
          setIsVaultSharing(false)
          return
        } catch (e) {
          // Fall through to clipboard
        }
      }

      await navigator.clipboard.writeText(link)
      setVaultShareCopied(true)
      setTimeout(() => setVaultShareCopied(false), 2000)
    } catch (err) {
      console.error('Error sharing vault:', err)
      alert('Failed to create share link. Please try again.')
    } finally {
      setIsVaultSharing(false)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (editingIndex !== null) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentIndex(i => Math.max(0, i - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentIndex(i => Math.min(history.length - 1, i + 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [history.length, editingIndex])

  const startEdit = (entry) => {
    setEditingIndex(currentIndex)
    setEditForm({
      champion: entry.champion,
      runnerUp: entry.runnerUp,
      note: entry.bobComment || entry.note || '',
    })
  }

  const saveEdit = () => {
    onEditEntry(currentIndex, {
      champion: editForm.champion,
      runnerUp: editForm.runnerUp,
      bobComment: editForm.note,
      note: editForm.note,
    })
    setEditingIndex(null)
    setEditForm({})
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditForm({})
  }

  const handleDelete = () => {
    onConfirmDelete(currentIndex, history[currentIndex])
    if (currentIndex >= history.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Empty state
  if (history.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}>
        <Logo size="medium" onClick={onBack} />
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          color: 'var(--accent-gold)',
          letterSpacing: '3px',
          marginBottom: '24px',
        }}>
          THE VAULT
        </div>
        <BobSays message={BOB.random(BOB.vaultEmpty)} mood="normal" />
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <Button variant="primary" size="large" onClick={onNewGame}>
            Crown Your First Champion
          </Button>
          <Button variant="ghost" size="large" onClick={onBack}>
            Home
          </Button>
        </div>
      </div>
    )
  }

  const entry = history[currentIndex]
  const isEditing = editingIndex === currentIndex

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '120px',
    }}>
      {/* Header */}
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Logo size="small" onClick={onBack} />
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          color: 'var(--accent-gold)',
          letterSpacing: '3px',
          marginBottom: '8px',
        }}>
          THE VAULT
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          {currentIndex + 1} of {history.length} champions
        </div>
      </div>

      {/* Champion Card */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        maxWidth: '500px',
        margin: '0 auto',
        width: '100%',
      }}>
        <div
          key={currentIndex}
          className="animate-slideUp"
          style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--accent-gold)',
            borderRadius: '20px',
            padding: '32px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', letterSpacing: '2px', textAlign: 'center' }}>
                {entry.category.toUpperCase()} {entry.date}
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Champion</label>
                <input
                  type="text"
                  value={editForm.champion}
                  onChange={(e) => setEditForm({...editForm, champion: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--bg-deep)',
                    border: '2px solid var(--accent-gold)',
                    borderRadius: '8px',
                    color: 'var(--accent-gold)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    textAlign: 'center',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Runner-up</label>
                <input
                  type="text"
                  value={editForm.runnerUp}
                  onChange={(e) => setEditForm({...editForm, runnerUp: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: 'var(--bg-deep)',
                    border: '1px solid var(--text-muted)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    textAlign: 'center',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>BOB's Comment</label>
                <input
                  type="text"
                  value={editForm.note}
                  onChange={(e) => setEditForm({...editForm, note: e.target.value})}
                  placeholder="A memorable moment..."
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: 'var(--bg-deep)',
                    border: '1px solid var(--text-muted)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
                <Button variant="primary" onClick={saveEdit}>Save</Button>
                <Button variant="ghost" onClick={cancelEdit}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                letterSpacing: '2px',
                marginBottom: '16px',
              }}>
                {entry.category.toUpperCase()}
              </div>

              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                color: 'var(--accent-gold)',
                letterSpacing: '2px',
                marginBottom: '12px',
                lineHeight: '1.2',
              }}>
                {entry.champion.toUpperCase()}
              </div>

              <div style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                defeated <span style={{ color: 'var(--text-primary)' }}>{entry.runnerUp}</span>
              </div>

              {(entry.bobComment || entry.note) && (
                <div style={{
                  fontSize: '15px',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  padding: '16px',
                  background: 'var(--bg-deep)',
                  borderRadius: '12px',
                  marginBottom: '16px',
                }}>
                  "{entry.bobComment || entry.note}"
                </div>
              )}

              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Crowned {entry.date}
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => shareEntry(entry)}
                  disabled={isSharing}
                  style={{
                    background: shareCopied ? 'var(--accent-gold)' : 'var(--bg-deep)',
                    border: `1px solid ${shareCopied ? 'var(--accent-gold)' : 'var(--text-muted)'}`,
                    borderRadius: '8px',
                    color: shareCopied ? 'var(--bg-deep)' : 'var(--text-secondary)',
                    cursor: isSharing ? 'wait' : 'pointer',
                    fontSize: '13px',
                    padding: '8px 16px',
                    opacity: isSharing ? 0.7 : 1,
                  }}
                >
                  {isSharing ? '...' : shareCopied ? 'Copied!' : 'Share'}
                </button>
                <button
                  onClick={() => startEdit(entry)}
                  style={{
                    background: 'var(--bg-deep)',
                    border: '1px solid var(--text-muted)',
                    borderRadius: '8px',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    padding: '8px 16px',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    background: 'var(--bg-deep)',
                    border: '1px solid var(--text-muted)',
                    borderRadius: '8px',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    padding: '8px 16px',
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sticky Footer */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        background: 'linear-gradient(to top, var(--bg-deep) 80%, transparent)',
        zIndex: 100,
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          <Button
            variant="ghost"
            onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
          >
            Prev
          </Button>
          <Button variant="primary" size="large" onClick={onNewGame}>
            New Bracket
          </Button>
          <Button
            variant="ghost"
            onClick={() => setCurrentIndex(i => Math.min(history.length - 1, i + 1))}
            disabled={currentIndex === history.length - 1}
            style={{ opacity: currentIndex === history.length - 1 ? 0.3 : 1 }}
          >
            Next
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '12px' }}>
          <Button variant="ghost" size="small" onClick={onBack}>Home</Button>
          <Button
            variant="ghost"
            size="small"
            onClick={shareVault}
            disabled={isVaultSharing}
            style={{
              color: vaultShareCopied ? 'var(--accent-gold)' : undefined,
              opacity: isVaultSharing ? 0.7 : 1,
            }}
          >
            {isVaultSharing ? '...' : vaultShareCopied ? 'Link Copied!' : 'Share Vault'}
          </Button>
          <Button variant="ghost" size="small" onClick={onClearHistory} style={{ color: 'var(--accent-red)' }}>
            Clear Vault
          </Button>
        </div>
      </div>
    </div>
  )
}
