import { useCallback } from 'react'
import { BOB } from '../data/bob'

/**
 * Hook for generating BOB commentary
 */
export function useBob() {
  // Get a random message from a BOB category
  const getMessage = useCallback((category) => {
    return BOB.random(BOB[category] || BOB.reaction)
  }, [])

  // Get a comment for a specific category type
  const getCategoryComment = useCallback((categoryName) => {
    return BOB.getCategoryComment(categoryName)
  }, [])

  // Check if a category is "BOB adjacent"
  const isBobAdjacent = useCallback((categoryName) => {
    return BOB.isBobAdjacent(categoryName)
  }, [])

  // Get matchup commentary based on the entrants
  const getMatchupComment = useCallback((entrantA, entrantB, roundName) => {
    if (roundName === 'Championship') {
      return BOB.random(BOB.championship)
    }
    // Could add more sophisticated commentary based on entrants
    return BOB.random(BOB.reaction)
  }, [])

  // Get victory commentary
  const getVictoryComment = useCallback((isNYE = false) => {
    return BOB.random(isNYE ? BOB.championNYE : BOB.champion)
  }, [])

  return {
    getMessage,
    getCategoryComment,
    isBobAdjacent,
    getMatchupComment,
    getVictoryComment,
    BOB, // Expose full BOB object for advanced usage
  }
}
