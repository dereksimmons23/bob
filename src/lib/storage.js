/**
 * LocalStorage helpers for Battle o' Brackets
 * Centralized storage keys and utility functions
 */

// Storage keys
export const STORAGE_KEYS = {
  VAULT: 'bob-vault-v2',
  PLAYER_COUNT: 'bob-player-count',
  HAS_VISITED: 'bob-has-visited',
  SOUND_ENABLED: 'bob-sound-enabled',
  CUSTOM_CATEGORIES: 'bob-custom-categories',
}

/**
 * Get item from localStorage with JSON parsing
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Parsed value or default
 */
export function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e)
    return defaultValue
  }
}

/**
 * Set item in localStorage with JSON stringify
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage:`, e)
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn(`Error removing ${key} from localStorage:`, e)
  }
}

/**
 * Clear all BOB-related storage
 */
export function clearAllStorage() {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeStorageItem(key)
  })
}

/**
 * Get vault history from storage
 * @param {Array} seedData - Default seed data for new users
 * @returns {Array} Vault history
 */
export function getVaultHistory(seedData = []) {
  const saved = getStorageItem(STORAGE_KEYS.VAULT, null)
  if (saved && saved.length > 0) {
    return saved
  }
  return seedData
}

/**
 * Save vault history to storage
 * @param {Array} history - Vault history to save
 */
export function saveVaultHistory(history) {
  setStorageItem(STORAGE_KEYS.VAULT, history)
}

/**
 * Get player count preference
 * @returns {number} Player count (default 4)
 */
export function getPlayerCount() {
  const saved = localStorage.getItem(STORAGE_KEYS.PLAYER_COUNT)
  return saved ? parseInt(saved, 10) : 4
}

/**
 * Save player count preference
 * @param {number} count - Player count
 */
export function savePlayerCount(count) {
  localStorage.setItem(STORAGE_KEYS.PLAYER_COUNT, count.toString())
}

/**
 * Check if user has visited before
 * @returns {boolean}
 */
export function hasVisited() {
  return localStorage.getItem(STORAGE_KEYS.HAS_VISITED) === 'true'
}

/**
 * Mark user as having visited
 */
export function markVisited() {
  localStorage.setItem(STORAGE_KEYS.HAS_VISITED, 'true')
}
