import { useState, useCallback } from 'react'
import { generateBracket, advanceToNextRound, getRoundName } from '../lib/bracket'
import { SoundEffects } from '../lib/sound'

/**
 * Hook for managing bracket state and game flow
 */
export function useBracket() {
  const [bracket, setBracket] = useState(null)
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [currentMatchupIndex, setCurrentMatchupIndex] = useState(0)
  const [winners, setWinners] = useState([])
  const [matchupResults, setMatchupResults] = useState([])
  const [champion, setChampion] = useState(null)
  const [runnerUp, setRunnerUp] = useState(null)

  // Start a new bracket
  const startBracket = useCallback((entrants) => {
    const newBracket = generateBracket(entrants)
    setBracket(newBracket)
    setCurrentRoundIndex(0)
    setCurrentMatchupIndex(0)
    setWinners([])
    setMatchupResults([])
    setChampion(null)
    setRunnerUp(null)
    return newBracket
  }, [])

  // Get current matchup
  const getCurrentMatchup = useCallback(() => {
    if (!bracket) return null
    const round = bracket.rounds[currentRoundIndex]
    if (!round) return null
    return round.matchups[currentMatchupIndex]
  }, [bracket, currentRoundIndex, currentMatchupIndex])

  // Get current round
  const getCurrentRound = useCallback(() => {
    if (!bracket) return null
    return bracket.rounds[currentRoundIndex]
  }, [bracket, currentRoundIndex])

  // Record a vote and advance
  const recordVote = useCallback((winner, votesA, votesB, margin, wasTieBreaker, loser) => {
    const currentRound = bracket.rounds[currentRoundIndex]
    const currentMatchup = currentRound.matchups[currentMatchupIndex]

    // Record the result
    const result = {
      round: currentRound.name,
      entrantA: currentMatchup.entrantA,
      entrantB: currentMatchup.entrantB,
      winner,
      loser,
      votesA,
      votesB,
      margin,
      wasTieBreaker,
      isChampionship: currentRound.matchups.length === 1,
    }
    setMatchupResults(prev => [...prev, result])

    // Add winner
    const newWinners = [...winners, winner]
    setWinners(newWinners)

    const matchupsInRound = currentRound.matchups.length

    // Check if round is complete
    if (currentMatchupIndex + 1 >= matchupsInRound) {
      // Add byes from play-in round if applicable
      const allWinners = currentRound.byes
        ? [...newWinners, ...currentRound.byes]
        : newWinners

      // Check if we have a champion
      if (allWinners.length === 1) {
        SoundEffects.play('champion')
        setChampion(winner)
        setRunnerUp(loser)
        return { isComplete: true, champion: winner, runnerUp: loser }
      } else {
        // Advance to next round
        SoundEffects.play('roundComplete')
        const updatedBracket = advanceToNextRound(bracket, allWinners, currentRoundIndex)
        setBracket(updatedBracket)
        setCurrentRoundIndex(prev => prev + 1)
        setCurrentMatchupIndex(0)
        setWinners([])
        return { isComplete: false, advancedRound: true }
      }
    } else {
      // Move to next matchup in current round
      SoundEffects.play('advance')
      setCurrentMatchupIndex(prev => prev + 1)
      return { isComplete: false, advancedRound: false }
    }
  }, [bracket, currentRoundIndex, currentMatchupIndex, winners])

  // Check if current matchup is championship
  const isChampionship = useCallback(() => {
    if (!bracket) return false
    const round = bracket.rounds[currentRoundIndex]
    return round?.name === 'Championship' || round?.matchups?.length === 1
  }, [bracket, currentRoundIndex])

  // Reset bracket
  const reset = useCallback(() => {
    setBracket(null)
    setCurrentRoundIndex(0)
    setCurrentMatchupIndex(0)
    setWinners([])
    setMatchupResults([])
    setChampion(null)
    setRunnerUp(null)
  }, [])

  return {
    // State
    bracket,
    currentRoundIndex,
    currentMatchupIndex,
    matchupResults,
    champion,
    runnerUp,

    // Computed
    currentMatchup: getCurrentMatchup(),
    currentRound: getCurrentRound(),
    isChampionship: isChampionship(),
    isPlaying: bracket !== null && !champion,
    isComplete: champion !== null,

    // Actions
    startBracket,
    recordVote,
    reset,
  }
}
