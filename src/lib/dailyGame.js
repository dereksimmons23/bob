/**
 * Daily game helpers — bracket simulation shared by player, BOB, and crowd.
 *
 * The player walks the bracket interactively (see DailyPlay). BOB and the crowd
 * walk their OWN copies via simulatePath() so we can crown three champions and
 * compare them on the result card.
 */

import { getPanelPick } from './panel'
import { getCrowdSplitSync } from './crowd'

/**
 * Walk an 8-entrant single-elimination bracket from `order`, choosing each
 * matchup with pickFn(a, b) -> winner. Returns the champion and every matchup.
 */
export function simulatePath(order, pickFn) {
  let field = [...order]
  const matchups = []
  while (field.length > 1) {
    const next = []
    for (let i = 0; i < field.length; i += 2) {
      const a = field[i]
      const b = field[i + 1]
      const winner = pickFn(a, b)
      matchups.push({ a, b, winner })
      next.push(winner)
    }
    field = next
  }
  return { champion: field[0], matchups }
}

export function simulateBobPath(order, template) {
  return simulatePath(order, (a, b) => getPanelPick(a, b, template.bobRanking).pick)
}

export function simulateCrowdPath(order, template, dayNumber) {
  return simulatePath(order, (a, b) => getCrowdSplitSync(a, b, template, dayNumber).winner)
}

// Round labels for an 8-entrant bracket (3 rounds, 7 matchups).
export function roundLabel(roundIndex, totalRounds) {
  const fromEnd = totalRounds - roundIndex
  if (fromEnd === 1) return 'The Final'
  if (fromEnd === 2) return 'Semifinals'
  if (fromEnd === 3) return 'Quarterfinals'
  return `Round ${roundIndex + 1}`
}
