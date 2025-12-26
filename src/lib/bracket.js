/**
 * Bracket calculation and generation logic for Battle o' Brackets
 */

/**
 * Calculate the bracket structure based on entrant count
 * @param {number} entrantCount - Number of entrants in the bracket
 * @returns {Object|null} Bracket structure with type, targetSize, playInGames, and byes
 */
export function calculateBracketStructure(entrantCount) {
  if (entrantCount < 2) return null

  const log = Math.log2(entrantCount)
  const lowerPower = Math.pow(2, Math.floor(log))
  const upperPower = Math.pow(2, Math.ceil(log))

  if (entrantCount === lowerPower) {
    return { type: 'clean', targetSize: entrantCount, playInGames: 0, byes: 0 }
  }

  const roundOneSlots = upperPower / 2
  const playInGames = entrantCount - roundOneSlots
  const byes = roundOneSlots - playInGames

  return {
    type: playInGames > 0 ? 'play-in' : 'clean',
    targetSize: upperPower,
    playInGames: Math.max(0, playInGames),
    byes: Math.max(0, byes),
  }
}

/**
 * Get the round name based on number of teams
 * @param {number} teamsInRound - Number of teams in the round
 * @returns {string} Human-readable round name
 */
export function getRoundName(teamsInRound) {
  if (teamsInRound === 2) return 'Championship'
  if (teamsInRound === 4) return 'Final Four'
  if (teamsInRound === 8) return 'Elite 8'
  if (teamsInRound === 16) return 'Sweet 16'
  if (teamsInRound === 32) return 'Round of 32'
  return `Round of ${teamsInRound}`
}

/**
 * Generate a bracket from a list of entrants
 * @param {string[]} entrants - Array of entrant names
 * @returns {Object} Bracket object with rounds and structure
 */
export function generateBracket(entrants) {
  const structure = calculateBracketStructure(entrants.length)
  const shuffled = [...entrants].sort(() => Math.random() - 0.5)
  const rounds = []

  if (structure.playInGames > 0) {
    const playInEntrants = shuffled.slice(0, structure.playInGames * 2)
    const byeEntrants = shuffled.slice(structure.playInGames * 2)

    const playInRound = []
    for (let i = 0; i < playInEntrants.length; i += 2) {
      playInRound.push({
        id: `playin-${i / 2}`,
        entrantA: playInEntrants[i],
        entrantB: playInEntrants[i + 1],
        winner: null,
        votesA: 0,
        votesB: 0,
        isPlayIn: true,
      })
    }
    rounds.push({ name: 'Play-In Round', matchups: playInRound, byes: byeEntrants })
  } else {
    const currentRound = []
    for (let i = 0; i < shuffled.length; i += 2) {
      currentRound.push({
        id: `r1-${i / 2}`,
        entrantA: shuffled[i],
        entrantB: shuffled[i + 1],
        winner: null,
        votesA: 0,
        votesB: 0,
      })
    }
    // Name based on bracket size
    const teamsInRound = currentRound.length * 2
    const round1Name = getRoundName(teamsInRound)
    rounds.push({ name: round1Name, matchups: currentRound })
  }

  return { rounds, structure }
}

/**
 * Advance bracket to next round by creating matchups from winners
 * @param {Object} bracket - Current bracket state
 * @param {string[]} winners - Winners from previous round
 * @param {number} roundIndex - Current round index
 * @returns {Object} Updated bracket with new round
 */
export function advanceToNextRound(bracket, winners, roundIndex) {
  const newRounds = [...bracket.rounds]
  const nextRound = []

  for (let i = 0; i < winners.length; i += 2) {
    nextRound.push({
      id: `r${roundIndex + 2}-${i / 2}`,
      entrantA: winners[i],
      entrantB: winners[i + 1],
      winner: null,
      votesA: 0,
      votesB: 0,
    })
  }

  const teamsInRound = nextRound.length * 2
  const roundName = getRoundName(teamsInRound)
  newRounds.push({ name: roundName, matchups: nextRound })

  return { ...bracket, rounds: newRounds }
}
