/**
 * The Crowd — the scoreboard / answer key for "Read the Room."
 *
 * HONEST DEGRADATION:
 *  - When real votes exist (Supabase `daily_votes`), use them. source: 'live'.
 *  - Until then (the project is paused / a matchup has too few votes), fall back
 *    to a deterministic "early read" derived from the bracket's authored
 *    `crowdLean`. It is ALWAYS labeled source: 'estimate' so the UI can say so.
 *    We never present an estimate as if it were real crowd data.
 *
 * Determinism matters: the estimate is seeded by matchup + day, so every player
 * sees the same "early read" and the game stays fair before live data arrives.
 */

const MIN_LIVE_VOTES = 8 // below this, an estimate reads better than noise

function hashStr(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rankOf(entrant, ranking) {
  const i = ranking.indexOf(entrant)
  return i === -1 ? ranking.length : i
}

/**
 * Deterministic estimate of how the crowd splits a matchup.
 * Returns { winner, pctA, pctB, source:'estimate', n:0 }
 */
function estimateSplit(entrantA, entrantB, template, dayNumber) {
  const ranking = template.crowdLean || template.bobRanking
  const rA = rankOf(entrantA, ranking)
  const rB = rankOf(entrantB, ranking)
  const winner = rA <= rB ? entrantA : entrantB
  const gap = Math.abs(rA - rB)

  // gap 1 -> ~55%, gap 7 -> ~85%, plus a little stable jitter for texture.
  const jitter = (hashStr(entrantA + '|' + entrantB + '|' + dayNumber) % 1000) / 1000 // 0..1
  let pctWinner = 53 + gap * 4.5 + jitter * 6
  pctWinner = Math.max(52, Math.min(88, Math.round(pctWinner)))

  const pctA = winner === entrantA ? pctWinner : 100 - pctWinner
  return { winner, pctA, pctB: 100 - pctA, source: 'estimate', n: 0 }
}

/**
 * getCrowdSplit — async so the live path can query Supabase later without an
 * interface change. v1 resolves immediately to the estimate.
 */
export async function getCrowdSplit(entrantA, entrantB, template, dayNumber) {
  // v2 will: query daily_votes for (dayNumber, matchupId); if n >= MIN_LIVE_VOTES
  // return real percentages with source:'live'. For now, estimate.
  void MIN_LIVE_VOTES
  return estimateSplit(entrantA, entrantB, template, dayNumber)
}

// Synchronous estimate — handy for simulating the crowd's full bracket path.
export function getCrowdSplitSync(entrantA, entrantB, template, dayNumber) {
  return estimateSplit(entrantA, entrantB, template, dayNumber)
}

/**
 * submitVote — records a real vote for live crowd data.
 * Safe no-op until Supabase is restored and the table exists.
 */
export async function submitVote({ dayNumber, matchupId, pick, deviceId }) {
  void { dayNumber, matchupId, pick, deviceId }
  // v2:
  // await supabase.from('daily_votes').insert({ day_number, matchup_id, pick, device_id })
  return { ok: true, queued: false }
}
