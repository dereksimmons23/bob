import { useState, useEffect } from 'react'
import { CATEGORY_LIBRARY } from '../data/categories'
import { BOB } from '../data/bob'
import { Logo } from '../components/ui'

// Helper: Generate bracket from entrants
function createBracket(entrants) {
  const shuffled = [...entrants].sort(() => Math.random() - 0.5)

  let bracketSize = 8
  if (shuffled.length >= 16) bracketSize = 16
  else if (shuffled.length < 8) bracketSize = Math.pow(2, Math.ceil(Math.log2(shuffled.length)))

  const participants = shuffled.slice(0, bracketSize)

  const firstRound = []
  for (let i = 0; i < participants.length; i += 2) {
    firstRound.push({
      id: `r0-${i/2}`,
      a: participants[i],
      b: participants[i + 1],
      winner: null,
    })
  }

  return [firstRound]
}

// Helper: Pick random category
function pickRandom() {
  const allCategories = []
  Object.entries(CATEGORY_LIBRARY).forEach(([themeKey, data]) => {
    data.categories.forEach(cat => {
      allCategories.push({ ...cat, theme: themeKey, color: data.color })
    })
  })
  return allCategories[Math.floor(Math.random() * allCategories.length)]
}

/**
 * QuickPlayScreen - Single-screen bracket experience
 *
 * Design goals:
 * - Open and immediately start playing (no setup)
 * - Tap to vote (single voter, no tallying)
 * - Bracket always visible
 * - Ridiculously easy for ages 10-80
 */
