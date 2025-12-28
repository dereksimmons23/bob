import { useState } from 'react'
import { Logo, Button, Input, EntrantChip } from '../components/ui'
import { BobSays } from '../components'
import { calculateBracketStructure } from '../lib/bracket'

/**
 * Setup screen for configuring a bracket
 * Compact mode for library picks, full editor for custom brackets
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
  const [showFullEditor, setShowFullEditor] = useState(false)

  const structure = calculateBracketStructure(entrants.length)
  const canStart = category.trim() && entrants.length >= 4

  // Library pick = anything that's not 'custom' (food, music, rushmore, etc.)
  const isLibraryPick = categoryType !== 'custom'

  // For library picks, start in compact mode. For custom, always show full editor.
  const showCompact = isLibraryPick && !showFullEditor

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

  // Compact view for library picks - everything visible without scrolling
  if (showCompact) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
      }}>
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

        {/* Category Title */}
        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          marginBottom: '24px',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--accent-gold)',
            letterSpacing: '2px',
            marginBottom: '8px',
          }}>
            {category}
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
          }}>
            {entrants.length} entrants • {structure?.type === 'clean' ? 'Clean bracket' : `${structure?.playInGames || 0} play-ins`}
          </div>
        </div>

        {bobMessage && <BobSays message={bobMessage} mood={bobMood} />}

        {/* Voter Count - Compact */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            letterSpacing: '2px',
            marginBottom: '12px',
            textAlign: 'center',
          }}>
            HOW MANY VOTERS?
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <button
                key={n}
                onClick={() => setPlayerCount(n)}
                style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  border: playerCount === n ? '2px solid var(--accent-gold)' : '2px solid var(--text-muted)',
                  background: playerCount === n ? 'rgba(255, 215, 0, 0.15)' : 'var(--bg-elevated)',
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

        {/* Action Buttons - Primary focus */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginTop: 'auto',
        }}>
          <Button
            variant="primary"
            size="huge"
            onClick={onStart}
            disabled={!canStart}
            style={{ width: '100%' }}
          >
            ⚔️ Start Battle!
          </Button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="ghost" onClick={onCancel} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => setShowFullEditor(true)} style={{ flex: 1 }}>
              ✏️ Customize
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Full editor view (for custom brackets or when user clicks Customize)
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '120px' }}>
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
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            letterSpacing: '2px',
            marginBottom: '6px',
          }}>
            CATEGORY
          </label>
          <Input value={category} onChange={setCategory} placeholder="Best Pizza Topping..." />
        </div>

        {/* Player Count - Compact */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            letterSpacing: '2px',
            marginBottom: '6px',
          }}>
            VOTERS: {playerCount}
          </label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <button
                key={n}
                onClick={() => setPlayerCount(n)}
                style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  border: playerCount === n ? '2px solid var(--accent-gold)' : '2px solid var(--text-muted)',
                  background: playerCount === n ? 'rgba(255, 215, 0, 0.1)' : 'var(--bg-card)',
                  color: playerCount === n ? 'var(--accent-gold)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Entrants */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              letterSpacing: '2px',
            }}>
              ENTRANTS ({entrants.length})
              {entrants.length < 4 && <span style={{ color: 'var(--accent-red)', marginLeft: '8px' }}>Need {4 - entrants.length} more</span>}
            </label>
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
                  >
                    Trim to 16
                  </button>
                )}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
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

        {/* Structure Preview */}
        {entrants.length >= 4 && structure && (
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            padding: '10px 14px',
            marginBottom: '20px',
            fontSize: '13px',
          }}>
            <span style={{ color: 'var(--text-muted)' }}>Bracket: </span>
            {structure.type === 'clean' ? (
              <span style={{ color: 'var(--accent-green)' }}>✓ Clean ({entrants.length})</span>
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
        padding: 'calc(16px + env(safe-area-inset-bottom, 0px)) 24px',
        paddingTop: '16px',
        background: 'linear-gradient(to top, var(--bg-deep) 80%, transparent)',
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        zIndex: 100,
      }}>
        <Button variant="ghost" onClick={isLibraryPick ? () => setShowFullEditor(false) : onCancel}>
          {isLibraryPick ? 'Back' : 'Cancel'}
        </Button>
        {categoryType === 'custom' && entrants.length >= 4 && onSaveCustom && (
          <Button variant="secondary" onClick={onSaveCustom}>💾 Save</Button>
        )}
        <Button
          variant="primary"
          size="large"
          onClick={onStart}
          disabled={!canStart}
        >
          {canStart ? '⚔️ Start Battle!' : `Need ${4 - entrants.length} more`}
        </Button>
      </div>
    </div>
  )
}
