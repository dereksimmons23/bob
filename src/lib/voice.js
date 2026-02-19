/**
 * BOB Voice Module — ElevenLabs TTS via serverless proxy
 * API key stays server-side (/.netlify/functions/speak). Client just sends text.
 * Gracefully degrades when voice isn't configured or calls fail.
 */

let enabled = false
let available = null // null = unknown, true/false after first check
let currentAudio = null
const audioCache = new Map()

export const BobVoice = {
  /**
   * Check if voice is available (server has API key configured)
   * Pings the endpoint once, caches the result
   */
  async checkAvailable() {
    if (available !== null) return available
    try {
      const res = await fetch('/.netlify/functions/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'test' }),
      })
      // 503 = not configured, 200 = working
      available = res.ok
      return available
    } catch {
      available = false
      return false
    }
  },

  isAvailable() {
    return available === true
  },

  setEnabled(val) {
    enabled = val
    if (!val) this.stop()
  },

  /**
   * Speak text via /.netlify/functions/speak proxy
   */
  async speak(text) {
    if (!enabled || !text) return
    if (available === false) return

    const cacheKey = text.substring(0, 100)

    // Check cache
    if (audioCache.has(cacheKey)) {
      this.stop()
      currentAudio = new Audio(audioCache.get(cacheKey))
      await currentAudio.play().catch(() => {})
      return
    }

    try {
      const response = await fetch('/.netlify/functions/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        if (response.status === 503) available = false
        return
      }

      available = true
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      audioCache.set(cacheKey, url)

      this.stop()
      currentAudio = new Audio(url)
      await currentAudio.play().catch(() => {})
    } catch {
      // Graceful degradation
    }
  },

  stop() {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      currentAudio = null
    }
  },
}
