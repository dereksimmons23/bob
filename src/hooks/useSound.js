import { useCallback, useState, useEffect } from 'react'
import { SoundEffects } from '../lib/sound'

/**
 * Hook for managing sound effects
 */
export function useSound() {
  const [enabled, setEnabled] = useState(() => SoundEffects.enabled)

  // Sync state with SoundEffects object
  useEffect(() => {
    SoundEffects.setEnabled(enabled)
  }, [enabled])

  const play = useCallback((type) => {
    SoundEffects.play(type)
  }, [])

  const toggle = useCallback(() => {
    setEnabled(prev => {
      const newValue = !prev
      SoundEffects.setEnabled(newValue)
      return newValue
    })
  }, [])

  const setEnabledState = useCallback((value) => {
    setEnabled(value)
    SoundEffects.setEnabled(value)
  }, [])

  return {
    enabled,
    play,
    toggle,
    setEnabled: setEnabledState,
  }
}
