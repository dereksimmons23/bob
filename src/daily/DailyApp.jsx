import { useState, useEffect } from 'react'
import './daily.css'
import DailyHome from './DailyHome'
import DailyPlay from './DailyPlay'
import DailyResult from './DailyResult'
import { getDailyBracket, getTodayResult, saveTodayResult } from '../lib/daily'
import { SoundEffects } from '../lib/sound'
import { BobVoice } from '../lib/voice'
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../lib/storage'

export default function DailyApp() {
  const [bracket] = useState(() => getDailyBracket())
  const [screen, setScreen] = useState('home')
  const [mode, setMode] = useState('room')
  const [result, setResult] = useState(null)
  const [todayResult, setTodayResult] = useState(() => getTodayResult())
  const [showSettings, setShowSettings] = useState(false)

  const [sound, setSound] = useState(() => getStorageItem(STORAGE_KEYS.SOUND_ENABLED, true))
  const [voice, setVoice] = useState(() => getStorageItem(STORAGE_KEYS.VOICE_ENABLED, true))
  const [voiceAvailable, setVoiceAvailable] = useState(false)

  // init audio prefs + probe voice
  useEffect(() => {
    SoundEffects.enabled = sound
  }, [sound])

  useEffect(() => {
    let live = true
    BobVoice.checkAvailable().then((ok) => {
      if (!live) return
      setVoiceAvailable(ok)
      BobVoice.setEnabled(ok && voice)
    })
    return () => { live = false }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    BobVoice.setEnabled(voiceAvailable && voice)
  }, [voice, voiceAvailable])

  function handleComplete(res) {
    saveTodayResult(res)
    setResult(res)
    setTodayResult(res)
    setScreen('result')
  }

  function goFreeplay() {
    // Legacy app holds the curated Freeplay library + shared routes.
    window.location.href = '/?legacy=1'
  }

  function toggleSound() {
    const v = !sound
    setSound(v)
    setStorageItem(STORAGE_KEYS.SOUND_ENABLED, v)
  }
  function toggleVoice() {
    const v = !voice
    setVoice(v)
    setStorageItem(STORAGE_KEYS.VOICE_ENABLED, v)
  }

  if (screen === 'play') {
    return (
      <DailyPlay
        bracket={bracket}
        mode={mode}
        onComplete={handleComplete}
        onExit={() => setScreen('home')}
      />
    )
  }

  if (screen === 'result' && result) {
    return (
      <DailyResult
        result={result}
        onReplay={() => { setResult(null); setScreen('play') }}
        onFreeplay={goFreeplay}
        onHome={() => setScreen('home')}
      />
    )
  }

  return (
    <>
      <DailyHome
        bracket={bracket}
        mode={mode}
        setMode={setMode}
        onPlay={() => setScreen('play')}
        todayResult={todayResult}
        onSeeResult={() => { setResult(todayResult); setScreen('result') }}
        onFreeplay={goFreeplay}
        onSettings={() => setShowSettings(true)}
      />
      {showSettings && (
        <SettingsSheet
          sound={sound} onToggleSound={toggleSound}
          voice={voice} voiceAvailable={voiceAvailable} onToggleVoice={toggleVoice}
          onFreeplay={goFreeplay}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  )
}

function SettingsSheet({ sound, onToggleSound, voice, voiceAvailable, onToggleVoice, onFreeplay, onClose }) {
  return (
    <div
      className="bd"
      style={{ background: 'rgba(8,6,4,0.72)', backdropFilter: 'blur(6px)', zIndex: 50, display: 'flex', alignItems: 'flex-end' }}
      onClick={onClose}
    >
      <div
        className="bd-ticket"
        style={{ width: '100%', maxWidth: 540, margin: '0 auto', borderRadius: '20px 20px 0 0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bd-mast" style={{ borderBottom: 'none', paddingBottom: 4 }}>
          <div className="bd-mast-logo">SETTINGS</div>
          <button className="bd-iconbtn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <p className="bd-dim" style={{ fontSize: 14, lineHeight: 1.5, margin: '10px 0 18px' }}>
          One bracket a day. You pick. <b style={{ color: 'var(--bd-bob)' }}>BOB</b> — chairing a
          panel of 12 AI models — has already picked. The board shows where the room leans.
          Read it better than BOB and the streak is yours.
        </p>

        <Row label="Sound effects" on={sound} onClick={onToggleSound} />
        <Row
          label={voiceAvailable ? "BOB's voice" : "BOB's voice (unavailable)"}
          on={voice && voiceAvailable}
          onClick={voiceAvailable ? onToggleVoice : undefined}
          disabled={!voiceAvailable}
        />

        <button className="bd-btn bd-btn--ghost" style={{ marginTop: 16 }} onClick={onFreeplay}>
          Free Play — the full bracket library
        </button>
      </div>
    </div>
  )
}

function Row({ label, on, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--bd-bg2)', border: '1px solid var(--bd-line)', borderRadius: 12,
        padding: '14px 16px', marginBottom: 8, cursor: disabled ? 'default' : 'pointer',
        color: 'var(--bd-text)', fontFamily: 'var(--bd-body)', fontSize: 15, fontWeight: 600,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span>{label}</span>
      <span
        style={{
          fontFamily: 'var(--bd-mono)', fontSize: 12, letterSpacing: '0.1em',
          color: on ? 'var(--bd-win)' : 'var(--bd-faint)',
        }}
      >
        {on ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}
