# Battle o Brackets — Claude Project

## Overview

**Battle o Brackets (BoB)** is a party game PWA for running tournament-style voting brackets at family gatherings. Players vote on head-to-head matchups until a champion is crowned.

**Live:** [battle-of-brackets.netlify.app](https://battle-of-brackets.netlify.app)

**Local Files:** `/Users/dereksimmons/Desktop/bob/`

---

## Project Structure (v2.6+)

```
bob/
├── src/
│   ├── main.jsx          # React DOM entry
│   ├── App.jsx           # Main router + state
│   ├── components/       # UI components
│   │   ├── ui/           # Atoms (Button, Input, Logo, etc.)
│   │   └── *.jsx         # Features (BobSays, MatchupCard, etc.)
│   ├── screens/          # Page components
│   ├── modals/           # Modal dialogs
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React Context providers
│   ├── lib/              # Utilities
│   └── data/             # Constants
├── docs/                 # Documentation
├── dist/                 # Production build
└── public-legacy/        # Original single-file version
```

### Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routing and state |
| `src/data/bob.js` | BOB personality and dialogue |
| `src/data/categories.js` | Category library (100+ presets) |
| `src/lib/bracket.js` | Bracket generation logic |
| `src/hooks/useBracket.js` | Game flow hook |
| `docs/BOB-CHARACTER-BIBLE.md` | Full personality guide |
| `docs/FEATURE-ROADMAP.md` | What's built, what's planned |

---

## Core Concept

- Family bracket voting game played at Thanksgiving/Christmas
- Ages 10-70 participate — generational warfare is the feature
- Tie-breakers by calling family members = hilarious chaos
- "Coldplay beat Foo Fighters" outcomes become family lore

---

## The Character: BOB

BOB is the AI game show host. His personality is a synthesis of:

**Uncle Bob (Robert Jake) DNA:**
- Bone dry wit, deadpan delivery
- Irish Goodbye professional — doesn't linger
- Always twitchy (leg shaking, looking for exit)
- 4:30 AM letter writer energy — drops profound observations, moves on
- One of 11 kids — nothing surprises him

**Famous Bob Influences:**
- Bob Barker — warmth, genuine care for contestants
- Bob Newhart — slow burn, understated comedy
- Alex Trebek — measured authority with wit
- Bob Eubanks — deadpan reactions to chaos

**BOB's Voice:**
- Never yells. Even in championship moments, he's measured.
- Says devastating things casually.
- Has strong opinions on food brackets.
- Understands chaos. "I've seen worse."

---

## Technical Architecture

**Stack (v2.6+):**
- Vite + React 18 (modern build tooling)
- Modular file structure (40+ files)
- React Context for state management
- Custom hooks for game logic
- Supabase for backend (feedback, analytics, shared brackets)
- Web Audio API for sound effects
- Canvas API for share image generation
- localStorage for persistence

**Commands:**
```bash
npm install      # Install dependencies
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build
npx netlify-cli deploy --prod  # Deploy to Netlify
```

**localStorage Keys:**
- `bob-vault-v2` — Champion history (includes matchupResults)
- `bob-custom-categories` — User-saved categories
- `bob-player-count` — Player count persistence
- `bob-sound-enabled` — Sound preference
- `bob-has-visited` — First-visit flag for About modal

---

## Features (v2.6 — Current)

✅ Bracket math engine (any entrant count 4+, auto play-ins/byes)
✅ Voting system (+1/-1, lock-in, tie-breaker flow)
✅ The Vault (champion history with vote tracking)
✅ Category Library (70+ presets, 8 themes including NYE 2026)
✅ Quick Start Mode (2-tap gameplay)
✅ Uncle BOB Personality (context-aware commentary)
✅ Share Champion (canvas image + copy text + dramatic moments)
✅ Sound Effects Toggle
✅ Custom Category Builder
✅ Year in Review Mode (4 brackets → 1 MVP)
✅ Vote Tracking & Bracket Recap
✅ Native Share Sheet (mobile)
✅ Ko-fi Tip Jar

---

## Features (Planned)

| Feature | Priority | Notes |
|---------|----------|-------|
| Banners & Banter Phase 2 | Future | Public feed + reactions |
| Voice integration | Stretch | ElevenLabs for BOB voice |
| Multi-language | Future | International audiences |
| Export/import categories | Future | Backup/share |
| Real-time multiplayer | v4 | If commercial |

---

## IP Status

**Trademark:** "Battle o' Brackets" — appears clear for registration. Use ™ now.
**Character:** "BoB" — no conflicts found.
**Protected:** Code, dialogue, visual design, character bible.
**NOT Protected:** Game mechanics (bracket voting is public domain).

---

## Development Guidelines

When working on Battle o' Brackets:

1. **Maintain BOB's personality** — dry, deadpan, measured. See `src/data/bob.js`
2. **Modular architecture** — components in `src/components/`, screens in `src/screens/`
3. **Use hooks for logic** — game flow in `src/hooks/`, shared state in `src/context/`
4. **Preserve localStorage keys** — don't break existing user data. See `src/lib/storage.js`
5. **All categories need full entrant lists** — 8-16 items. See `src/data/categories.js`
6. **Mobile-first design** — touch-friendly, responsive. Inline styles preferred.
7. **Sound effects are optional** — fail silently on audio errors. See `src/lib/sound.js`
8. **Run build before deploy** — `npm run build` must succeed

---

## Category Themes

| Theme | Color | Emoji |
|-------|-------|-------|
| Food & Drink | Orange | 🍕 |
| Music | Purple | 🎵 |
| Movies & TV | Red | 🎬 |
| Sports | Green | 🏀 |
| Games & Gaming | Blue | 🎮 |
| Random & Absurd | Pink | 🎲 |
| Holidays & Seasons | Gold | 🎄 |
| NYE 2026 | Gold | 🥂 |
| Olympics | White/Blue | 🏅 |
| Custom | Pink | 💾 |

---

## Key Decisions Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Vite + React modular architecture | Better maintainability, 40+ files | Dec 26, 2025 |
| React Context for state | Simpler than Redux, fits app size | Dec 26, 2025 |
| Custom hooks pattern | Encapsulate game logic (useBracket, useVault) | Dec 26, 2025 |
| Keep inline styles | Faster migration, no CSS-in-JS overhead | Dec 26, 2025 |
| Single-file PWA (original) | No build process, instant deployment | Dec 2025 |
| "Battle o' Brackets" name | BoB acronym, playful apostrophe | Dec 2025 |
| Uncle Bob personality base | Family connection, authentic character | Dec 2025 |
| localStorage over backend | Offline-first, no server costs | Dec 2025 |
| Canvas image generation | Native sharing, no external APIs | Dec 2025 |

---

## Quick Reference

**Start new bracket:** Home → Quick Start → Pick category → Play
**Custom bracket:** Home → Custom Bracket → Enter details → Play
**Year in Review:** Home → 🥂 YEAR IN REVIEW 2025 button
**View history:** Home → The Vault
**Share result:** Champion screen → Share button (native share on mobile)
**View bracket recap:** Champion screen → 📊 Bracket Recap
**Toggle sound:** Settings gear (⚙️) → Sound toggle
**Tip BOB:** Settings → Tip BOB a Coffee
