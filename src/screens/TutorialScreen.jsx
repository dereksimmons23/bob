import { useState, useEffect, useCallback } from 'react'
import { Logo, Button } from '../components/ui'
import { BobSays } from '../components'
import { SoundEffects } from '../lib/sound'
import { TUTORIAL_CATEGORY, TUTORIAL_STEPS, getTutorialLine } from '../data/tutorialCategory'

/**
 * Interactive tutorial that walks new users through bracket gameplay
 * Uses a fixed Pizza Toppings category with BOB narration
 */
export function TutorialScreen({ onComplete, onSkip }) {
  const [step, setStep] = useState(TUTORIAL_STEPS.WELCOME)
  const [bobLine, setBobLine] = useState(() => getTutorialLine('welcome'))

  // First matchup state (Pepperoni vs Mushroom)
  const [votesA, setVotesA] = useState(0)
  const [votesB, setVotesB] = useState(0)
  const [locked, setLocked] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [firstWinner, setFirstWinner] = useState(null)

  // Championship state (winner vs Sausage, who "beat" Peppers)
  const [champVotesA, setChampVotesA] = useState(0)
  const [champVotesB, setChampVotesB] = useState(0)
  const [champLocked, setChampLocked] = useState(false)
  const [champCountdown, setChampCountdown] = useState(null)
  const [champion, setChampion] = useState(null)

  // Step 1: Welcome
  const handleStartTutorial = () => {
    setStep(TUTORIAL_STEPS.FIRST_MATCHUP)
    setBobLine(getTutorialLine('votingExplain'))
  }

  // First matchup voting
  const handleVote = (side) => {
    if (locked || countdown !== null) return
    SoundEffects.play('vote')
    if (side === 'A') setVotesA(v => v + 1)
    else setVotesB(v => v + 1)
  }

  // First matchup lock in
  const handleLockIn = useCallback(() => {
    if (votesA === votesB) {
      // Auto-break tie for tutorial (pick randomly)
      if (Math.random() > 0.5) setVotesA(v => v + 1)
      else setVotesB(v => v + 1)
    }

    setStep(TUTORIAL_STEPS.LOCK_IN)
    setBobLine(getTutorialLine('lockInExplain'))

    // Start countdown
    setCountdown(3)
    SoundEffects.play('vote')

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
      const winner = votesA >= votesB ? 'Pepperoni' : 'Mushroom'
      setFirstWinner(winner)
      setLocked(true)
      setBobLine(getTutorialLine('firstWinner'))

      // Auto-advance to championship after delay
      setTimeout(() => {
        setStep(TUTORIAL_STEPS.CHAMPIONSHIP)
        setBobLine(getTutorialLine('championshipIntro'))
      }, 2000)
    }, 1800)
  }, [votesA, votesB])

  // Championship voting
  const handleChampVote = (side) => {
    if (champLocked || champCountdown !== null) return
    SoundEffects.play('vote')
    if (side === 'A') setChampVotesA(v => v + 1)
    else setChampVotesB(v => v + 1)
  }

  // Championship lock in
  const handleChampLockIn = useCallback(() => {
    if (champVotesA === champVotesB) {
      // Auto-break tie for tutorial
      if (Math.random() > 0.5) setChampVotesA(v => v + 1)
      else setChampVotesB(v => v + 1)
    }

    setChampCountdown(3)
    SoundEffects.play('vote')

    setTimeout(() => {
      setChampCountdown(2)
      SoundEffects.play('vote')
    }, 600)

    setTimeout(() => {
      setChampCountdown(1)
      SoundEffects.play('vote')
    }, 1200)

    setTimeout(() => {
      setChampCountdown(null)
      SoundEffects.play('lock')
      const winner = champVotesA >= champVotesB ? firstWinner : 'Sausage'
      setChampion(winner)
      setChampLocked(true)

      // Show victory
      setTimeout(() => {
        setStep(TUTORIAL_STEPS.VICTORY)
        setBobLine(getTutorialLine('tutorialComplete'))
        SoundEffects.play('champion')
      }, 1500)
    }, 1800)
  }, [champVotesA, champVotesB, firstWinner])

  // Get step number for progress indicator
  const getStepNumber = () => {
    switch (step) {
      case TUTORIAL_STEPS.WELCOME: return 1
      case TUTORIAL_STEPS.FIRST_MATCHUP: return 2
      case TUTORIAL_STEPS.LOCK_IN: return 3
      case TUTORIAL_STEPS.CHAMPIONSHIP: return 4
      case TUTORIAL_STEPS.VICTORY: return 5
      default: return 1
    }
  }

  // Render countdown overlay
  if (countdown !== null || champCountdown !== null) {
    const current = countdown ?? champCountdown
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}>
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
            {current}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            color: 'var(--text-secondary)',
            marginTop: '16px',
            letterSpacing: '4px',
          }}>
            {current === 3 ? 'GET READY...' : current === 2 ? 'SET...' : 'REVEAL!'}
          </div>
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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
    }}>
      {/* Skip button */}
      <button
        onClick={onSkip}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'transparent',
          border: '1px solid var(--text-muted)',
          borderRadius: '8px',
          padding: '8px 16px',
          cursor: 'pointer',
          fontSize: '14px',
          color: 'var(--text-muted)',
        }}
      >
        Skip Tutorial
      </button>

      {/* Progress indicator */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        fontSize: '14px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '1px',
      }}>
        Step {getStepNumber()} of 5
      </div>

      {/* Step 1: Welcome */}
      {step === TUTORIAL_STEPS.WELCOME && (
        <div className="animate-fadeIn" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <Logo size="large" />
          <BobSays message={bobLine} mood="normal" />
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="huge" onClick={handleStartTutorial}>
              Let's Go
            </Button>
            <Button variant="ghost" size="large" onClick={onSkip}>
              Skip Tutorial
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 & 3: First Matchup + Lock In */}
      {(step === TUTORIAL_STEPS.FIRST_MATCHUP || step === TUTORIAL_STEPS.LOCK_IN) && !locked && (
        <div className="animate-fadeIn" style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            color: 'var(--accent-gold)',
            marginBottom: '16px',
            letterSpacing: '2px',
          }}>
            {TUTORIAL_CATEGORY.name.toUpperCase()}
          </div>

          <BobSays message={bobLine} mood="normal" />

          {/* Matchup card */}
          <div style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--text-muted)',
            borderRadius: '20px',
            padding: '32px',
            marginTop: '24px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '24px',
              alignItems: 'center',
            }}>
              {/* Pepperoni */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}>
                  Pepperoni
                </div>
                <div style={{
                  fontSize: '48px',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--accent-blue)',
                  marginBottom: '16px',
                }}>
                  {votesA}
                </div>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => handleVote('A')}
                  style={{
                    minWidth: '70px',
                    fontSize: '20px',
                    animation: step === TUTORIAL_STEPS.FIRST_MATCHUP && votesA === 0 && votesB === 0
                      ? 'tutorialPulse 2s ease-in-out infinite'
                      : 'none',
                  }}
                >
                  +1
                </Button>
              </div>

              {/* VS */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                color: 'var(--accent-red)',
                letterSpacing: '4px',
              }}>
                VS
              </div>

              {/* Mushroom */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}>
                  Mushroom
                </div>
                <div style={{
                  fontSize: '48px',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--accent-purple)',
                  marginBottom: '16px',
                }}>
                  {votesB}
                </div>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => handleVote('B')}
                  style={{
                    minWidth: '70px',
                    fontSize: '20px',
                    animation: step === TUTORIAL_STEPS.FIRST_MATCHUP && votesA === 0 && votesB === 0
                      ? 'tutorialPulse 2s ease-in-out infinite'
                      : 'none',
                  }}
                >
                  +1
                </Button>
              </div>
            </div>

            {(votesA > 0 || votesB > 0) && (
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Button
                  variant="success"
                  size="large"
                  onClick={handleLockIn}
                  style={{
                    animation: 'tutorialPulse 2s ease-in-out infinite',
                  }}
                >
                  Lock In Result
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* After first matchup locked - show winner briefly */}
      {step === TUTORIAL_STEPS.LOCK_IN && locked && (
        <div className="animate-fadeIn" style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '40px',
            color: 'var(--accent-gold)',
            marginBottom: '24px',
          }}>
            {firstWinner} Advances!
          </div>
          <BobSays message={bobLine} mood="excited" />
        </div>
      )}

      {/* Step 4: Championship */}
      {step === TUTORIAL_STEPS.CHAMPIONSHIP && !champLocked && (
        <div className="animate-fadeIn" style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            color: 'var(--accent-gold)',
            marginBottom: '16px',
            letterSpacing: '3px',
          }}>
            THE CHAMPIONSHIP
          </div>

          <BobSays message={bobLine} mood="dramatic" />

          {/* Championship matchup card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.02) 100%)',
            border: '3px solid var(--accent-gold)',
            borderRadius: '20px',
            padding: '32px',
            marginTop: '24px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '24px',
              alignItems: 'center',
            }}>
              {/* First round winner */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}>
                  {firstWinner}
                </div>
                <div style={{
                  fontSize: '48px',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--accent-blue)',
                  marginBottom: '16px',
                }}>
                  {champVotesA}
                </div>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => handleChampVote('A')}
                  style={{
                    minWidth: '70px',
                    fontSize: '20px',
                    animation: champVotesA === 0 && champVotesB === 0
                      ? 'tutorialPulse 2s ease-in-out infinite'
                      : 'none',
                  }}
                >
                  +1
                </Button>
              </div>

              {/* VS */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                color: 'var(--accent-red)',
                letterSpacing: '4px',
              }}>
                VS
              </div>

              {/* Sausage (auto-won against Peppers) */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                }}>
                  Sausage
                </div>
                <div style={{
                  fontSize: '48px',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--accent-purple)',
                  marginBottom: '16px',
                }}>
                  {champVotesB}
                </div>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => handleChampVote('B')}
                  style={{
                    minWidth: '70px',
                    fontSize: '20px',
                    animation: champVotesA === 0 && champVotesB === 0
                      ? 'tutorialPulse 2s ease-in-out infinite'
                      : 'none',
                  }}
                >
                  +1
                </Button>
              </div>
            </div>

            {(champVotesA > 0 || champVotesB > 0) && (
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Button
                  variant="success"
                  size="large"
                  onClick={handleChampLockIn}
                  style={{
                    animation: 'tutorialPulse 2s ease-in-out infinite',
                  }}
                >
                  Lock In Result
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 5: Victory */}
      {step === TUTORIAL_STEPS.VICTORY && (
        <div className="animate-fadeIn" style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            color: 'var(--accent-gold)',
            marginBottom: '16px',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
          }}>
            {champion}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--text-primary)',
            marginBottom: '32px',
            letterSpacing: '3px',
          }}>
            IS YOUR CHAMPION!
          </div>

          <BobSays message={bobLine} mood="victory" />

          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            maxWidth: '400px',
            margin: '16px auto 0',
          }}>
            <div style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginBottom: '8px',
            }}>
              About The Vault
            </div>
            <div style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
            }}>
              {getTutorialLine('vaultExplain')}
            </div>
          </div>

          <div style={{ marginTop: '32px' }}>
            <Button variant="primary" size="huge" onClick={onComplete}>
              Start Playing
            </Button>
          </div>
        </div>
      )}

      {/* Tutorial pulse animation */}
      <style>{`
        @keyframes tutorialPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
          }
        }
      `}</style>
    </div>
  )
}
