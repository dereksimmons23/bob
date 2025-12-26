export const SoundEffects = {
  audioContext: null,
  enabled: true,

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
    return this.audioContext
  },

  play(type) {
    if (!this.enabled) return
    try {
      const ctx = this.init()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      switch (type) {
        case 'vote':
          oscillator.frequency.setValueAtTime(800, ctx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1)
          gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.1)
          break

        case 'lock':
          oscillator.frequency.setValueAtTime(600, ctx.currentTime)
          oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.1)
          oscillator.frequency.setValueAtTime(1000, ctx.currentTime + 0.2)
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.3)
          break

        case 'champion': {
          const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15)
            gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.15)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.4)
            osc.start(ctx.currentTime + i * 0.15)
            osc.stop(ctx.currentTime + i * 0.15 + 0.4)
          })
          break
        }

        case 'tie':
          oscillator.type = 'sawtooth'
          oscillator.frequency.setValueAtTime(200, ctx.currentTime)
          oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.2)
          gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.4)
          break

        case 'advance':
          // Triumphant two-note advancement
          oscillator.type = 'triangle'
          oscillator.frequency.setValueAtTime(440, ctx.currentTime)
          oscillator.frequency.setValueAtTime(554, ctx.currentTime + 0.12)
          gainNode.gain.setValueAtTime(0.12, ctx.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.25)
          break

        case 'roundComplete': {
          // Fanfare for completing a round
          const fanfare = [392, 440, 523, 659] // G4, A4, C5, E5
          fanfare.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'triangle'
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1)
            gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.1)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3)
            osc.start(ctx.currentTime + i * 0.1)
            osc.stop(ctx.currentTime + i * 0.1 + 0.3)
          })
          break
        }

        case 'dramatic':
          // Tension builder for championship
          oscillator.type = 'sine'
          oscillator.frequency.setValueAtTime(150, ctx.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.5)
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime)
          gainNode.gain.setValueAtTime(0.12, ctx.currentTime + 0.25)
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6)
          oscillator.start(ctx.currentTime)
          oscillator.stop(ctx.currentTime + 0.6)
          break
      }
    } catch (e) {
      // Silent fail - audio not critical
    }
  },

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  },

  setEnabled(enabled) {
    this.enabled = enabled
  }
}
