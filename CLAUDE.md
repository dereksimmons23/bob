# CLAUDE.md — Technical Handoff for BOB

> Last updated: January 1, 2026
> Current version: v2.9.2 — NYE Edition (deployed)
> Next milestone: v3.0 — Party Mode (March 1, 2026 for March Madness)
> Project status: PAUSED until mid-February 2026

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
- "See all NYE categories" button scrolls to grid
- 3-2-1 countdown before vote reveal

**What's experimental (hidden for NYE):**
- `QuickPlayScreen` — Single-screen mode prototype (Dec 28, 2025)
  - Works but clunky — needs UX iteration
  - Hidden from UI, code preserved for v3
  - Goal: Open → Tap → Play (no setup required)
- `BrandShowcase` — Logo exploration tool (Dec 30, 2025)
  - Access via `?dev=true` → Settings → Dev Tools → Brand Showcase
  - Font toggle with 10 typefaces
  - Backwards B experiments for future branding

**What's broken:**
- Vault individual share button — Supabase insert failing (see known bugs below)
- "defeated 0" bug — runner-up sometimes shows as "0" on champion screen (needs investigation)

**Known cosmetic issues:**
- `public/og-image.png` has gray box behind "BRACKETS" text — needs manual fix in image editor
- Social share previews show static og-image, not dynamic champion card (expected; would need server-side generation)

---

## Christmas Eve 2025 Learnings

> "We played better games tho." — The most valuable feedback

**What happened:** BOB v2.8 shipped successfully. Technically flawless. But the family played Hitster and Herd Mentality more.

**Why those games won:**
- **Instant engagement** — No setup, just play
- **Simultaneous participation** — Everyone engaged every round
- **Memory triggers** — Nostalgia, not abstract preferences
- **Fast loops** — 30-60 seconds per round
- **Social tension** — "Am I thinking what everyone's thinking?"

**What BOB lacked:**
- Too much setup friction
- Sequential voting (one person at a time)
- Facilitator role removes them from play
- Abstract preferences vs visceral memories
- Delayed payoff (15+ matchups before champion)

**The insight:** BOB works great solo but needs a Party Mode for groups. See `docs/V3-PARTY-MODE-SPEC.md` for full design.

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
│   ├── QuickPlayScreen.jsx # Single-screen prototype (hidden)
│   ├── BrandShowcase.jsx # Logo exploration dev tool
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

### Vote Result Handler Signature
```javascript
// App.jsx handleVoteResult expects this exact signature:
// (winner, votesA, votesB, margin, wasTieBreaker, loser)
//
// MatchupCard.jsx calls it like:
onVote(winner, votesA, votesB, margin, false, loser)
//
// If you change one, update the other!
```

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

## v3.0 Roadmap: Party Mode

> Full spec: `docs/V3-PARTY-MODE-SPEC.md`

**The vision:** Turn BOB from a bracket tool into a party game that competes with Hitster and Herd Mentality.

**New mechanics (v3):**
| Mechanic | What It Does |
|----------|--------------|
| **Halftime Speech** | 30-second advocacy speech before voting |
| **Challenge** | Secret power to reverse results (Round 1 only) |
| **Block** | Counter someone's Challenge |
| **3-2-1 Reveal** | Simultaneous voting with countdown |
| **Blowout Immunity** | 3+ margin = no Challenge allowed |
| **Upset Windows** | Underdog wins get longer Challenge time |

**The philosophy:** "The bracket isn't the game. The bracket is the STAGE for the game."

**Implementation priority:**
1. 3-2-1 countdown + simultaneous voting
2. Halftime Speech timer
3. Challenge system (secret distribution)
4. Block system
5. Blowout immunity + upset windows

---

## Parked Ideas (Post-v3)

1. **QuickPlayScreen iteration** — Hidden for now, needs UX work
2. **App.jsx refactor** — 500+ lines, could split by concern
3. **Multi-device voting** — Everyone on their own phone
4. **Voice-first BOB** — See v4 vision below

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

## Next Session: Mid-February 2026

