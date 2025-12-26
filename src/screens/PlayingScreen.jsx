import { Logo, Button } from '../components/ui'
import { BobSays, BracketPathView, MatchupCard } from '../components'
import { CATEGORY_LIBRARY } from '../data/categories'

/**
 * Playing screen - active bracket gameplay
 */
export function PlayingScreen({
  bracket,
  currentRoundIndex,
  currentMatchupIndex,
  winners,
  category,
  categoryType,
  playerCount,
  bobMessage,
  bobMood,
  isYearInReview,
  yirRound,
  canUndo,
  onVote,
  onUndo,
  onExit,
  onOpenSettings,
}) {
  const currentRound = bracket?.rounds[currentRoundIndex]
  const currentMatchup = currentRound?.matchups[currentMatchupIndex]
  const isChampionship = currentRound?.name === 'Championship'

  if (!bracket || !currentRound) return null

  return (
    <div style={{ minHeight: '100vh', padding: '24px', maxWidth: '700px', margin: '0 auto' }}>
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

      <Logo size="small" onClick={onExit} />

      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        {/* Year in Review progress indicator */}
        {isYearInReview && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}>
            {[1, 2, 3, 4, 5].map(round => (
              <div key={round} style={{
                width: round === 5 ? '40px' : '32px',
                height: '8px',
                borderRadius: '4px',
                background: round < yirRound ? '#ffd700'
                  : round === yirRound ? '#f59e0b'
                  : 'var(--bg-card-hover)',
                transition: 'background 0.3s',
              }} title={round === 5 ? 'MVP Final' : `Round ${round}`} />
            ))}
          </div>
        )}
        {isYearInReview && (
          <div style={{
            fontSize: '12px',
            color: '#f59e0b',
            letterSpacing: '2px',
            marginBottom: '8px',
          }}>
            {yirRound === 5 ? '🏆 MVP FINAL' : `YEAR IN REVIEW • ${yirRound} OF 4`}
          </div>
        )}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: 'var(--accent-gold)',
          letterSpacing: '3px',
        }}>
          {category.toUpperCase()}
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          Match {currentMatchupIndex + 1} of {currentRound?.matchups.length}
        </div>
      </div>

      <BracketPathView
        rounds={bracket.rounds}
        currentRoundIndex={currentRoundIndex}
        categoryColor={CATEGORY_LIBRARY[categoryType]?.color}
      />

      <BobSays message={bobMessage} mood={bobMood} />

      {currentMatchup && (
        <MatchupCard
          key={currentMatchup.id}
          matchup={currentMatchup}
          onVote={onVote}
          playerCount={playerCount}
          isChampionship={isChampionship}
          categoryType={categoryType}
        />
      )}

      {/* First-time hint - only on first matchup of first round */}
      {currentRoundIndex === 0 && currentMatchupIndex === 0 && winners.length === 0 && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: 'var(--bg-card)',
          borderRadius: '12px',
          border: '1px dashed var(--text-muted)',
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--text-secondary)',
        }}>
          💡 <strong>How to play:</strong> Tally votes with +1/-1 (or ← → keys), then tap "Lock In Result" (or Enter)
        </div>
      )}

      <div style={{ marginTop: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
        {winners.length} of {currentRound?.matchups.length + (currentRound?.byes?.length || 0)} advancing
      </div>

      {/* Undo button - 5 second window */}
      {canUndo && (
        <div style={{
          marginTop: '16px',
          textAlign: 'center',
          animation: 'slideUp 0.3s ease-out',
        }}>
          <Button
            variant="ghost"
            size="small"
            onClick={onUndo}
            style={{ opacity: 0.8 }}
          >
            ↩ Wait, go back
          </Button>
        </div>
      )}
    </div>
  )
}
