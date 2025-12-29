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
  const [countdown, setCountdown] = useState(null) // 3, 2, 1, or null

  // Keyboard navigation: Left arrow = vote A, Right arrow = vote B
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (locked || showTieBreaker || countdown !== null) return
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
  }, [locked, showTieBreaker, countdown, votesA, votesB])

  const handleVote = (side) => {
    if (locked || countdown !== null) return
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
      // Start 3-2-1 countdown
      setCountdown(3)
      SoundEffects.play('vote') // Tick sound

      setTimeout(() => {
        setCountdown(2)
        SoundEffects.play('vote')
      }, 600)

      setTimeout(() => {
        setCountdown(1)
        SoundEffects.play('vote')
      }, 1200)

      setTimeout(() => {
        setCountdown(null)
        SoundEffects.play('lock')
        const winner = votesA > votesB ? matchup.entrantA : matchup.entrantB
        const loser = votesA > votesB ? matchup.entrantB : matchup.entrantA
        const margin = Math.abs(votesA - votesB)
        setWinnerSide(votesA > votesB ? 'A' : 'B')
        setLocked(true)
        // Small delay to show winner animation before advancing
        setTimeout(() => onVote(winner, votesA, votesB, margin, false, loser), 800)
      }, 1800)
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

  // Countdown overlay
  if (countdown !== null) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.02) 100%)',
        border: '3px solid var(--accent-gold)',
        borderRadius: '20px',
        padding: '48px 32px',
        textAlign: 'center',
        animation: 'pulse 0.6s ease-in-out',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '80px',
          color: 'var(--accent-gold)',
          letterSpacing: '4px',
          animation: 'countdownPop 0.5s ease-out',
          textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
        }}>
          {countdown}
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: 'var(--text-secondary)',
          marginTop: '16px',
          letterSpacing: '4px',
        }}>
          {countdown === 3 ? 'GET READY...' : countdown === 2 ? 'SET...' : 'REVEAL!'}
        </div>
        <style>{`
          @keyframes countdownPop {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    )
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
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button
              variant="primary"
              size="medium"
              onClick={() => handleVote('A')}
              disabled={locked || countdown !== null}
              style={{ minWidth: '70px', fontSize: '20px' }}
            >
              +1
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleUndo('A')}
              disabled={locked || votesA === 0 || countdown !== null}
            >
              -1
            </Button>
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
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button
              variant="primary"
              size="medium"
              onClick={() => handleVote('B')}
              disabled={locked || countdown !== null}
              style={{ minWidth: '70px', fontSize: '20px' }}
            >
              +1
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleUndo('B')}
              disabled={locked || votesB === 0 || countdown !== null}
            >
              -1
            </Button>
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
