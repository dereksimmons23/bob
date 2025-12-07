---
Created: December 5, 2025
Version: v1
Project: Battle o Brackets
Context: Media integration planning
Status: Draft
Confidentiality: Internal
Related: FEATURE-ROADMAP.md, CATEGORY-LIBRARY.md
Target Location: /Users/dereksimmons/Desktop/BoB/
Format Rationale: Strategic framework for multimedia decisions across categories
---

# Multimedia Strategy

## Philosophy

Battle o' Brackets works because it's **social and intentional**. Friction (Googling team logos, curating playlists) is often a *feature*, not a bug — it sparks conversation and engagement.

Media integration should enhance without overwhelming. Ask: **Does this entrant *need* visual/audio, or is the text enough?**

---

## Category Framework

### Tier 1: Licensing-Safe, High-Impact
**Include embedded media — low friction, high value**

| Category | Media Type | Source | Approach | Status |
|----------|-----------|--------|----------|--------|
| **MLB Teams** | Team logos | Public domain | Icon beside name | v2.5 |
| **NBA Teams** | Team logos | Public domain | Icon beside name | v2.5 |
| **NFL Teams** | Team logos | Public domain | Icon beside name | v2.5 |
| **Soccer Teams** | Team crests | Public domain | Icon beside name | v2.5 |
| **Country Flags** | Flag emojis/SVG | Unicode/public | Emoji or SVG flag | v2.5 |

**Implementation:** Small icons (32x32px) left of entrant name. No additional load time.

---

### Tier 2: User-External, Intentionally Resourced
**Keep external — part of the game experience**

| Category | Media Type | Why External | User Resource |
|----------|-----------|---|---|
| **Best Bands** | Song samples | Licensing (Spotify/Apple) | User creates playlist, plays via Bluetooth |
| **Best Movies** | Trailers/clips | Studio licensing | Users look up on IMDb/YouTube |
| **Best TV Shows** | Episode clips | Platform licensing | Users stream clips separately |

**Why this works:** Shared audio/video creates *parallel* entertainment. Bluetooth brings the experience to life without overloading the PWA.

---

### Tier 3: Problematic — Skip
**Don't embed — too complex, low ROI**

| Category | Problem | Future |
|----------|---------|--------|
| **Best Paintings** | Copyright + attribution | Potential API (v3+) |
| **Best Memes** | Licensing nightmare | Not a good fit |
| **Product Logos** | Trademark complexity | Use emojis instead |

---

## Specific v2.5 Recommendations

### Sports Logos (MLB, NBA, NFL)
**Ready now.** Use official team colors + 32x32px icons. Zero licensing issues. Instant recognition.

### Olympic Events
**Ready now.** Sport-specific emojis (🏃, 🏊, ⛷️). No licensing. Canonical.

### Country Flags
**Ready now.** Unicode emoji flags (🇺🇸, 🇬🇧). Native browser support.

### Food & Drink
**Emoji-safe.** Use 🍕, 🍔, 🍜. Skip food photos (too much variation).

### Best Bands / Musicians
**Keep playlist-external.** Spotify list played on Bluetooth during game. This IS the feature.

---

## Decision Tree

For any new category:

1. **Does it have canonical visual?** (Teams, countries, sports)
   → YES: Include emoji or icon
   → NO: Next

2. **Is visual essential to voting?**
   → YES: Find a way (emoji/icon or user-resource)
   → NO: Next

3. **Can user easily resource it externally?** (Spotify, YouTube)
   → YES: Provide context, keep external
   → NO: Stick with text

4. **Is licensing clear & simple?**
   → YES: Consider including
   → NO: Defer or use public alternatives

---

## Examples

| Category | Visual | Audio | Why |
|----------|--------|-------|-----|
| MLB Hats | Logo icon | None | Clarity, instant recognition |
| Best Band | None | Spotify playlist (external) | Hearing is believing |
| Soda Flavors | Emoji 🥤 | None | Text is enough |
| Best Movie | None | None | Watching defeats game |
| Olympic Events | Sport emoji | None | Canonical, clear |

---

## v2.5 Focus

✅ Sports logos (MLB, NBA, NFL, soccer)
✅ Emoji support (flags, food, sports)
✅ Olympic sport emojis
✅ Keep music/movies external (user-resourced)

Defer heavy media integration to v3+. Keep PWA lean, game focused.
