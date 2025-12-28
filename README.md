# Battle o' Brackets™

> *The party game where democracy gets dumb. Hosted by BOB.*

**Battle o' Brackets** is a tournament-style voting game for family gatherings, parties, and anywhere opinions clash. Vote head-to-head until a champion is crowned. Ties? Phone a friend. Chaos? That's the feature.

🏆 **Live:** [bob.claudewill.io](https://bob.claudewill.io)

---

## What Is This?

A PWA (Progressive Web App) that runs bracket-style voting tournaments. Pick a category ("Best Pizza Topping"), add entrants, and let the room vote until one champion remains.

**Perfect for:**
- Thanksgiving/Christmas family debates
- Party games (ages 10–70)
- Settling "Best Of" arguments once and for all
- Creating family lore ("Remember when Pineapple beat Pepperoni?")

---

## Features

### Core Gameplay
- **Bracket engine** — Handles any number of entrants (4+) with automatic play-ins and byes
- **Voting system** — +1/-1 facilitator tallying with lock-in confirmation
- **Tie-breaker flow** — "Phone a Friend" mechanic when votes are tied
- **Champion celebration** — Confetti, fanfare, shareable results

### Category Library
- **100+ preset categories** across 10 themes:
  - 🍕 Food & Drink
  - 🎵 Music
  - 🎬 Movies & TV
  - 🏀 Sports
  - 🎮 Games & Gaming
  - 🎲 Random & Absurd
  - 🎄 Holidays & Seasons
  - 🥂 NYE 2025
  - 🏅 Olympics
  - 🗻 Mount Rushmore (GOAT debates — tracks 1st-4th place)

### Meet BOB
BOB is your AI game show host. Dry wit. Deadpan delivery. Strong opinions on food brackets.

> *"A tie. A TIE. Someone has to make the call. Not me. I'm just the host."*

BOB provides context-aware commentary for every moment—category openers, matchup commentary, result reactions, championship crownings. He's inspired by Uncle Bob (family member), Bob Barker, Bob Newhart, and Alex Trebek.

### Additional Features
- **The Vault** — Champion history carousel with edit/delete
- **Quick Start** — 2 taps to gameplay with preset categories
- **Custom Categories** — Create and save your own brackets
- **Share Results** — Download champion cards, copy text, or get shareable links
- **Shareable Links** — Public bracket view at `bob.claudewill.io/b/[id]`
- **Sound Effects** — Optional audio feedback (toggle in settings)
- **Keyboard Navigation** — Arrow keys for voting, Enter to lock in
- **In-App Feedback** — Send feedback directly from settings (Supabase backend)
- **PWA Support** — Install to home screen, works offline

---

## Quick Start

### Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Then visit `http://localhost:5173`

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify
npx netlify-cli deploy --prod
```

---

## How to Play

1. **Choose a category** — Pick from the library or create your own
2. **Set voter count** — How many people are voting?
3. **Add entrants** — 4+ entrants required (presets have 8-16)
4. **Vote** — Each matchup: tally votes, lock in result
5. **Handle ties** — Call someone not in the room. Their vote breaks the tie.
6. **Crown a champion** — Celebrate, share, add to The Vault

---

## Technical Details

### Stack
- **Vite 7 + React 19** — Modern build tooling with hot module replacement
- **Modular architecture** — 40+ files across components, screens, hooks, and context
- **Supabase** — Backend for feedback, analytics, and shared brackets
- **Web Audio API** — Sound effects
- **Canvas API** — Share image generation
- **localStorage** — Game persistence

### Key Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@supabase/supabase-js": "^2.49.4",
  "vite": "^7.3.0"
}
```

### Security Notes
The Supabase **anon key** in `src/lib/supabase.js` is intentionally public. This is by design—anon keys are meant for client-side use and security is enforced via Row Level Security (RLS) policies in the database. The **service_role key** (which bypasses RLS) is never exposed in the codebase.

### localStorage Keys
| Key | Purpose |
|-----|---------|
| `bob-vault-v2` | Champion history |
| `bob-custom-categories` | User-created categories |
| `bob-player-count` | Default voter count |
| `bob-sound-enabled` | Sound preference |
| `bob-has-visited` | First-visit tracking |

### Browser Support
- Chrome/Edge (desktop & mobile)
- Safari (desktop & iOS)
- Firefox

---

## Project Structure

```
bob/
├── src/
│   ├── main.jsx              # React DOM entry point
│   ├── App.jsx               # Main app router + state
│   │
│   ├── components/
│   │   ├── ui/               # Atomic components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── EntrantChip.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   └── ThemePill.jsx
│   │   ├── BobSays.jsx       # BOB commentary bubble
│   │   ├── MatchupCard.jsx   # Voting interface
│   │   ├── ShareCard.jsx     # Share modal
│   │   └── ...
│   │
│   ├── screens/
│   │   ├── HomeScreen.jsx
│   │   ├── SetupScreen.jsx
│   │   ├── PlayingScreen.jsx
│   │   ├── ChampionScreen.jsx
│   │   ├── VaultScreen.jsx
│   │   ├── CategoryLibrary.jsx
│   │   └── Shared*View.jsx   # Public share views
│   │
│   ├── modals/               # Modal dialogs
│   ├── hooks/                # Custom React hooks
│   ├── context/              # React Context providers
│   ├── lib/                  # Utilities (bracket, sound, storage)
│   ├── data/                 # Constants (categories, BOB, seedVault)
│   └── styles/               # CSS files
│
├── dist/                     # Production build output
├── public-legacy/            # Original single-file version
├── docs/                     # Documentation
├── index.html                # Vite entry point
├── vite.config.js            # Vite configuration
├── netlify.toml              # Netlify deployment config
└── package.json
```

**Netlify:** Builds to `dist/` directory automatically

---

## Roadmap

### v2 (Shipped Dec 4, 2025)
- ✅ Bracket engine with play-ins/byes
- ✅ Category library (100+ presets)
- ✅ BOB personality system
- ✅ Share champion cards
- ✅ Sound effects
- ✅ The Vault (history)
- ✅ Custom category builder

### v2.5 (Pre-Christmas Polish — Dec 20, 2025)
- ✅ Expanded dialogue (bobAdvice, deadpan, impatience wired up)
- ✅ Battle animations (VS clash, winner/loser effects, vote pop)
- ✅ New sounds (advance, roundComplete, dramatic)
- ✅ UI polish (button hover, pulsing Lock In, keyboard nav)
- ✅ Vote correction/undo (5-second window)
- ✅ Compact bracket visualization (March Madness naming)
- ✅ Mobile UX improvements (sticky footer, first-time hints)
- ✅ BOB comments in The Vault
- ✅ Pre-populated Vault with family winners
- ✅ In-app feedback system (Supabase backend + admin view)
- ✅ Shareable bracket links (`/b/[id]` public view)
- ✅ Dev mode for testing (`?dev=true`)
- ✅ Supabase analytics (games + custom categories)

### v2.6 (Architecture Overhaul — Dec 26, 2025)
- ✅ Vite + React build system (replaced single-file architecture)
- ✅ Modular file structure (40+ files)
- ✅ React Context for state management
- ✅ Custom hooks (useBracket, useVault, useSound, useBob)
- ✅ Component extraction (screens, modals, UI atoms)
- ✅ Year in Review mode (4 brackets → 1 MVP)
- ✅ NYE special effects (gold confetti + champion lines)
- ✅ Vote margin tracking throughout bracket

### v2.7 (NYE 2025 Release — Dec 27, 2025)
- ✅ Mount Rushmore mode — GOAT debates where Final Four = your Mount Rushmore (1st-4th place)
- ✅ 12 Mount Rushmore categories (athletes, directors, musicians, etc.)
- ✅ OG meta tags for social sharing (static + dynamic via Edge Functions)
- ✅ Dynamic OG tags for shared brackets (`/b/[id]`) and vaults (`/v/[id]`)
- ✅ NYE 2025 category theme
- ✅ Mobile touch fixes (CategoryCard now uses button element)
- ✅ Critical bug fix: Context API function name mismatch

### v2.8 (Post-Vite Stabilization — Dec 28, 2025)
- ✅ iOS Safari safe-area padding for fixed footers
- ✅ Compact setup view for library picks (no scroll required)
- ✅ Fixed category selection bug (`BOB.reaction` undefined)
- ✅ Added defensive checks to `BOB.random()`
- ✅ Mount Rushmore theme color → bronze (#CD7F32)
- ✅ NYE theme color → champagne (#E8D4B8)
- ✅ Removed debug code from production

### v3 (Post-Launch 2026)
- ✅ Banners & Banter Phase 1 — Shareable links (Complete)
- 🔲 Banners & Banter Phase 2 — Public feed + reactions
- 🔲 Banners & Banter Phase 3 — Community features
- 🔲 Voice integration (ElevenLabs) — stretch goal
- 🔲 Multi-language support

### v4 (If Commercial)
- 🔲 Real-time multiplayer
- 🔲 Corporate/team version
- 🔲 API integrations

---

## Development Guidelines

1. **Maintain BOB's personality** — Dry, deadpan, measured. Never oversells. See `src/data/bob.js`
2. **Modular architecture** — Components in `src/components/`, screens in `src/screens/`
3. **Use hooks for logic** — Game logic in `src/hooks/`, shared state in `src/context/`
4. **Preserve localStorage keys** — Don't break existing user data. See `src/lib/storage.js`
5. **Mobile-first design** — Touch-friendly, responsive. Inline styles preferred.
6. **Sound effects optional** — Fail silently on audio errors. See `src/lib/sound.js`
7. **Categories need full lists** — 8-16 entrants minimum. See `src/data/categories.js`
8. **Run build before deploy** — `npm run build` must succeed

---

## IP Status

- **Trademark:** "Battle o' Brackets" — Appears clear for registration
- **Character:** "BOB" — No conflicts found
- **Protected:** Code, dialogue, visual design, character bible
- **NOT Protected:** Game mechanics (bracket voting is public domain)

---

## Credits

Created by Derek Simmons

BOB's personality inspired by:
- Uncle Bob (Robert Jake) — The foundational DNA
- Bob Barker — Warmth and care
- Bob Newhart — Slow burn comedy
- Alex Trebek — Measured authority
- Bob Eubanks — Deadpan chaos tolerance

---

## License

MIT License — See [LICENSE](LICENSE)

---

<p align="center">
  <strong>🏆 BATTLE O' BRACKETS™ 🏆</strong><br>
  <em>Hosted by BOB</em>
</p>
