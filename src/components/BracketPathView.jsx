import React from 'react'

export function BracketPathView({ rounds, currentRoundIndex, categoryColor }) {
  const totalRounds = rounds.length

  // Get bracket-style name based on teams remaining
  const getBracketName = (round, idx, total) => {
    if (round.name === 'Championship') return 'Finals'
    const matchups = round.matchups?.length || 0
    const teamsInRound = matchups * 2

    if (teamsInRound === 2) return 'Finals'
    if (teamsInRound === 4) return 'Final 4'
    if (teamsInRound === 8) return 'Elite 8'
    if (teamsInRound === 16) return 'Sweet 16'
    if (teamsInRound === 32) return 'Round 32'
    if (idx === 0 && round.name.includes('Play')) return 'Play-In'
    return `Round ${idx + 1}`
  }

  return (
    <div style={{
      marginBottom: '16px',
      padding: '12px',
      background: 'var(--bg-card)',
      borderRadius: '12px',
      border: '1px solid var(--bg-elevated)',
    }}>
      {/* Horizontal bracket visualization */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4px',
        position: 'relative',
      }}>
        {rounds.map((round, idx) => {
          const isCompleted = idx < currentRoundIndex
          const isCurrent = idx === currentRoundIndex
          const isChampionship = round.name === 'Championship'
          const bracketName = getBracketName(round, idx, totalRounds)

          return (
            <React.Fragment key={round.name}>
              {/* Round node */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: isChampionship ? '0 0 auto' : '1',
                minWidth: isChampionship ? '44px' : '36px',
                maxWidth: isChampionship ? '50px' : '60px',
              }}>
                {/* Bracket lines above */}
                {idx > 0 && (
                  <div style={{
                    width: '100%',
                    height: '8px',
                    borderLeft: `2px solid ${isCompleted ? 'var(--accent-green)' : isCurrent ? (categoryColor || 'var(--accent-gold)') : 'var(--text-muted)'}`,
                    borderTop: `2px solid ${isCompleted ? 'var(--accent-green)' : isCurrent ? (categoryColor || 'var(--accent-gold)') : 'var(--text-muted)'}`,
                    marginBottom: '4px',
                    opacity: isCompleted ? 1 : isCurrent ? 1 : 0.4,
                  }} />
                )}
                {idx === 0 && <div style={{ height: '12px' }} />}

                {/* Circle indicator */}
                <div style={{
                  width: isChampionship ? '32px' : isCurrent ? '28px' : '22px',
                  height: isChampionship ? '32px' : isCurrent ? '28px' : '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isChampionship ? '16px' : '10px',
                  fontWeight: '700',
                  background: isCompleted ? 'var(--accent-green)' :
                             isCurrent ? (categoryColor || 'var(--accent-gold)') :
                             'var(--bg-elevated)',
                  color: (isCompleted || isCurrent) ? 'var(--bg-deep)' : 'var(--text-muted)',
                  border: isCurrent ? '2px solid white' : 'none',
                  boxShadow: isCurrent ? `0 0 12px ${categoryColor || 'var(--accent-gold)'}` : 'none',
                  transition: 'all 0.3s ease',
                }}>
                  {isCompleted ? '✓' : isChampionship ? '🏆' : idx + 1}
                </div>

                {/* Round name */}
                <div style={{
                  marginTop: '4px',
                  fontSize: '8px',
                  fontWeight: isCurrent ? '700' : '500',
                  color: isCurrent ? (categoryColor || 'var(--accent-gold)') :
                         isCompleted ? 'var(--accent-green)' : 'var(--text-muted)',
                  textAlign: 'center',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {bracketName}
                </div>
              </div>

              {/* Connector line between rounds */}
              {idx < totalRounds - 1 && (
                <div style={{
                  flex: '1',
                  height: '2px',
                  background: isCompleted ? 'var(--accent-green)' : 'var(--text-muted)',
                  opacity: isCompleted ? 1 : 0.3,
                  marginTop: '-12px',
                  minWidth: '8px',
                }} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Current round indicator */}
      <div style={{
        marginTop: '10px',
        textAlign: 'center',
        fontSize: '11px',
        color: 'var(--text-secondary)',
      }}>
        {currentRoundIndex + 1} of {totalRounds} rounds complete → {totalRounds - currentRoundIndex - 1} to 🏆
      </div>
    </div>
  )
}
