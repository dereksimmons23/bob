/**
 * Tutorial data for the interactive tutorial bracket
 * Uses Pizza Toppings as a universally relatable category
 */

// Fixed tutorial category - always the same for consistency
export const TUTORIAL_CATEGORY = {
  name: "Pizza Toppings",
  entrants: ["Pepperoni", "Mushroom", "Sausage", "Peppers"],
}

// Tutorial step identifiers
export const TUTORIAL_STEPS = {
  WELCOME: 'welcome',
  FIRST_MATCHUP: 'first_matchup',
  LOCK_IN: 'lock_in',
  CHAMPIONSHIP: 'championship',
  VICTORY: 'victory',
}

// BOB's tutorial dialogue - arrays for variety on replay
export const TUTORIAL_BOB = {
  welcome: [
    "I'm BOB. I settle debates. Let me show you how.",
    "Welcome. I turn arguments into brackets. Here's how it works.",
    "Hey. I'm BOB. I make decisions easier. Let me walk you through it.",
  ],

  votingExplain: [
    "See those +1 buttons? Tap them to vote. Multiple taps = strong opinion.",
    "Voting is simple. Tap +1 for your pick. Tap it again if you REALLY mean it.",
    "Each +1 is a vote. One tap is polite. Five taps is conviction.",
  ],

  lockInExplain: [
    "When you're ready, lock it in. Then comes the countdown...",
    "Hit Lock In when you've made your choice. The countdown adds drama.",
    "Ready? Lock it in. I'll do the 3-2-1 countdown. It's more fun that way.",
  ],

  firstWinner: [
    "And we have a winner! One down, one to go.",
    "The people have spoken. On to the championship.",
    "That's how it's done. Now for the final showdown.",
  ],

  championshipIntro: [
    "The final showdown. One will be crowned. No pressure.",
    "Championship round. This is what we've been building to.",
    "The finals. Two remain. Only one can be champion.",
  ],

  tutorialComplete: [
    "That's it! Your champion lives forever in The Vault. Now go settle some real debates.",
    "You've got the basics. The Vault saves your champions. Go bracket something that matters.",
    "And that's how it's done. Ready to settle your own debates?",
  ],

  vaultExplain: [
    "The Vault remembers every champion. Your history of wins.",
    "Champions live forever in The Vault. It's your debate hall of fame.",
    "Every bracket you complete gets saved to The Vault.",
  ],
}

// Helper to get random dialogue
export function getTutorialLine(category) {
  const lines = TUTORIAL_BOB[category]
  if (!lines || lines.length === 0) return ""
  return lines[Math.floor(Math.random() * lines.length)]
}
