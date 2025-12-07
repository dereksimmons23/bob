---
Created: December 5, 2025
Version: v1
Project: Battle o' Brackets
Context: Claude Project custom instructions
Status: Active
Confidentiality: Internal
Related: All project files
Target Location: /Users/dereksimmons/Desktop/BoB/ (reference copy)
Format Rationale: Instructions for consistent Claude Project collaboration
---

# Claude Project — Battle o' Brackets Custom Instructions

## Project Overview

**Project Name:** Battle o' Brackets — Uncle BOB  
**Description:** Family bracket voting game PWA with AI host personality, launching Christmas Eve 2025

**Goals:** 
- Ship production-ready v2.5 by December 19, 2025
- Expand dialogue variety (kill repetition)
- Integrate Derek's cloned ElevenLabs voice for Uncle BOB
- Add Olympics categories (Summer/Winter/Combined)
- Implement bracket tree visualization
- Final polish for family debut December 24, 2025

**Timeline:** December 5–19, 2025 (2 weeks, 10 hours, 5 days/week)

---

## Code Guidelines

### Architecture
- **Single-file PWA** — No build process, runs directly in browser
- **React 18 + Babel standalone** — CDN dependencies only
- **localStorage persistence** — No backend, offline-first
- **Canvas API** — Share image generation (confetti, champion display)
- **Web Audio API** — Sound effects (browser-native, no samples)

### File Structure
- **Production:** `/Users/dereksimmons/Desktop/BoB/index.html`
- **Manifest:** `/Users/dereksimmons/Desktop/BoB/manifest.json`
- **Documentation:** Markdown files in `/Users/dereksimmons/Desktop/BoB/`
- **Archive:** Previous versions in `/Users/dereksimmons/Desktop/BoB/archive/`

### Bundle Size Limits
- Target: Keep under 150 KB
- Voice API calls are external (no impact)
- Emojis are zero-cost
- Images should be avoided (too large)

### localStorage Keys
- `bob-vault-v2` — Champion history
- `bob-custom-categories` — User-saved categories
- `bob-voice-enabled` — Voice on/off toggle (v2.5)

---

## Uncle BOB Character Guidelines

### Core Personality
- **Deadpan wit** — Never oversells a joke
- **Measured delivery** — Even excited lines are controlled
- **Impatience with warmth** — Affectionate, not hostile
- **Strong food opinions** — Gets invested in food brackets
- **Chaos tolerance** — "I've seen worse" energy
- **Unexpected depth** — Drops profound observations, moves on

### Writing Rules
1. Keep lines short (1–2 sentences max)
2. No exclamation points (except championship moments)
3. Imagine Uncle Bob saying it in a deadpan monotone
4. Occasional profound observation, then move on
5. Never apologize for opinions
6. No "AMAZING!" or "WOW!" — that's not BOB

### When Dialogue Plays
- **Category opener** — First line after category selected
- **Matchup commentary** — Optional during voting
- **Result reactions** — Immediately after vote locks
- **Tie situations** — Initial tie, then resolution
- **Championship moments** — Final two matchups
- **Edge cases** — Play-ins, large brackets, single voter

### Dialogue Organization
- Organized by context (opener, matchup, result, tie, championship)
- 4–6 variants per context (rotation, no repeats in single bracket)
- Theme-specific lines (Food, Music, Movies, Sports, Games, Random, Holiday, Olympics)
- Generic fallbacks for any category

---

## Feature Development Priorities

### v2.5 (Dec 5–19, In Progress)
1. **Dialogue Expansion** — 50+ new lines, rotation engine
2. **Voice Integration** — ElevenLabs cloned voice, settings toggle
3. **Olympics Categories** — Summer, Winter, Combined events
4. **Bracket Visualization** — Tree view display
5. **Sound Strategy** — Strategic SFX placement
6. **Testing & Polish** — Device testing, quality checks

### v2.6 (Future, January+)
- Sports team logos (MLB, NBA, NFL)
- Advanced bracket animations
- Spotify embed exploration (external)
- Improved tree view styling

### v3+ (Future)
- User-provided media uploads
- External API integrations
- Multi-language support
- Export/import categories

---

## Testing Requirements

### Device Coverage
- ✅ iOS Safari (iPhone)
- ✅ Android Chrome (latest)
- ✅ iPad/tablet
- ✅ macOS Safari/Chrome
- ✅ Windows Chrome/Edge

### Functional Testing
- ✅ Quick Start mode (2-tap gameplay)
- ✅ Custom category builder
- ✅ Voting system (lock-in, tie-breaker flow)
- ✅ Voice toggle (on/off in settings)
- ✅ Sound effects (volume balance)
- ✅ Dialogue variety (no repeats in single bracket)
- ✅ Olympics categories (all three types)
- ✅ Bracket tree view display
- ✅ Vault history (champion archive)
- ✅ Share champion (canvas image + copy text)
- ✅ PWA install (home screen)

### Quality Checkpoints
- **Dialogue:** No repeats within single bracket session
- **Voice:** Clear, appropriate speed, deadpan tone
- **Performance:** Page load <2s on 4G, bracket flow smooth
- **Sound:** Not overpowering, optional toggle works
- **Bracket:** Readable on all screen sizes, battle feel evident

---

## Documentation Standards

### File Naming
```
[ProjectAspect]_[Type]_v[X].md

Examples:
- BOB-CHARACTER-BIBLE.md
- MULTIMEDIA-STRATEGY.md
- V2.5-SPRINT-PLAN.md
- VOICE-STRATEGY.md
```

