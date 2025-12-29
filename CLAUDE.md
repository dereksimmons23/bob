# CLAUDE.md — Technical Handoff for BOB

> Last updated: December 28, 2025 (end of session)
> Current version: v2.8
> Next session: December 29, 2025 — NYE polish

## Current State

**What works:**
- Full bracket gameplay (library categories, custom brackets)
- Category library with 100+ presets across 10 themes
- Mount Rushmore mode (GOAT debates, tracks 1st-4th)
- The Vault (champion history with edit/delete)
- Share links (`/b/[id]` for brackets, `/v/[id]` for vaults)
- Sound effects (optional, toggle in settings)
- iOS Safari safe-area handling
- Supabase analytics + feedback system

**What's experimental (hidden for NYE):**
- `QuickPlayScreen` — Single-screen mode prototype (Dec 28, 2025)
  - Works but clunky — needs UX iteration
  - Hidden from UI, code preserved for v3
  - Goal: Open → Tap → Play (no setup required)

**What's broken:**
- Nothing critical as of v2.8

---

## Architecture

### Stack
- **Vite 7.3.0** — Build tooling, dev server
- **React 19.0.0** — UI framework
- **Supabase** — Backend (feedback, analytics, shared brackets)
- **Vercel** — Hosting (bob.claudewill.io)

### Why These Choices
- **Vite over CRA**: Faster builds, better DX, smaller bundles
- **React 19**: Latest stable, no issues encountered
- **Inline styles**: Faster iteration, no CSS file management, co-located with components
- **No state library**: React Context + useState is sufficient for this app size

### File Structure
```
src/
├── main.jsx              # Entry point
├── App.jsx               # Main router + game state (~500 lines, could split)
├── components/
│   ├── ui/               # Atomic components (Button, Input, Logo, etc.)
│   ├── BobSays.jsx       # BOB commentary bubble
│   ├── MatchupCard.jsx   # Voting interface
│   └── ShareCard.jsx     # Share modal with canvas generation
├── screens/
│   ├── HomeScreen.jsx    # Landing page
│   ├── CategoryLibrary.jsx # Category picker
│   ├── SetupScreen.jsx   # Bracket configuration (compact + full modes)
│   ├── PlayingScreen.jsx # Active gameplay
│   ├── ChampionScreen.jsx # Winner celebration
│   ├── VaultScreen.jsx   # History carousel
│   ├── QuickPlayScreen.jsx # NEW: Single-screen prototype
│   └── Shared*View.jsx   # Public share pages
├── modals/               # Settings, feedback, about, legal
├── hooks/                # useBracket, useVault, useSound (some unused)
├── context/              # AppContext (partially used)
├── lib/
│   ├── bracket.js        # Bracket generation + advancement logic
│   ├── sound.js          # Web Audio API wrapper
│   ├── storage.js        # localStorage helpers
│   └── supabase.js       # Supabase client (anon key is intentionally public)
├── data/
│   ├── categories.js     # CATEGORY_LIBRARY — all preset categories
│   ├── bob.js            # BOB personality — all dialogue
│   └── seedVault.js      # Pre-populated vault entries
└── styles/
    └── index.css         # CSS variables, base styles
```

---

## Key Files to Know

| File | What It Does | Gotchas |
|------|--------------|---------|
| `App.jsx` | Main game state, screen routing | Big file (~500 lines), could use refactoring |
| `data/bob.js` | All BOB dialogue | `BOB.reaction` doesn't exist — use `BOB.welcome`, `BOB.normal`, `BOB.champion`, etc. |
| `data/categories.js` | Category library | Each category needs `name` and `entrants` array |
| `components/ui/Logo.jsx` | Logo component | Only supports `large`, `medium`, `small` — NOT `tiny` |
| `screens/SetupScreen.jsx` | Bracket setup | Has two modes: compact (library picks) and full (custom) |
| `lib/bracket.js` | Bracket math | Handles play-ins, byes, any entrant count |

---

## Known Gotchas

### BOB Dialogue
```javascript
// WRONG — BOB.reaction doesn't exist
BOB.random(BOB.reaction)

// RIGHT — use valid properties
BOB.random(BOB.welcome)  // Opening lines
BOB.random(BOB.normal)   // Generic reactions
BOB.random(BOB.champion) // Winner announcements
BOB.random(BOB.blowout)  // Landslide victories
BOB.random(BOB.close)    // Tight matches
BOB.random(BOB.tie)      // Tie situations
```

### Component Props
```javascript
// Logo sizes: 'large' | 'medium' | 'small' — no 'tiny'
<Logo size="small" />

// Button sizes: 'small' | 'medium' | 'large' | 'huge'
<Button size="huge" variant="primary" />
```

### iOS Safari
- Always use `viewport-fit=cover` in index.html
- Fixed footers need: `padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px))`

### State Initialization
```javascript
// WRONG — picks two different random categories
const [category, setCategory] = useState(() => pickRandom())
const [bracket, setBracket] = useState(() => createBracket(pickRandom().entrants))

// RIGHT — use useEffect for coordinated initialization
const [category, setCategory] = useState(null)
const [bracket, setBracket] = useState([])

useEffect(() => {
  const picked = pickRandom()
  setCategory(picked)
  setBracket(createBracket(picked.entrants))
}, [])
```

