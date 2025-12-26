import React from 'react'

export function BracketProgress({ rounds, currentRoundIndex, currentMatchupIndex, categoryColor }) {
  const totalRounds = rounds.length

  // Shorten round names for mobile
  const getShortName = (name) => {
    if (name === 'Championship') return 'Final'
    if (name === 'Semifinals') return 'Semis'
    if (name === 'Quarterfinals') return 'Quarters'
    if (name.includes('Round')) return name.replace('Round ', 'R')
    if (name === 'Play-In') return 'Play-In'
    return name
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
      marginBottom: '20px',
      padding: '12px 16px',
      background: 'var(--bg-card)',
      borderRadius: '12px',
      border: '1px solid var(--bg-elevated)',
      overflowX: 'auto',
      maxWidth: '100%',
    }}>
      {rounds.map((round, idx) => {
        const isCompleted = idx < currentRoundIndex
        const isCurrent = idx === currentRoundIndex
        const isFuture = idx > currentRoundIndex
        const isChampionship = round.name === 'Championship'

        return (
          <React.Fragment key={round.name}>
            {/* Round indicator */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}>
              <div style={{
                width: isChampionship ? '32px' : '24px',
                height: isChampionship ? '32px' : '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isChampionship ? '16px' : '12px',
                fontWeight: '600',
                background: isCompleted ? 'var(--accent-green)' :
                           isCurrent ? (categoryColor || 'var(--accent-gold)') :
                           'var(--bg-elevated)',
                color: (isCompleted || isCurrent) ? 'var(--bg-deep)' : 'var(--text-muted)',
                border: isCurrent ? '2px solid var(--text-primary)' : 'none',
                boxShadow: isCurrent ? '0 0 12px ' + (categoryColor || 'var(--accent-gold)') + '66' : 'none',
                transition: 'all 0.3s ease',
              }}>
                {isCompleted ? '✓' : isChampionship ? '🏆' : idx + 1}
              </div>
              <div style={{
                fontSize: '9px',
                color: isCurrent ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: isCurrent ? '600' : '400',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}>
                {getShortName(round.name)}
              </div>
            </div>

            {/* Connector line (not after last round) */}
            {idx < totalRounds - 1 && (
              <div style={{
                width: '12px',
                height: '2px',
                background: isCompleted ? 'var(--accent-green)' : 'var(--bg-elevated)',
                borderRadius: '1px',
                marginBottom: '18px',
                flexShrink: 0,
              }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
