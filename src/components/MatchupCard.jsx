import { useState, useEffect } from 'react'
import { Button } from './ui'
import { BobSays } from './BobSays'
import { BOB } from '../data/bob'
import { SoundEffects } from '../lib/sound'

export function MatchupCard({ matchup, onVote, playerCount, isChampionship, categoryType }) {
  const [votesA, setVotesA] = useState(0)
  const [votesB, setVotesB] = useState(0)
  const [locked, setLocked] = useState(false)
  const [showTieBreaker, setShowTieBreaker] = useState(false)
  const [winnerSide, setWinnerSide] = useState(null)
  const [voteKey, setVoteKey] = useState(0) // For vote pop animation

  // Keyboard navigation: Left arrow = vote A, Right arrow = vote B
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (locked || showTieBreaker) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setVotesA(v => v + 1)
        setVoteKey(k => k + 1)
        SoundEffects.play('vote')
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setVotesB(v => v + 1)
        setVoteKey(k => k + 1)
        SoundEffects.play('vote')
      } else if (e.key === 'Enter' && (votesA > 0 || votesB > 0)) {
        e.preventDefault()
        // Trigger lock in via a click on the button
        document.querySelector('.lock-in-btn')?.click()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [locked, showTieBreaker, votesA, votesB])

  const handleVote = (side) => {
    if (locked) return
    SoundEffects.play('vote')
    setVoteKey(k => k + 1) // Trigger pop animation
    if (side === 'A') setVotesA(v => v + 1)
    else setVotesB(v => v + 1)
  }

  const handleUndo = (side) => {
    if (locked) return
    if (side === 'A') setVotesA(v => Math.max(0, v - 1))
    else setVotesB(v => Math.max(0, v - 1))
  }

  const handleLockIn = () => {
    if (votesA === votesB) {
      SoundEffects.play('tie')
      setShowTieBreaker(true)
    } else {
      SoundEffects.play('lock')
      const winner = votesA > votesB ? matchup.entrantA : matchup.entrantB
      const loser = votesA > votesB ? matchup.entrantB : matchup.entrantA
      const margin = Math.abs(votesA - votesB)
      setWinnerSide(votesA > votesB ? 'A' : 'B')
      setLocked(true)
      // Small delay to show winner animation before advancing
      setTimeout(() => onVote(winner, votesA, votesB, margin, false, loser), 800)
    }
  }

  const handleTieBreaker = (winner) => {
    SoundEffects.play('lock')
    setShowTieBreaker(false)
    const loser = winner === matchup.entrantA ? matchup.entrantB : matchup.entrantA
    setWinnerSide(winner === matchup.entrantA ? 'A' : 'B')
    setLocked(true)
    setTimeout(() => onVote(winner, votesA, votesB, 0, true, loser), 800)
  }

  if (showTieBreaker) {
    return (
      <div className="animate-shake" style={{
        background: 'linear-gradient(135deg, rgba(255, 59, 92, 0.1) 0%, rgba(255, 59, 92, 0.05) 100%)',
        border: '3px solid var(--accent-red)',
        borderRadius: '20px',
        padding: '32px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '36px',
          color: 'var(--accent-red)',
          marginBottom: '16px',
          letterSpacing: '2px',
        }}>
          IT'S TIED
        </div>
        <BobSays
          message={BOB.random(BOB.tie)}
          mood="dramatic"
          subtext={BOB.random(BOB.tieInstructions)}
        />
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          color: 'var(--accent-gold)',
          margin: '24px 0',
          letterSpacing: '3px',
        }}>
          PHONE A FRIEND
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="large" onClick={() => handleTieBreaker(matchup.entrantA)}>
            {matchup.entrantA} Wins
          </Button>
          <Button variant="primary" size="large" onClick={() => handleTieBreaker(matchup.entrantB)}>
            {matchup.entrantB} Wins
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: isChampionship
        ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.02) 100%)'
        : 'var(--bg-card)',
      border: isChampionship ? '3px solid var(--accent-gold)' : '2px solid var(--text-muted)',
      borderRadius: '20px',
      padding: '32px',
      animation: isChampionship ? 'glow 2s ease-in-out infinite' : 'none',
    }}>
      {isChampionship && (
        <div style={{
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          color: 'var(--accent-gold)',
          marginBottom: '24px',
          letterSpacing: '3px',
        }}>
          THE CHAMPIONSHIP
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '24px',
        alignItems: 'center',
      }}>
        {/* Entrant A */}
        <div
          className={`entrant-card ${locked ? (winnerSide === 'A' ? 'entrant-winner' : 'entrant-loser') : ''}`}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: locked && winnerSide === 'A' ? 'var(--accent-gold)' : 'var(--text-primary)',
            marginBottom: '16px',
            letterSpacing: '1px',
            transition: 'color 0.3s ease',
          }}>
            {locked && winnerSide === 'A' && '👑 '}
            {matchup.entrantA}
            {locked && winnerSide === 'A' && ' 👑'}
          </div>
          <div
            key={`a-${voteKey}`}
            className={votesA > 0 ? 'vote-pop' : ''}
            style={{
              fontSize: '48px',
              fontFamily: 'var(--font-display)',
              color: locked && winnerSide === 'A' ? 'var(--accent-gold)' : 'var(--accent-blue)',
              marginBottom: '16px',
              transition: 'color 0.3s ease',
            }}
          >
            {votesA}
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <Button variant="primary" size="small" onClick={() => handleVote('A')} disabled={locked}>+1</Button>
            <Button variant="secondary" size="small" onClick={() => handleUndo('A')} disabled={locked || votesA === 0}>-1</Button>
          </div>
        </div>

        {/* VS Badge */}
        <div
          className={!locked ? 'vs-badge' : ''}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            color: locked ? 'var(--text-muted)' : 'var(--accent-red)',
            letterSpacing: '4px',
            transition: 'all 0.3s ease',
          }}
        >
          {locked ? '⚔️' : 'VS'}
        </div>

        {/* Entrant B */}
        <div
          className={`entrant-card ${locked ? (winnerSide === 'B' ? 'entrant-winner' : 'entrant-loser') : ''}`}
          style={{ textAlign: 'center', animationDelay: '0.1s' }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: locked && winnerSide === 'B' ? 'var(--accent-gold)' : 'var(--text-primary)',
            marginBottom: '16px',
            letterSpacing: '1px',
            transition: 'color 0.3s ease',
          }}>
            {locked && winnerSide === 'B' && '👑 '}
            {matchup.entrantB}
            {locked && winnerSide === 'B' && ' 👑'}
          </div>
          <div
            key={`b-${voteKey}`}
            className={votesB > 0 ? 'vote-pop' : ''}
            style={{
              fontSize: '48px',
              fontFamily: 'var(--font-display)',
              color: locked && winnerSide === 'B' ? 'var(--accent-gold)' : 'var(--accent-purple)',
              marginBottom: '16px',
              transition: 'color 0.3s ease',
            }}
          >
            {votesB}
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <Button variant="primary" size="small" onClick={() => handleVote('B')} disabled={locked}>+1</Button>
            <Button variant="secondary" size="small" onClick={() => handleUndo('B')} disabled={locked || votesB === 0}>-1</Button>
          </div>
        </div>
      </div>

      {!locked && (votesA > 0 || votesB > 0) && (
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button variant="success" size="large" onClick={handleLockIn} className="lock-in-btn">Lock In Result</Button>
        </div>
      )}
    </div>
  )
}