export function QuickPlayScreen({ onExit, onSaveToVault }) {
  // Initialize with random category immediately
  const [category, setCategory] = useState(() => pickRandom())
  const [bracket, setBracket] = useState(() => createBracket(pickRandom().entrants))
  const [currentRound, setCurrentRound] = useState(0)
  const [currentMatchup, setCurrentMatchup] = useState(0)
  const [champion, setChampion] = useState(null)
  const [bobMessage, setBobMessage] = useState(() => BOB.random(BOB.welcome))
  const [isAnimating, setIsAnimating] = useState(false)
  const [matchupResults, setMatchupResults] = useState([])

  // Proper initialization on mount
  useEffect(() => {
    const picked = pickRandom()
    setCategory(picked)
    setBracket(createBracket(picked.entrants))
    setBobMessage(BOB.random(BOB.welcome))
  }, [])

  const pickRandomCategory = () => {
    const picked = pickRandom()
    setCategory(picked)
    setBracket(createBracket(picked.entrants))
    setBobMessage(BOB.random(BOB.welcome))
    setChampion(null)
    setCurrentRound(0)
    setCurrentMatchup(0)
    setMatchupResults([])
  }


  const vote = (winner, loser) => {
    if (isAnimating || champion) return

    setIsAnimating(true)

    // Record result
    const result = {
      round: currentRound,
      matchup: currentMatchup,
      winner,
      loser,
    }
    setMatchupResults(prev => [...prev, result])

    // Update bracket
    const newBracket = [...bracket]
    newBracket[currentRound][currentMatchup].winner = winner

    // Check if round is complete
    const roundComplete = newBracket[currentRound].every(m => m.winner)

    if (roundComplete) {
      const winners = newBracket[currentRound].map(m => m.winner)

      if (winners.length === 1) {
        // Champion!
        setChampion(winners[0])
        setBobMessage(BOB.random(BOB.champion))
        setBracket(newBracket)
        setIsAnimating(false)
        return
      }

      // Create next round
      const nextRound = []
      for (let i = 0; i < winners.length; i += 2) {
        nextRound.push({
          id: `r${currentRound + 1}-${i/2}`,
          a: winners[i],
          b: winners[i + 1],
          winner: null,
        })
      }
      newBracket.push(nextRound)
      setBracket(newBracket)
      setCurrentRound(currentRound + 1)
      setCurrentMatchup(0)

      // Round transition message
      if (winners.length === 2) {
        setBobMessage("The final. Make it count.")
      } else if (winners.length === 4) {
        setBobMessage("Final Four. Things are getting serious.")
      } else {
        setBobMessage(BOB.random(BOB.normal))
      }
    } else {
      setBracket(newBracket)
      setCurrentMatchup(currentMatchup + 1)
      setBobMessage(BOB.random(BOB.normal))
    }

    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleSave = () => {
    if (champion && onSaveToVault) {
      const lastMatchup = bracket[bracket.length - 1][0]
      const runnerUp = lastMatchup.a === champion ? lastMatchup.b : lastMatchup.a

      onSaveToVault({
        category: category.name,
        champion,
        runnerUp,
        entrants: bracket[0].flatMap(m => [m.a, m.b]),
        playerCount: 1,
        bobComment: bobMessage,
        matchupResults,
        date: new Date().toISOString(),
      })
    }
  }

  // Current matchup to vote on
  const activeMatchup = !champion && bracket[currentRound]
    ? bracket[currentRound][currentMatchup]
    : null

  // Calculate total matchups and current position
  const totalMatchups = bracket.reduce((sum, round) => sum + round.length, 0)
  const completedMatchups = matchupResults.length

  if (!category) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deep)',
      }}>
        <div style={{ color: 'var(--text-muted)' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-deep)',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <Logo size="tiny" onClick={onExit} />
        <div style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          {completedMatchups}/{totalMatchups} matchups
        </div>
      </div>

      {/* Category Title */}
      <div style={{
        textAlign: 'center',
        marginBottom: '8px',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          color: category.color || 'var(--accent-gold)',
          letterSpacing: '1px',
        }}>
          {category.name}
        </div>
      </div>

      {/* BOB Message */}
      {bobMessage && (
        <div style={{
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          marginBottom: '16px',
          padding: '0 20px',
        }}>
          "{bobMessage}"
        </div>
      )}

      {/* Main Voting Area */}
      {activeMatchup && !champion && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '16px',
        }}>
          {/* Entrant A */}
          <button
            onClick={() => vote(activeMatchup.a, activeMatchup.b)}
            disabled={isAnimating}
            style={{
              flex: 1,
              minHeight: '120px',
              background: 'var(--bg-card)',
              border: '3px solid var(--bg-elevated)',
              borderRadius: '16px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--bg-elevated)'}
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              color: 'var(--text-primary)',
              textAlign: 'center',
            }}>
              {activeMatchup.a}
            </span>
          </button>

          {/* VS Divider */}
          <div style={{
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
          }}>
            VS
          </div>

          {/* Entrant B */}
          <button
            onClick={() => vote(activeMatchup.b, activeMatchup.a)}
            disabled={isAnimating}
            style={{
              flex: 1,
              minHeight: '120px',
              background: 'var(--bg-card)',
              border: '3px solid var(--bg-elevated)',
              borderRadius: '16px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--bg-elevated)'}
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              color: 'var(--text-primary)',
              textAlign: 'center',
            }}>
              {activeMatchup.b}
            </span>
          </button>
        </div>
      )}

      {/* Champion View */}
      {champion && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}>
          <div style={{
            fontSize: '48px',
          }}>
            🏆
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            color: 'var(--accent-gold)',
            textAlign: 'center',
          }}>
            {champion}
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            Champion
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '20px',
          }}>
            <button
              onClick={handleSave}
              style={{
                padding: '12px 24px',
                background: 'var(--bg-card)',
                border: '2px solid var(--accent-gold)',
                borderRadius: '12px',
                color: 'var(--accent-gold)',
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Save to Vault
            </button>
            <button
              onClick={pickRandomCategory}
              style={{
                padding: '12px 24px',
                background: 'var(--accent-gold)',
                border: 'none',
                borderRadius: '12px',
                color: 'var(--bg-deep)',
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Mini Bracket View */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '12px',
        marginTop: 'auto',
      }}>
        <div style={{
          fontSize: '10px',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '8px',
          textAlign: 'center',
        }}>
          Bracket Progress
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
          flexWrap: 'wrap',
        }}>
          {bracket.map((round, roundIdx) => (
            <div key={roundIdx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {round.map((matchup, matchupIdx) => {
                const isActive = roundIdx === currentRound && matchupIdx === currentMatchup && !champion
                const isComplete = matchup.winner !== null

                return (
                  <div
                    key={matchup.id}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      background: isComplete
                        ? 'var(--accent-green)'
                        : isActive
                          ? 'var(--accent-gold)'
                          : 'var(--bg-elevated)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: isComplete || isActive ? 'var(--bg-deep)' : 'var(--text-muted)',
                      fontWeight: 'bold',
                    }}
                  >
                    {isComplete ? '✓' : isActive ? '→' : ''}
                  </div>
                )
              })}
            </div>
          ))}
          {champion && (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}>
              🏆
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid var(--bg-elevated)',
      }}>
        <button
          onClick={pickRandomCategory}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid var(--text-muted)',
            borderRadius: '8px',
            color: 'var(--text-muted)',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Different Category
        </button>
        <button
          onClick={onExit}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid var(--text-muted)',
            borderRadius: '8px',
            color: 'var(--text-muted)',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Exit
        </button>
      </div>
    </div>
  )
}
