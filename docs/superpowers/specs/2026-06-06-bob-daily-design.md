# BOB Daily — v3.0 Design Spec

> Created: June 6, 2026
> Status: Approved (Derek gave full UI/UX latitude — "build it")
> Supersedes the v3.0 Party Mode direction (parked to Family Mode, phase 2)
> Origin: 82-0.com reference + Christmas Eve "we played better games tho" + WSJ/Ben Cohen AI-bracket research

---

## The One-Line Pitch

**BOB Daily is a 30-second daily bracket. Everyone gets the same one. You play it against BOB — an AI armed with a panel of models — and then see how the whole crowd voted.**

You vs. BOB vs. The Crowd. One a day. Share your score.

---

## Why We're Pulling Back

BOB v2.10 is technically excellent and accreted six months of features: 100+ categories across 11 themes, Mount Rushmore, Year in Review, QuickPlay, BrandShowcase, Party Mode specs, voice. The Christmas Eve verdict — *"we played better games tho"* — was never a feature gap. It was **too many features and no tight loop.**

82-0.com is the counter-example: one constrained daily decision, an objective-feeling result, a share. It does one thing.

**The cull is the point.** Less is more. A few brackets, one ritual, a hard-to-put-down loop.

---

## The Research That Shaped This

Two threads (full sources in the session log):

1. **WSJ / Ben Cohen** — ChatGPT, Claude, and Gemini entered the WSJ March Madness pool, adapted with game theory, and **beat most human participants.** Claude went 78% in round 1, ~59th percentile in ESPN's challenge, and was rewarded for going against the crowd. → *BOB's opponent has a real, documented track record. Not a gimmick.*

2. **"Wisdom of the Silicon Crowd" (Science Advances) + public-opinion-prediction papers** — an ensemble of 12 LLMs is statistically indistinguishable from a human crowd at forecasting; top models hit ~71% predicting how people answer, and **LLM predictions improve 17–28% when shown the median human answer** (the "centaur" effect). → *An ensemble makes BOB formidable but beatable, and **BOB can literally get smarter as the crowd grows.***

---

## The Three Players

| Player | Role | Source |
|--------|------|--------|
| **You** | Tap to pick the winner of each matchup. | The human. |
| **BOB** | The house. Has already picked every matchup. Reveals his pick + a one-line take. | An **LLM panel** (ensemble), pre-computed once per day. |
| **The Crowd** | Aggregated real votes from everyone who played today. The scoreboard. | Supabase `daily_votes`. |

BOB is no longer decoration. **BOB is the opponent.** This is the simplest possible version of the v4 "the game IS BOB" vision — no voice recognition, no orchestration, just: he picks, he talks, you measure yourself against him.

---

## Two Game Modes

### Game A — "Read the Room" (default)
**Right = the crowd majority.** You and BOB are both contestants trying to predict what most people pick.
- You score +1 each matchup your pick matches the eventual crowd majority.
- BOB is scored the same way, independently.
- Win condition: **did you read the room better than BOB?**
- This is the Herd Mentality engine the Christmas docs identified as the winning mechanic. It cannot be "unbeatable" — the crowd is the answer key, so the ceiling is ~the crowd itself.

### Game B — "Beat the Panel" (boss mode, toggle)
**BOB = the establishment opinion (the 12-model consensus). You try to out-pick it.**
- BOB's picks are **hidden** during play (no crowd shown either — you're flying blind).
- At the end: **your champion vs. BOB's champion.**
  - Same champion → *"You think like the machine."* (agreed with the establishment)
  - Different champion → the **crowd breaks the tie**: whoever's champion the crowd prefers wins. Beating a 12-model panel = a real upset, a real brag.
- Win condition: **find the pick the disciplined panel was too safe to make — and be right.**

Both modes run on the same daily bracket and the same underlying data. B is a toggle on the same content, not a separate build.

---

## The Daily Loop (Game A)

1. **Open** → "Today's Bracket: *Best Road Trip Snack*" (8 entrants). If you've already played today, you see your result + a countdown to tomorrow.
2. **Intro** → BOB greets, "the panel is seated."
3. **7 matchups** (8 → 4 → 2 → 1). Each:
   - Two options, big tap targets. You tap one.
   - **Reveal sequence:** your pick highlights → **BOB's pick** slides in with a one-liner and his panel split (*"The panel went 9–3 for Combos. I'm with them. You went rogue."*) → **the crowd bar** fills (*"Combos 64% · Jerky 36%"*).
   - Two tiny scoreboards tick: **You** vs crowd, **BOB** vs crowd.
4. **Champion** crowned (confetti).
5. **Scorecard:**
   - *"You read the room 5/7. BOB read it 6/7. BOB takes today — by one."*
   - Your champion · The Crowd's champion · BOB's champion.
   - **Streak**: days played, current win-streak vs BOB.
6. **Share** (Wordle-style, no image required):
   ```
   BOB Daily #142 — Best Road Trip Snack
   Me 5/7  🆚  BOB 6/7
   🟩🟩⬛🟩🟩🟩⬛
   bob.claudewill.io
   ```
   🟩 = matched the crowd, ⬛ = missed.