---

## State Management

### Where State Lives

| Data | Location | Why |
|------|----------|-----|
| Current game state | `App.jsx` useState | Needs to be lifted for screen transitions |
| Vault history | localStorage (`bob-vault-v2`) | Persists across sessions |
| Custom categories | localStorage (`bob-custom-categories`) | User-created content |
| Sound preference | localStorage (`bob-sound-enabled`) | User preference |
| Player count | localStorage (`bob-player-count`) | Remembers last used |

### Context API
`AppContext` exists but is underutilized. Most state is still in `App.jsx`. Could refactor to move game state into context, but works fine as-is.

---

## Supabase Tables

| Table | Purpose |
|-------|---------|
| `games` | Analytics — completed games |
| `feedback` | User feedback from in-app form |
| `shared_brackets` | Public bracket shares |
| `shared_vaults` | Public vault shares |

All tables use Row Level Security. The anon key in code is intentional and safe.

---

## Recent Changes (v2.6 → v2.8)

### v2.6 (Dec 26, 2025) — Architecture Overhaul
- Migrated from single HTML file to Vite + React
- 40+ modular files
- Added Year in Review mode

### v2.7 (Dec 27, 2025) — NYE Release
- Mount Rushmore mode
- OG meta tags for social sharing
- NYE 2025 category theme

### v2.8 (Dec 28, 2025) — Stabilization + Exploration
- Fixed iOS Safari safe-area issues
- Fixed `BOB.reaction` bug (was undefined)
- Added compact SetupScreen for library picks
- Changed Mount Rushmore color → bronze
- Changed NYE color → champagne
- Created QuickPlayScreen prototype (hidden for NYE, needs iteration)
- Added CLAUDE.md technical handoff document
- Documented v4 vision: voice-first BOB as interface
- Archived 5 inactive GitHub repos

---

## Active Experiments

### QuickPlayScreen (Dec 28, 2025)
**Goal:** Ridiculously easy gameplay for ages 10-80

**Current state:** Works but clunky

**What it does:**
- Opens with random category immediately
- Tap to vote (no +/- tallying)
- Single voter assumed
- Bracket progress at bottom
- Champion → Save or Play Again

**What needs work:**
- UX is clunky (user feedback)
- Tap targets may need sizing
- Transitions feel abrupt
- Bracket progress visualization unclear?

**Files:**
- `src/screens/QuickPlayScreen.jsx`
- `src/screens/HomeScreen.jsx` (added PLAY button)

---

## Next Session Ideas

1. **Polish QuickPlayScreen** — Get feedback on what's clunky, iterate
2. **Single-screen refinement** — Maybe bracket should be more prominent?
3. **App.jsx refactor** — It's 500+ lines, could split by concern
4. **Sound in QuickPlay** — Currently silent
5. **Supabase for QuickPlay** — Track these games too

---

## Commands

```bash
# Development
npm run dev         # Start dev server (localhost:5173)
npm run build       # Production build
npm run preview     # Preview production build

# Deployment
git push            # Auto-deploys to Vercel
```

---

## URLs

- **Production:** https://bob.claudewill.io
- **GitHub:** https://github.com/dereksimmons23/bob
- **Supabase:** (check Supabase dashboard)

---

## Vision: BOB v4 — Voice-First AI Host

> Captured: December 28, 2025

**The insight:** BOB shouldn't be decoration on a traditional UI. BOB should BE the interface.

**Current state (v2.x):**
- Text comments on the side
- User navigates with buttons and taps
- BOB is flavor, not function

**North star (v4):**
```
You: "Hey BOB, pizza bracket"
BOB: "Pizza. Classic. I've got 16 toppings loaded. Want the usual or mix it up?"
You: "Mix it up"
BOB: "Adding anchovies. Don't blame me. First up: Pepperoni versus Mushrooms."
You: "Pepperoni"
BOB: "Pepperoni advances. Shocking absolutely no one. Next..."
[...]
BOB: "That was decisive. You should post this to Banners & Banter —
      the pineapple upset alone is worth documenting."
You: "Do it"
BOB: "Done. Shared with the caption 'Pineapple truthers unite.'"
```

**What this requires:**
- Voice synthesis (ElevenLabs — already explored)
- Voice recognition (Web Speech API or Whisper)
- AI orchestration (BOB understands intent, not keywords)
- Proactive helpfulness (BOB notices, suggests, acts)
- Memory (BOB remembers past games, preferences, group dynamics)

**BOB as:**
- Tour guide (helps you play)
- Emcee (builds moments, knows when to be quiet)
- Memory keeper (callbacks to past games)
- Provocateur (stirs conversation)
- Assistant (handles sharing, saving, setup)

**The shift:** The game doesn't have buttons AND BOB. The game IS BOB.

---

## Next Session: December 29, 2025

**Focus:** NYE polish — ship solid, not half-baked

**Priority tasks:**
- Test full game flow on mobile end-to-end
- Consider featuring NYE categories more prominently
- Any visual polish needed?
- Confirm everything works for party use case

**Parked for v3:**
- QuickPlayScreen iteration (hidden for now)
- Voice-first BOB vision
- Banners & Banter Phase 2

**Success criteria for NYE:**
When someone plays BOB at a party, it works smoothly and they have fun.