### Metadata Header (All Docs)
```
---
Created: [Date]
Version: v[X]
Project: Battle o' Brackets
Context: [What this doc covers]
Status: [Draft/Active/Archive]
Confidentiality: [Internal/Public/Confidential]
Related: [Other related docs]
---
```

### Knowledge Base (Claude Project)
- BOB-CHARACTER-BIBLE.md — Personality, dialogue system
- CATEGORY-LIBRARY.md — All categories with entrants
- MULTIMEDIA-STRATEGY.md — Media integration framework
- VOICE-STRATEGY.md — ElevenLabs integration
- V2.5-SPRINT-PLAN.md — Development roadmap
- FEATURE-ROADMAP.md — What's built, what's planned
- PROJECT-README.md — Project overview
- GAME-SHOW-HOST-RESEARCH.md — BOB inspiration sources

---

## Collaboration Workflow

### Daily Standups
- **When:** Start of each session
- **What:** What we built yesterday, what we're building today
- **Format:** Brief (2–3 sentences)

### Version Control
- Always update version numbers (v1 → v2, etc.)
- Document changes in metadata
- Archive old versions (don't delete)

### Code Commits (for GitHub mirror)
- Format: `[BoB-v2.5] Task: Expanded dialogue system`
- Reference sprint task if applicable
- Keep messages concise

### Blockers & Notes
- Flag any blockers immediately (API issues, design decisions, etc.)
- Use knowledge base docs to track context
- Update memory with progress snapshots

---

## Decision Framework

### When Adding Features
**Must answer all:**
1. Does this fit Uncle BOB's character?
2. Does it keep bundle size under 150 KB?
3. Can it be tested on all devices before Dec 19?
4. Is code maintainable (single-file architecture)?
5. Will it work offline or gracefully degrade?

### When Expanding Dialogue
**Must follow:**
1. Maintain deadpan tone
2. No repeats in single bracket
3. Varied by category theme
4. 1–2 sentences max per line
5. Test reads in monotone

### When Integrating External APIs
**Must have:**
1. Fallback if API unavailable
2. No breaking offline functionality
3. Error handling (silent failures preferred)
4. Performance: <3s latency acceptable
5. No bundle bloat

---

## Special Considerations

### Family Audience (Ages 10–70)
- Content appropriate for all ages
- No alcohol/political/controversial references
- Humor works across generations
- Design accessible (readable fonts, touch-friendly)

### Christmas Eve 2025 Debut
- Hard deadline: December 24, 5 PM
- 5-day testing buffer before launch
- Family of 10–20 participants
- Mix of technical + non-technical users
- Generational chaos is the *feature*

### UI/UX Expectations
- Mobile-first (most users on phones)
- Touch-friendly buttons/inputs
- Clear visual hierarchy
- Fast load times (low patience for delays)
- Sound effects optional (respect quiet moments)

---

## Deployment & Launch

### Pre-Launch Checklist (Dec 19)
- [ ] All v2.5 features complete
- [ ] Tested on iOS, Android, desktop
- [ ] Voice quality approved
- [ ] Dialogue variety confirmed (no repeats)
- [ ] Olympics categories live
- [ ] Bracket tree view renders correctly
- [ ] Sound effects balanced
- [ ] Settings toggles work (voice, sound)
- [ ] Vault history functional
- [ ] Share champion works
- [ ] PWA installable

### Launch Day (Dec 24)
- [ ] index.html deployed and live
- [ ] Family gathering (physical test)
- [ ] Capture feedback (bugs, feature requests)
- [ ] Note any crashes/performance issues
- [ ] Record Uncle BOB moments

### Post-Launch (v2.6 planning)
- Incorporate family feedback
- Plan next feature priorities
- Document wins and learnings

---

## Communication Norms

### Response Style
- Direct, concise, actionable
- Flag blockers immediately
- Provide context when requesting decisions
- Use project docs for reference, not re-explain

### When Stuck
- Describe the blocker clearly
- Provide options if available
- Ask for specific help needed
- Reference relevant docs

### Victory Moments
- When features land, note it in daily standup
- When quality improvements made, document
- When blockers cleared, quick note

---

## Key Contacts & Resources

**Project Owner:** Coach D (Derek Simmons)  
**Primary:** simmons.derek@gmail.com  
**Timezone:** America/Chicago

**External Resources:**
- ElevenLabs API: https://elevenlabs.io/
- React 18 docs: https://react.dev/
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- PWA docs: https://web.dev/progressive-web-apps/

**Project Files:**
- Local: `/Users/dereksimmons/Desktop/BoB/`
- GitHub: (TBD if mirrored)
- Archive: `/Users/dereksimmons/Desktop/BoB/archive/`

---

## Success Metrics

**v2.5 Ships When:**
- ✅ 50+ unique BOB lines (no repeats in bracket)
- ✅ Voice toggleable (works on iOS/Android)
- ✅ Olympics categories (3 types live)
- ✅ Bracket tree view (renders mobile-friendly)
- ✅ All devices tested + passing
- ✅ 5 days buffer before Christmas Eve

**Family Debut Success:**
- ✅ No crashes during gameplay
- ✅ Voice quality acceptable (audible, clear)
- ✅ Dialogue gets laughs (deadpan lands)
- ✅ Game flow smooth (voting to results fast)
- ✅ At least one "championship" bracket completed
- ✅ Family wants to play again

---

## Notes

This project is not about shipping the perfect game. It's about shipping a *memorable* experience that brings family together around intentional decisions (which brackets matter, who gets the championship).

Uncle BOB's voice, the expanded dialogue, the bracket visualization — these are touches that make it feel *special*. Keep that in mind as we build.

Let's ship something worth playing on Christmas Eve.
