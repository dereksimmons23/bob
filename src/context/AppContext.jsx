import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { SoundEffects } from '../lib/sound'
import { SEED_VAULT_DATA } from '../data/seedVault'
import {
  getVaultHistory,
  saveVaultHistory,
  getPlayerCount,
  savePlayerCount,
  hasVisited,
  markVisited,
  STORAGE_KEYS
} from '../lib/storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // App-wide settings
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [playerCount, setPlayerCount] = useState(() => getPlayerCount())

  // Vault (history of brackets)
  const [history, setHistory] = useState(() => getVaultHistory(SEED_VAULT_DATA))

  // First-time visitor
  const [isFirstVisit, setIsFirstVisit] = useState(() => !hasVisited())

  // Custom categories
  const [customCategories, setCustomCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_CATEGORIES)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Modal states
  const [showSettings, setShowSettings] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showLegal, setShowLegal] = useState(false)
  const [showDevTools, setShowDevTools] = useState(false)
  const [confirmModal, setConfirmModal] = useState(null)

  // Dev mode check
  const isDevMode = new URLSearchParams(window.location.search).get('dev') === 'true'

  // Year in Review mode
  const [isYearInReview, setIsYearInReview] = useState(false)
  const [yirRound, setYirRound] = useState(0)
  const [yirWinners, setYirWinners] = useState([])

  // Persist settings
  useEffect(() => {
    saveVaultHistory(history)
  }, [history])

  useEffect(() => {
    savePlayerCount(playerCount)
  }, [playerCount])

  useEffect(() => {
    SoundEffects.setEnabled(soundEnabled)
  }, [soundEnabled])

  // Sound toggle
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev
      SoundEffects.setEnabled(newValue)
      return newValue
    })
  }, [])

  // Vault operations
  const addToVault = useCallback((entry) => {
    setHistory(prev => [entry, ...prev])
  }, [])

  const deleteFromVault = useCallback((index) => {
    setHistory(prev => prev.filter((_, i) => i !== index))
  }, [])

  const editVaultEntry = useCallback((index, updates) => {
    setHistory(prev => prev.map((entry, i) =>
      i === index ? { ...entry, ...updates } : entry
    ))
  }, [])

  const clearVault = useCallback(() => {
    setHistory([])
  }, [])

  const resetVault = useCallback(() => {
    setHistory(SEED_VAULT_DATA)
  }, [])

  // First visit handling
  const dismissFirstVisit = useCallback(() => {
    markVisited()
    setIsFirstVisit(false)
  }, [])

  // Custom categories
  const addCustomCategory = useCallback((category) => {
    setCustomCategories(prev => {
      const updated = [...prev, category]
      localStorage.setItem(STORAGE_KEYS.CUSTOM_CATEGORIES, JSON.stringify(updated))
      return updated
    })
  }, [])

  // Clear all storage
  const clearAllStorage = useCallback(() => {
    localStorage.clear()
    window.location.reload()
  }, [])

  // Reset first visit (dev tool)
  const resetFirstVisit = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.HAS_VISITED)
    window.location.reload()
  }, [])

  const value = {
    // Settings
    soundEnabled,
    toggleSound,
    playerCount,
    setPlayerCount,
    isDevMode,

    // Vault
    history,
    addToVault,
    deleteFromVault,
    editVaultEntry,
    clearVault,
    resetVault,

    // First visit
    isFirstVisit,
    dismissFirstVisit,

    // Custom categories
    customCategories,
    addCustomCategory,

    // Year in Review
    isYearInReview,
    setIsYearInReview,
    yirRound,
    setYirRound,
    yirWinners,
    setYirWinners,

    // Modal states
    showSettings,
    setShowSettings,
    showFeedback,
    setShowFeedback,
    showAdmin,
    setShowAdmin,
    showAbout,
    setShowAbout,
    showLegal,
    setShowLegal,
    showDevTools,
    setShowDevTools,
    confirmModal,
    setConfirmModal,

    // Dev tools
    clearAllStorage,
    resetFirstVisit,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
