/**
 * BOB's brain — "the panel."
 *
 * v1 (this file): BOB's opinion is the authored `bobRanking` on each daily
 * bracket. For any matchup he picks the higher-ranked entrant; confidence and
 * the 12-model split are derived from the ranking gap. Offline, instant, free.
 *
 * v2: replace getPanelPick() with a call to a real ensemble (Option D), computed
 * once per day in netlify/functions/panel.js and cached. The interface — and
 * everything that consumes it — stays exactly the same.
 *
 * The fiction is honest: BOB chairs a panel of models and rules on the result.
 */

// The panel. BOB (Claude) chairs it; these are the twelve voices he weighs.
export const PANEL_MODELS = [
  'GPT-4o', 'Gemini', 'Llama', 'Mistral', 'DeepSeek', 'Qwen',
  'Grok', 'Command R', 'Phi', 'Yi', 'Claude Haiku', 'Cohere',
]

function rankOf(entrant, ranking) {
  const i = ranking.indexOf(entrant)
  return i === -1 ? ranking.length : i // unknown -> worst
}

// hash a string to a stable int (for deterministic dissent assignment)
function hashStr(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * getPanelPick(entrantA, entrantB, ranking, { youPick })
 * -> { pick, other, confidence, agree, dissent, split, tier, line }
 */
export function getPanelPick(entrantA, entrantB, ranking, { youPick } = {}) {
  const rA = rankOf(entrantA, ranking)
  const rB = rankOf(entrantB, ranking)
  const pick = rA <= rB ? entrantA : entrantB
  const other = pick === entrantA ? entrantB : entrantA

  const gap = Math.abs(rA - rB) // 1..7 typically
  // gap 1 -> ~0.55 (coinflip), gap 7 -> ~0.95 (lock)
  const confidence = Math.min(0.96, 0.5 + gap * 0.065)

  // How many of the 12 sided with BOB. Always a majority, but the spicier the
  // matchup the more holdouts. Deterministic per matchup.
  const onBob = Math.max(6, Math.min(12, Math.round(confidence * 12)))
  const dissentCount = 12 - onBob

  // Pick which named models dissent, deterministically.
  const seed = hashStr(entrantA + '|' + entrantB)
  const dissent = []
  for (let i = 0; i < dissentCount; i++) {
    dissent.push(PANEL_MODELS[(seed + i * 7) % PANEL_MODELS.length])
  }

  const split = PANEL_MODELS.map((m) => ({
    model: m,
    pick: dissent.includes(m) ? other : pick,
  }))

  const tier = confidence >= 0.82 ? 'lock' : confidence >= 0.66 ? 'lean' : 'coin'
  const agree = youPick != null ? youPick === pick : null
  const line = bobLine(tier, agree, onBob)

  return { pick, other, confidence, agree, dissent, split, onBob, tier, line }
}

/* ---------- BOB's voice — dry, deadpan, never cruel, occasionally warm ---------- */

const LINES = {
  lock: {
    agree: [
      "The panel barely deliberated. You saw it too. Good.",
      "Unanimous-ish. You're with the smart money. Rare.",
      "No debate up here. You read it the same way. Noted.",
      "We agree. Twelve models and you. I'll allow it.",
    ],
    differ: [
      "Twelve models leaned one way. You leaned the other. Bold.",
      "The panel's confident. You're alone. We'll let the people decide.",
      "That's a contrarian streak. I respect it. The room may not.",
      "You went off-book against a confident panel. This should be fun.",
    ],
  },
  lean: {
    agree: [
      "The panel leaned this way. So did you. Reasonable people, all of us.",
      "Slight edge here, and you took it. Sensible.",
      "We're on the same side, with a few holdouts. Comfortable.",
    ],
    differ: [
      "The panel leaned one way. You leaned the other. The room breaks the tie.",
      "Not unanimous up here, and you split off too. Anyone's matchup.",
      "Mild disagreement all around. The people get the last word.",
    ],
  },
  coin: {
    agree: [
      "Coin flip. The panel split. You and I landed together anyway.",
      "Nobody's sure on this one — including me. We agree, for now.",
      "Dead heat up here. You picked my side of the toss.",
    ],
    differ: [
      "Coin flip, and we called it differently. No shame coming.",
      "The panel was split. So are we. This is what the crowd is for.",
      "Genuinely too close to call. We disagree honestly.",
    ],
  },
}

function bobLine(tier, agree, onBob) {
  // Before a pick is made (agree === null) just describe the panel.
  if (agree == null) {
    if (tier === 'lock') return `The panel's settled. ${onBob} of 12.`
    if (tier === 'lean') return `The panel leans. ${onBob} of 12.`
    return `The panel's split. ${onBob} of 12. Anyone's guess.`
  }
  const pool = LINES[tier][agree ? 'agree' : 'differ']
  return pool[Math.floor(Math.random() * pool.length)]
}
