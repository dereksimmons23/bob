import { useState, useCallback, useEffect } from 'react'
import { SEED_VAULT_DATA } from '../data/seedVault'
import { getVaultHistory, saveVaultHistory } from '../lib/storage'

/**
 * Hook for managing vault history
 */
export function useVault() {
  const [history, setHistory] = useState(() => getVaultHistory(SEED_VAULT_DATA))

  // Persist to localStorage on change
  useEffect(() => {
    saveVaultHistory(history)
  }, [history])

  // Add a new entry to the vault
  const addEntry = useCallback((entry) => {
    setHistory(prev => [entry, ...prev])
  }, [])

  // Delete an entry by index
  const deleteEntry = useCallback((index) => {
    setHistory(prev => prev.filter((_, i) => i !== index))
  }, [])

  // Edit an entry by index
  const editEntry = useCallback((index, updates) => {
    setHistory(prev => prev.map((entry, i) =>
      i === index ? { ...entry, ...updates } : entry
    ))
  }, [])

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  // Reset to seed data
  const resetToSeed = useCallback(() => {
    setHistory(SEED_VAULT_DATA)
  }, [])

  // Get entry by index
  const getEntry = useCallback((index) => {
    return history[index] || null
  }, [history])

  return {
    history,
    addEntry,
    deleteEntry,
    editEntry,
    clearHistory,
    resetToSeed,
    getEntry,
    count: history.length,
  }
}