**Total time: ~30 seconds.** That's the whole product.

---

## Scope: What Survives, What Gets Shelved

### Keep / reuse (the engine works — don't rebuild it)
- `lib/bracket.js` — bracket math (generate/advance). Daily uses a **date-seeded** shuffle so everyone gets the same matchup order.
- `lib/supabase.js` — restore the paused project; add `daily_votes`.
- `lib/voice.js` + `netlify/functions/speak.js` — BOB speaks his takes (optional toggle, already built).
- Share infra / confetti / sound.
- The Vault → repurposed as **"Your Record"** (streaks + daily history).

### Shelve (preserve code, remove from primary path)
Move to `/attic` or gate behind `?dev=true`:
- Mount Rushmore mode
- Year in Review
- QuickPlayScreen
- BrandShowcase
- The 100+ category / 11-theme Library as the main entry point
- Party Mode / multi-device / room-code specs → **Family Mode, phase 2**
- Custom category builder → phase 2
- Facilitator `+/-` vote tallying and player-count (Daily is solo, single-tap)
- Heavy SetupScreen (compact + full modes)

### Freeplay (the trimmed survivor of the Library)
A small curated set (~12 evergreen 8-entrant brackets) for when you want more after the daily. Uses **single-model Claude** for BOB (live), not the full panel. This is where the old category content gets distilled down to its best hits.

---

## Architecture

### New screens
- `HomeScreen` (rewritten, minimal): **PLAY TODAY'S BOB** (primary) · Freeplay · Your Record · settings.
- `DailyScreen`: intro + the 7-matchup three-way-reveal play loop.
- `DailyResultScreen`: scorecard + streak + share.
- `FreeplayScreen`: curated bracket picker (distilled from old Library).

### New lib modules (each one job, testable in isolation)
- `lib/daily.js` — resolve **today's bracket** from a date-seeded schedule; the "already played today" lock (localStorage); day number for share text.
- `lib/panel.js` — **BOB's brain.** Interface:
  ```js
  getPanelPick(matchup, context) -> {
    pick,            // entrant BOB chose
    confidence,      // 0..1
    split,           // [{model, pick}] — the 12-model panel
    line,            // one-line BOB take
  }
  ```
  - **v1 (ship now):** served from pre-computed data in the daily bracket file (authored pick + line; panel split derived deterministically from confidence for flavor). No live LLM dependency → works offline, instant.
  - **v2:** `netlify/functions/panel.js` calls a real ensemble **once per day**, caches to Supabase. Cheap (one shared daily bracket → ~90 calls/day total, served to everyone).
  - **v3:** blend panel prior with accumulated crowd votes (centaur) — BOB measurably improves over time.
- `lib/crowd.js` — submit a vote + fetch the live aggregate per matchup. Supabase-backed.
  - **Graceful degradation (honest):** if Supabase is unavailable or a matchup has too few votes, fall back to BOB's confidence as a *clearly-labeled estimate* (`crowdSource: 'estimate'`), never a silent fake. Real votes replace the estimate as they accrue.

### Data
- `data/dailyBrackets.js` — a dated schedule of curated **8-entrant** brackets spanning food / music / movies / sports / nostalgia / life. Each entry carries BOB's pre-computed pick + line per matchup so v1 runs without a live model.

### Option D connection
BOB's panel (`panel.js` / the serverless ensemble) is a natural **showcase for Option D** — Derek's private model-agnostic SDK (9 providers, zero deps). BOB Daily becomes the public proof-of-concept for that SDK. One build, two wins.

---

## Build Order (vertical slice first)

**Slice 1 — playable solo daily (this session):**
1. `lib/daily.js` + `data/dailyBrackets.js` (seed ~14 days, today's authored in full).
2. `lib/panel.js` v1 (data-driven) + `lib/crowd.js` with graceful fallback.
3. `DailyScreen` (single-tap voting + three-way reveal).
4. `DailyResultScreen` (scorecard + Wordle share).
5. Rewrite `HomeScreen` minimal; route default → Daily.
6. Game B toggle (hidden BOB, champion-vs-champion scoring).
7. Verify: `npm run build` clean; manual play-through.

**Slice 2 — real crowd + real panel (next session):**
8. Restore Supabase; `daily_votes` table + RLS; wire `crowd.js` to real data.
9. `netlify/functions/panel.js` live ensemble (Option D); daily cache.
10. "Your Record" streaks screen.

**Phase 2 — Family Mode:** the parked Party Mode / multi-device work, reframed for the daily.

---

## Success Criteria

- Open → played → shared in **under a minute**, no setup.
- The "You vs. BOB vs. Crowd" reveal produces a reaction every round.
- People come back the next day for a new bracket (streak).
- The share text is something you'd actually paste in a group chat.
- BOB feels like a worthy rival you *can* beat — not a wall.

## Non-Goals (v3.0)

- Multi-device / room codes (→ Family Mode).
- Accounts/login (anonymous device-id only, as today).
- The full 100+ category library as a front-door.
- Making BOB unbeatable. (Explicitly rejected — it kills the loop.)
