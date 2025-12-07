# Battle o' Brackets™

> *The party game where democracy gets dumb. Hosted by BOB.*

**Battle o' Brackets** is a tournament-style voting game for family gatherings, parties, and anywhere opinions clash. Vote head-to-head until a champion is crowned. Ties? Phone a friend. Chaos? That's the feature.

🏆 **Target Debut:** Christmas Eve 2025

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
- **100+ preset categories** across 8 themes:
  - 🍕 Food & Drink
  - 🎵 Music
  - 🎬 Movies & TV
  - 🏀 Sports
  - 🎮 Games & Gaming
  - 🎲 Random & Absurd
  - 🎄 Holidays & Seasons
  - 🏅 Olympics

### Meet BOB
BOB is your AI game show host. Dry wit. Deadpan delivery. Strong opinions on food brackets.

> *"A tie. A TIE. Someone has to make the call. Not me. I'm just the host."*

BOB provides context-aware commentary for every moment—category openers, matchup commentary, result reactions, championship crownings. He's inspired by Uncle Bob (family member), Bob Barker, Bob Newhart, and Alex Trebek.

### Additional Features
- **The Vault** — Champion history preserved in localStorage
- **Quick Start** — 2 taps to gameplay with preset categories
- **Custom Categories** — Create and save your own brackets
- **Share Results** — Download champion cards or copy shareable text
- **Sound Effects** — Optional audio feedback (toggle in settings)
- **PWA Support** — Install to home screen, works offline

---

## Quick Start

### Option 1: Open the HTML file
Just open `index.html` in any modern browser. That's it.

### Option 2: Serve locally
```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`

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
- **Single-file React PWA** — No build process required
- **CDN dependencies:** React 18, Babel standalone, canvas-confetti
- **localStorage** for persistence (no backend needed)
- **Web Audio API** for sound effects
- **Canvas API** for share image generation

### localStorage Keys
| Key | Purpose |
|-----|---------|
| `bob-vault-v2` | Champion history |
| `bob-custom-categories` | User-created categories |

### Browser Support
- Chrome/Edge (desktop & mobile)
- Safari (desktop & iOS)
- Firefox

---

## Project Structure

```
bob/
├── public/                 # Deployed to Netlify
│   ├── index.html          # The entire app (single-file PWA)
│   └── manifest.json       # PWA manifest for home screen install
├── docs/                   # Documentation (not deployed)
│   ├── BOB-CHARACTER-BIBLE.md
│   ├── CATEGORY-LIBRARY.md
│   ├── FEATURE-ROADMAP.md
│   ├── V2.5-SPRINT-PLAN.md
│   ├── OLYMPICS-DATA.md
│   ├── VOICE-STRATEGY.md
│   ├── BRACKET-VISUALIZATION-SPEC.md
│   ├── EXPANDED-DIALOGUE.md
│   ├── BANNERS-AND-BANTER-SOCIAL.md
│   ├── GAME-SHOW-HOST-RESEARCH.md
│   ├── MULTIMEDIA-STRATEGY.md
│   ├── PROJECT-README.md
│   ├── PROJECT-CUSTOM-INSTRUCTIONS.md
│   ├── CLAUDE-PROJECT-SETUP.md
│   └── bob-ip-analysis.md
├── README.md               # You are here
└── LICENSE                 # MIT License
```

**Netlify:** Set publish directory to `public/`

---

## Roadmap

### v2 (Current)
- ✅ Bracket engine with play-ins/byes
- ✅ Category library (100+ presets)
- ✅ BOB personality system
- ✅ Share champion cards
- ✅ Sound effects
- ✅ The Vault (history)
- ✅ Custom category builder

### v2.5 (Pre-Christmas Polish)
- 🔲 Expanded dialogue (50+ new BOB lines)
- 🔲 Voice integration (ElevenLabs)
- 🔲 Bracket tree visualization
- 🔲 Vote correction/undo

### v3 (Future)
- 🔲 Banners & Banter (social layer)
- 🔲 Multi-language support
- 🔲 Export/import categories

### v4 (If Commercial)
- 🔲 Real-time multiplayer
- 🔲 Corporate/team version
- 🔲 API integrations

---

## Development Guidelines

1. **Maintain BOB's personality** — Dry, deadpan, measured. Never oversells.
2. **Single-file architecture** — No build process, runs in browser.
3. **Preserve localStorage keys** — Don't break existing user data.
4. **Mobile-first design** — Touch-friendly, responsive.
5. **Sound effects optional** — Fail silently on audio errors.
6. **Categories need full lists** — 8-16 entrants minimum.

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
