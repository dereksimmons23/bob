# Battle O' Brackets — Style Guide

> **Status:** v1 Draft (December 2025)
> **Next Review:** v2 release — revisit logo treatment, refine color system

---

## Typography

### Fonts

| Role | Font | Source | Usage |
|------|------|--------|-------|
| Display | **Bangers** | Google Fonts | Titles, headings, buttons, "Battle O' Brackets" |
| Body | **Outfit** | Google Fonts | All other text (weights 300-700) |

### CSS Variables
```css
--font-display: 'Bangers', cursive;
--font-body: 'Outfit', sans-serif;
```

### Logo Mark: ]-[

**Current:** Uses Bangers (same as display text)
**v2 TODO:** The `]-[` mark should have its own distinct treatment — consider a geometric/monospace font or custom letterform to feel like a true logo symbol rather than just styled text.

---

## Colors

### Core Palette

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Deep Background | `#0a0e1a` | `--bg-deep` | Page background |
| Card Background | `#141a2e` | `--bg-card` | Cards, panels |
| Card Hover | `#1c2440` | `--bg-card-hover` | Interactive states |

### Accent Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Gold | `#ffd700` | `--accent-gold` | Primary brand, CTAs, champions |
| Red | `#ff3b5c` | `--accent-red` | Danger, eliminations, errors |
| Green | `#00e676` | `--accent-green` | Success, completed states |
| Blue | `#00b4ff` | `--accent-blue` | Info, Games & Gaming theme |
| Purple | `#b388ff` | `--accent-purple` | Music theme, secondary actions |
| Orange | `#ff9100` | `--accent-orange` | Food & Drink theme |
| Pink | `#ff4081` | `--accent-pink` | Random/Absurd theme, custom |

### Text Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#ffffff` | `--text-primary` | Main content |
| Secondary | `#8892b0` | `--text-secondary` | Supporting text |
| Muted | `#4a5578` | `--text-muted` | Disabled, hints |

---

## Category Themes

Each category has a signature color:

| Theme | Color Variable | Emoji |
|-------|---------------|-------|
| Food & Drink | `--accent-orange` | 🍕 |
| Music | `--accent-purple` | 🎵 |
| Movies & TV | `--accent-red` | 🎬 |
| Sports | `--accent-green` | 🏀 |
| Games & Gaming | `--accent-blue` | 🎮 |
| Random & Absurd | `--accent-pink` | 🎲 |
| Holidays & Seasons | `--accent-gold` | 🎄 |
| Olympics | White/Blue | 🏅 |
| Custom | `--accent-pink` | 💾 |

---

## Voice & Tone

### BOB's Personality
- **Deadpan delivery** — never yells, even in dramatic moments
- **Dry wit** — says devastating things casually
- **Measured authority** — knows what he's doing
- **Irish Goodbye energy** — doesn't linger on moments
- Strong opinions on food brackets

### Copy Guidelines
- Playful but not childish
- Sports commentator energy
- Self-aware AI humor (knows he's an AI, doesn't dwell on it)
- Short sentences. Punchy.

### Examples
- ✅ "A bold choice. Noted."
- ✅ "I've seen worse."
- ✅ "The people have spoken. Some of them were wrong."
- ❌ "OMG AMAZING CHOICE!!!"
- ❌ "Wow, what an incredible moment for everyone!"

---

## Component Patterns

### Buttons
- Primary: Gold gradient background, dark text
- Secondary: Transparent with border
- Ghost: Subtle background, muted border
- All use `--font-display` (Bangers)

### Cards
- Background: `--bg-card`
- Border radius: 12-16px
- Subtle borders using `--text-muted` or theme colors

### Animations
- Subtle glow effects using theme colors
- Confetti on championship moments
- Float animations for emphasis

---

## Asset Checklist

| Asset | Status | Notes |
|-------|--------|-------|
| Logo mark (]-[) | Needs work | Use distinct font in v2 |
| App icon | Done | bracket.png |
| Social share template | Done | Canvas-generated |
| Favicon | Done | Uses PWA manifest |

---

## Changelog

- **v1 (Dec 2025):** Initial style guide created for launch
- **v2 (TBD):** Revisit logo mark typography, expand component docs
