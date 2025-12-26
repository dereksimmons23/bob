import { useState } from 'react'
import { Logo, Button, Input, EntrantChip } from '../components/ui'
import { BobSays } from '../components'
import { calculateBracketStructure } from '../lib/bracket'

/**
 * Setup screen for configuring a bracket
 */
export function SetupScreen({
  category,
  setCategory,
  categoryType,
  entrants,
  setEntrants,
  playerCount,
  setPlayerCount,
  bobMessage,
  bobMood,
  onStart,
  onCancel,
  onSaveCustom,
  onOpenSettings,
  onLogoClick,
}) {
  const [newEntrant, setNewEntrant] = useState('')

  const structure = calculateBracketStructure(entrants.length)
  const canStart = category.trim() && entrants.length >= 4

  const addEntrant = () => {
    const trimmed = newEntrant.trim()
    if (trimmed && !entrants.includes(trimmed)) {
      setEntrants([...entrants, trimmed])
      setNewEntrant('')
    }
  }

  const removeEntrant = (index) => {
    setEntrants(entrants.filter((_, i) => i !== index))
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
        {/* Settings Button */}
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
            zIndex: 50,
            fontSize: '18px',
          }}
        >
          ⚙️
        </button>

        <Logo size="small" onClick={onLogoClick} />

        {bobMessage && <BobSays message={bobMessage} mood={bobMood} />}

        {/* Category */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            color: 'var(--text-secondary)',
            letterSpacing: '2px',
            marginBottom: '8px',
          }}>
            CATEGORY
          </label>
          <Input value={category} onChange={setCategory} placeholder="Best Pizza Topping..." />
        </div>

        {/* Player Count */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            color: 'var(--text-secondary)',
            letterSpacing: '2px',
            marginBottom: '8px',
          }}>
            VOTERS: {playerCount}
          </label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <button
                key={n}
                onClick={() => setPlayerCount(n)}
                style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  border: playerCount === n ? '2px solid var(--accent-gold)' : '2px solid var(--text-muted)',
                  background: playerCount === n ? 'rgba(255, 215, 0, 0.1)' : 'var(--bg-card)',
                  color: playerCount === n ? 'var(--accent-gold)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Entrants */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              color: 'var(--text-secondary)',
              letterSpacing: '2px',
            }}>
              ENTRANTS ({entrants.length})
              {entrants.length < 4 && <span style={{ color: 'var(--accent-red)', marginLeft: '8px' }}>Need {4 - entrants.length} more</span>}
            </label>
            {/* Lean Mode - Quick trim buttons */}
            {entrants.length > 8 && (
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setEntrants(entrants.slice(0, 8))}
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--text-muted)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                  title="Keep only top 8 entrants for a faster bracket"
                >
                  Trim to 8
                </button>
                {entrants.length > 16 && (
                  <button
                    onClick={() => setEntrants(entrants.slice(0, 16))}
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--text-muted)',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                    title="Keep only top 16 entrants"
                  >
                    Trim to 16
                  </button>
                )}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <Input
              value={newEntrant}
              onChange={setNewEntrant}
              placeholder="Add entrant..."
              onKeyDown={(e) => e.key === 'Enter' && addEntrant()}
              style={{ flex: 1 }}
            />
            <Button variant="primary" onClick={addEntrant}>+</Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {entrants.map((e, i) => (
              <EntrantChip key={e} name={e} index={i} onRemove={() => removeEntrant(i)} />
            ))}
          </div>
        </div>

        {/* Structure Preview - Compact */}
        {entrants.length >= 4 && structure && (
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '14px',
          }}>
            <span style={{ color: 'var(--text-muted)' }}>Bracket: </span>
            {structure.type === 'clean' ? (
              <span style={{ color: 'var(--accent-green)' }}>✓ Clean ({entrants.length} entrants)</span>
            ) : (
              <span style={{ color: 'var(--accent-blue)' }}>
                {structure.playInGames} play-in{structure.playInGames !== 1 ? 's' : ''}, {structure.byes} bye{structure.byes !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Sticky Footer Actions */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        background: 'linear-gradient(to top, var(--bg-deep) 80%, transparent)',
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        zIndex: 100,
      }}>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        {categoryType === 'custom' && entrants.length >= 4 && onSaveCustom && (
          <Button variant="secondary" onClick={onSaveCustom}>💾 Save</Button>
        )}
        <Button
          variant="primary"
          size="large"
          onClick={onStart}
          disabled={!canStart}
          className={canStart ? 'lock-in-btn' : ''}
        >
          {canStart ? '⚔️ Start Battle!' : `Need ${4 - entrants.length} more`}
        </Button>
      </div>
    </div>
  )
}
