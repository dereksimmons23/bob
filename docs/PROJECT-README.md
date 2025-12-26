# Battle o Brackets — Claude Project

## Overview

**Battle o Brackets (BoB)** is a party game PWA for running tournament-style voting brackets at family gatherings. Players vote on head-to-head matchups until a champion is crowned.

**Target Debut:** Christmas Eve 2025

**Local Files:** `/Users/dereksimmons/Desktop/bob/`

---

## Project Files

| File | Purpose |
|------|---------|  
| `index.html` | Production build (single-file React PWA with Olympics) |
| `manifest.json` | PWA manifest for home screen install |
| `BOB-CHARACTER-BIBLE.md` | Full personality guide and dialogue system |
| `STYLE-GUIDE.md` | Visual identity: fonts, colors, voice (v1 — revisit for v2) |
| `CATEGORY-LIBRARY.md` | All 60+ preset categories with entrants |
| `FEATURE-ROADMAP.md` | What's built, what's planned |
| `BANNERS-AND-BANTER-SOCIAL.md` | Future social feature concept |
| `GAME-SHOW-HOST-RESEARCH.md` | Research on legendary hosts that informed BOB |
| `bob-ip-analysis.md` | Trademark/copyright research |
| `archive/` | Previous versions (v1, early v2 builds) |

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

**Stack:**
- Single-file React PWA (no build process)
- CDN dependencies: React 18, Babel standalone, canvas-confetti
- localStorage for persistence
- Web Audio API for sound effects
- Canvas API for share image generation

**localStorage Keys:**
- `bob-vault-v2` — Champion history (now includes matchupResults)
- `bob-custom-categories` — User-saved categories
- `bob-player-count` — Player count persistence
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
| Bracket visualization (tree view) | High | Tournament feel |
| Vote correction / undo | Medium | QoL improvement |
| Banners & Banter social | Future | View others' brackets |
| Olympics categories | High | Winter, Summer, Combined |
| Snub list | Low | Notable omissions |
| Multi-language | Future | International audiences |
| Export/import categories | Future | Backup/share |

---

## IP Status

**Trademark:** "Battle o' Brackets" — appears clear for registration. Use ™ now.
**Character:** "BoB" — no conflicts found.
**Protected:** Code, dialogue, visual design, character bible.
**NOT Protected:** Game mechanics (bracket voting is public domain).

---

## Development Guidelines

When working on Battle o' Brackets:

1. **Maintain BOB's personality** — dry, deadpan, measured. Never oversells.
2. **Keep single-file architecture** — no build process, runs in browser.
3. **Preserve localStorage keys** — don't break existing user data.
4. **All categories need full entrant lists** — 8-16 items minimum.
5. **Mobile-first design** — touch-friendly, responsive.
6. **Sound effects are optional** — fail silently on audio errors.

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
| Single-file PWA | No build process, instant deployment | Dec 2025 |
| "Battle o' Brackets" name | BoB acronym, playful apostrophe | Dec 2025 |
| Uncle Bob personality base | Family connection, authentic character | Dec 2025 |
| localStorage over backend | Offline-first, no server costs | Dec 2025 |
| "Banners & Banter" for history | Captures championships + trash talk | Dec 2025 |
| Canvas image generation | Native sharing, no external APIs | Dec 2025 |
| Style guide v1 | Document fonts/colors, flag ]-[ logo for v2 | Dec 2025 |

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
