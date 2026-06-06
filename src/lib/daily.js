/**
 * BOB Daily engine.
 * - Resolves TODAY'S bracket deterministically from the date, so every player
 *   in the world gets the same bracket and the same matchup order.
 * - Owns the "already played today" lock and the streak record (localStorage).
 */

import { DAILY_BRACKETS, DAILY_EPOCH } from '../data/dailyBrackets'

/* ---------- seeded RNG (deterministic, shareable across players) ---------- */

// mulberry32 — tiny, fast, good enough for shuffling.
export function makeRng(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function seededShuffle(array, seed) {
  const out = [...array]
  const rng = makeRng(seed)
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/* ---------- date helpers ---------- */

// Local YYYY-MM-DD (so the "daily" rolls over at the player's midnight).
export function dateKey(d = new Date()) {
  return d.toLocaleDateString('en-CA') // en-CA formats as YYYY-MM-DD
}

export function getDayNumber(d = new Date()) {
  const epoch = new Date(DAILY_EPOCH + 'T00:00:00')
  const today = new Date(dateKey(d) + 'T00:00:00')
  const diff = Math.floor((today - epoch) / 86400000)
  return diff + 1 // BOB Daily #1 on the epoch date
}

export function msUntilTomorrow(d = new Date()) {
  const next = new Date(d)
  next.setHours(24, 0, 0, 0)
  return next - d
}

/* ---------- today's bracket ---------- */

// A fixed, seed-shuffled rotation of the templates so the order feels random
// but is identical for everyone, and doesn't simply march down the array.
const SCHEDULE = seededShuffle(DAILY_BRACKETS, 1972) // 1972 — the undefeated year

export function getDailyBracket(dayNumber = getDayNumber()) {
  const idx = ((dayNumber - 1) % SCHEDULE.length + SCHEDULE.length) % SCHEDULE.length
  const template = SCHEDULE[idx]
  // Deterministic first-round pairing: seed by day number so all players match.
  const order = seededShuffle(template.entrants, dayNumber * 7919)
  return { ...template, dayNumber, order }
}

/* ---------- played-today lock ---------- */

const resultKey = (dn) => `bob-daily-result-${dn}`

export function getTodayResult(dayNumber = getDayNumber()) {
  try {
    const raw = localStorage.getItem(resultKey(dayNumber))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function hasPlayedToday(dayNumber = getDayNumber()) {
  return getTodayResult(dayNumber) != null
}

export function saveTodayResult(result, dayNumber = getDayNumber()) {
  try {
    localStorage.setItem(resultKey(dayNumber), JSON.stringify(result))
  } catch {
    /* storage full / disabled — non-fatal */
  }
  updateStreak(result, dayNumber)
}

/* ---------- streak record ---------- */

const STREAK_KEY = 'bob-daily-streak'

export function getStreak() {
  try {
    return (
      JSON.parse(localStorage.getItem(STREAK_KEY)) || {
        played: 0,
        currentStreak: 0,
        maxStreak: 0,
        beatBob: 0,
        lastDayNumber: null,
      }
    )
  } catch {
    return { played: 0, currentStreak: 0, maxStreak: 0, beatBob: 0, lastDayNumber: null }
  }
}

function updateStreak(result, dayNumber) {
  const s = getStreak()
  if (s.lastDayNumber === dayNumber) return // don't double-count a replay
  const consecutive = s.lastDayNumber === dayNumber - 1
  s.played += 1
  s.currentStreak = consecutive ? s.currentStreak + 1 : 1
  s.maxStreak = Math.max(s.maxStreak, s.currentStreak)
  if (result.youWon) s.beatBob += 1
  s.lastDayNumber = dayNumber
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(s))
  } catch {
    /* non-fatal */
  }
}
