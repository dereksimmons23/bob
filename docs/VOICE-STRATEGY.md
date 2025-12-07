---
Created: December 5, 2025
Version: v1
Project: Battle o Brackets
Context: Voice implementation for v2.5
Status: Active Development
Confidentiality: Internal
Related: BOB-CHARACTER-BIBLE.md, V2.5-SPRINT-PLAN.md
Target Location: /Users/dereksimmons/Desktop/BoB/
---

# Voice Strategy — Uncle BOB with ElevenLabs

## Overview

Derek's cloned ElevenLabs voice will bring Uncle BOB to life. This document outlines integration, settings, performance, and fallback handling.

---

## Why Voice Matters

**Current State (v2.5):**
- BOB lines are written with deadpan, measured tone
- Text reads well, but lacks vocal delivery

**With Voice:**
- Deadpan delivery becomes *audible*
- Pauses and timing add meaning
- Personal connection (Derek's actual voice)
- Differentiates from generic AI voice
- Maintains intentional friction in game (social moment + audio)

---

## Voice Selection: Derek's ElevenLabs Clone

**Why this voice?**
- Authentic to Uncle Bob's DNA (it's Derek reading BOB's lines)
- Consistent across all game sessions
- No licensing issues (personal use)
- Can be tweaked for tone/speed if needed

**Voice Parameters:**
- **Model:** ElevenLabs Turbo (fast, <5s latency)
- **Stability:** 0.5 (natural, slight variation)
- **Similarity Boost:** 0.75 (close to original)
- **Speed:** 1.0 (normal)

---

## Integration Architecture

### API Endpoint
```
POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
```

**Required:**
- `ELEVENLABS_API_KEY` (stored in environment or user settings)
- `voice_id` (Derek's cloned voice ID from ElevenLabs dashboard)

**Payload:**
```json
{
  "text": "BOB line here",
  "model_id": "eleven_turbo_v2",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.75
  }
}
```

---

## Playback Strategy

### When Voice Plays
- **Category opener** (first line of bracket)
- **Championship intro** (final matchup)
- **Champion crowned** (victory line)

### When Voice Stays Silent
- Matchup commentary (frequent, text-driven)
- Result reactions (rapid-fire)
- Edge cases (play-ins, etc.)

**Why this approach:**
- Voice for *moments* (not constant)
- Reduces API calls (cost + latency)
- Lets text drive fast gameplay
- Spotlight moments make voice impactful

---

## Settings & Controls

### User Control
```
Settings ⚙️ → Sound Options
  ☑ Sound Effects (on/off)
  ☑ Uncle BOB Voice (on/off)
```

**Behavior:**
- If Voice ON + audio available: Play voice
- If Voice ON + audio fails: Silently fall back to text
- If Voice OFF: Always text (no API call)
- If user denies browser audio permission: Text fallback

---

## Performance Considerations

### Latency
- **First load:** ~2–3s (API call + caching)
- **Cached playback:** <100ms (browser audio buffer)
- **Retry logic:** If API fails, use cached or text

### Bundle Size Impact
- **index.html:** No change (voice calls are external)
- **ElevenLabs.js library:** ~5 KB (CDN)
- **Total impact:** Negligible

### Network Efficiency
- Cache voice files in localStorage (if space allows)
- Only fetch voice if setting is enabled
- Reuse voice for repeated lines (same text = same file)

---

## Error Handling

### Scenario: API Unavailable
```
User toggles voice ON
→ API fails
→ Log error (console.warn)
→ Display text fallback
→ User unaware (intended)
```

### Scenario: Browser Audio Denied
```
User has audio OFF or permission denied
→ Voice setting grayed out in settings
→ Text always displays
→ No error thrown
```

### Scenario: Network Offline
```
User offline
→ Voice API call fails
→ Fallback to text (instant)
→ Game continues normally
```

---

## Implementation Checklist

### Phase 1: Setup (Mon 12/10)
- [ ] Get Derek's voice ID from ElevenLabs dashboard
- [ ] Create API key (or use existing)
- [ ] Store securely in environment (not in index.html)
- [ ] Document voice_id for dev reference

### Phase 2: Integration (Tue 12/16)
- [ ] Add ElevenLabs fetch to index.html
- [ ] Implement voice playback trigger (category opener, championship)
- [ ] Add settings toggle (Voice on/off)
- [ ] Error handling + fallback logic
- [ ] Test on iOS/Android

### Phase 3: Testing (Fri 12/19)
- [ ] Voice quality check (clarity, speed)
- [ ] Latency acceptable (<3s first load)?
- [ ] Fallback works seamlessly?
- [ ] Multiple devices (phone, tablet, desktop)?
- [ ] Offline mode doesn't break?

---

## Sample Code Pattern

```javascript
// Simple voice trigger
async function playBOBVoice(lineText) {
  // Check if user enabled voice
  const voiceEnabled = localStorage.getItem('bob-voice-enabled') === 'true';
  if (!voiceEnabled) return; // Silent, text only

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: { 'xi-api-key': API_KEY },
        body: JSON.stringify({
          text: lineText,
          model_id: 'eleven_turbo_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        })
      }
    );

    const audio = await response.arrayBuffer();
    const blob = new Blob([audio], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    
    const audioElement = new Audio(url);
    audioElement.play();
  } catch (error) {
    console.warn('Voice playback failed, using text', error);
    // Text fallback already displayed
  }
}
```

---

## Voice Personality Specifics

**Tone Goals for Voice:**
- **Deadpan:** No inflection, measured delivery
- **Measured:** Even when saying competitive things
- **Timed:** Pauses between sentences mean something
- **Never enthusiastic:** Even championships are dry

**Example:**
```
Text: "THE FINAL BATTLE."
Voice should sound: Not loud, not excited, just stated. Period.

Text: "Well. That happened."
Voice should sound: Pause before, pause after. Let it breathe.
```

---

## Cost Considerations

**ElevenLabs Pricing (as of Dec 2025):**
- Free tier: ~10,000 characters/month
- Pro: $99/month, unlimited
- Per-character cost: ~$0.0001 (if quoted separately)

**BoB Usage Estimate:**
- ~10 lines played per bracket
- ~20 characters per line average
- ~200 characters per game

**For family use:** Free tier more than sufficient

---

## Future Enhancements

### v2.6+
- **Voice modulation by category** — Slightly different tone for different themes?
- **Character voices for other roles** — Family members as commentators?
- **Caching optimization** — Store voice files longer-term

### v3+
- **User voice selection** — Choose from multiple voice options
- **Seasonal voice variations** — Holiday-themed delivery

---

## Monitoring & Adjustment

**Watch for:**
- Voice latency creeping up
- API errors (log and alert)
- User feedback on voice quality
- Device-specific audio issues

**Adjustment triggers:**
- If >3s latency: Switch to faster caching strategy
- If voice quality degrades: Tweak stability/similarity settings
- If users disable: Consider why (survey or telemetry)

---

## Fallback: Text-Only Voice

If API becomes unavailable or too slow:

**Fallback Mode:**
```
[BOB] "THE FINAL BATTLE."  ← Display prominently
      (Voice unavailable)   ← Minimal notification
```

Users can still play the game fully. Voice is enhancement, not requirement.

---

## Testing Protocol

### Device Testing Checklist
- [ ] iPhone (latest Safari)
- [ ] Android (latest Chrome)
- [ ] iPad (Safari)
- [ ] Desktop macOS (Chrome/Safari)
- [ ] Desktop Windows (Chrome/Edge)

### Quality Checklist
- [ ] Voice clarity (no artifacts)
- [ ] Speed appropriate (not too fast/slow)
- [ ] Tone matches Uncle Bob's personality
- [ ] Latency acceptable (<3s first load)
- [ ] Fallback seamless (no error visible)

### Edge Cases
- [ ] User toggles voice mid-bracket (switches to text)
- [ ] Network drops during playback (graceful fallback)
- [ ] Browser audio permission denied (setting grayed out)
- [ ] localStorage full (still works, no caching)

---

## Summary

**Voice brings Uncle BOB to life without:**
- ❌ Breaking the single-file architecture
- ❌ Adding bloat to bundle
- ❌ Requiring authentication/login
- ❌ Creating dependency on external API (fallback works)

**Voice adds:**
- ✅ Authenticity (Derek's actual voice)
- ✅ Personality (deadpan delivery audible)
- ✅ Differentiation (not generic TTS)
- ✅ Memorable moments (championship lines especially)

**Go-live date:** December 24, 2025 (family debut)