**Target:** v3.0 Party Mode for March Madness (ship by March 1, 2026)

**See:** `docs/MARCH-MADNESS-RELEASE.md` for full plan and effort estimates

### Priority bugs to fix (before Party Mode work):
- [ ] "defeated 0" bug — runner-up shows as "0" on champion screen
- [ ] Vault individual share — Supabase insert failing
- [ ] og-image.png gray box (manual image edit)

### Mobile UX issues (from Dec 30 review):
- [ ] Settings panel: consolidate to 4 buttons
- [x] Voter count selector: stepper UI — **DONE Dec 31**
- [ ] Matchup box alignment
- [ ] Double crown icons on winner
- [ ] "2 of 8 advancing" text visibility
- [ ] Category picker overwhelming
- [ ] Too much scrolling

### v3.0 Party Mode features:
- [ ] Halftime Speech (30-sec timer)
- [ ] Challenge system (secret distribution, Round 1 only)
- [ ] Block system
- [ ] Blowout immunity (3+ margin = no challenge)
- [ ] Upset windows (extended challenge time)
- [ ] Party Mode toggle in settings
- [ ] March Madness category theme

### Deferred to v3.5+:
- Multi-device voting (invite links, real-time sync)
- QuickPlayScreen iteration
- Dynamic share preview images
- Bob personalities
- Voice-first BOB (v4)

### Analytics
Device tracking added Jan 1, 2026:
- All tables now have `device_id` column
- Derek's devices in `test_devices` table
- Query real users: `WHERE device_id NOT IN (SELECT device_id FROM test_devices)`

### Substack
`docs/SUBSTACK-DRAFT.md` — rewritten as Claude's perspective, ready for Derek's intro

---

## Changelog

### v2.9.3 (Jan 1, 2026) — Analytics
- Added device_id tracking to all Supabase tables (games, feedback, shared_brackets, shared_vaults)
- Created test_devices table to filter out Derek's testing from real user data
- Backfilled existing records with 'derek-testing-backfill' marker
- Updated Substack draft to Claude's perspective

### v2.9.2 (Dec 31, 2025) — NYE Quick Fixes
- Voter selector now uses stepper UI (−/+) instead of button grid
- Added v3 backlog: vault og-image edge middleware, banner-shaped vault cards, bracket recap visualization, custom bracket discovery
- Documented: solo play (0-1) margin display is correct behavior, not a bug

### v2.9.1 (Dec 30, 2025) — NYE Polish
- Fixed "See all NYE categories" button (now scrolls to category grid)
- Fixed About modal ]-[ logo font (non-italic for better bracket readability)
- Updated Legal modal date to December 2025
- Added Brand Showcase dev tool (font exploration, backwards B experiments)
- Improved Vault share error logging
- Mobile testing video review — catalogued 20 issues for January
- Updated Substack draft with Christmas learnings + Party Mode vision

### v2.9 (Dec 29, 2025) — NYE Edition
- NYE theme now default in Category Library
- NYE Party Pack banner with featured categories
- 3-2-1 countdown animation before vote reveal (party mode energy)
- Bigger +1 vote buttons for mobile/party play
- Hidden broken BracketPathView (fix in v3)
- Version workflow: centralized in `src/lib/constants.js`
- AboutModal now shows dynamic version
- Fixed "defeated 1" share text bug (parameter mismatch in App.jsx)
- Created `docs/V3-PARTY-MODE-SPEC.md` with full party mode design
- Updated CLAUDE.md with Christmas learnings

### v2.8 (Dec 28, 2025) — Stabilization
- Fixed iOS Safari safe-area issues
- Added compact SetupScreen for library picks
- Created QuickPlayScreen prototype (hidden)
- Added CLAUDE.md documentation
- Documented v4 vision

### v2.7 (Dec 27, 2025) — NYE Release
- Mount Rushmore mode
- OG meta tags for social sharing
- NYE 2025 category theme

### v2.6 (Dec 26, 2025) — Architecture Overhaul
- Migrated from single HTML to Vite + React
- 40+ modular files
- Added Year in Review mode
