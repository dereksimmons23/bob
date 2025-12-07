---
Created: December 6, 2025
Version: v1
Project: Battle o Brackets
Context: Bracket tree visualization design and architecture
Status: Design Specification (Implementation Guide)
Confidentiality: Internal
Related: FEATURE-ROADMAP.md, V2.5-SPRINT-PLAN.md, MULTIMEDIA-STRATEGY.md
Target Location: /Users/dereksimmons/Desktop/bob/
Format Rationale: Spec format (not code) to guide v2.5 implementation without animation bloat
---

# Bracket Tree Visualization Spec — v2.5

## Overview

**Current state:** Matchup cards display one game at a time (sequential, modal-like)
**Target state:** Full bracket tree visible (single screen or scrollable), shows all matchups simultaneously
**Goal:** Give bracket "weight" and "battle energy" without slowing down the app

**Key constraint:** No complex animations for v2.5. SVG tree + simple CSS layout. Animations defer to v2.6.

---

## Design Philosophy

### The Problem with Current UI
- One matchup card at a time = doesn't feel like a "bracket"
- Users can't see the scope ("How big is this?")
- No visual dominance hierarchy (round 1 vs. finals look the same)
- Feels like a series of questions, not a tournament

### The Solution
- **Visible bracket tree** from start to finish
- **Progressive disclosure** (show upcoming rounds but don't demand decisions)
- **Clear round structure** (Round 1, 2, 3, etc. labeled)
- **Visual "weight"** to the finals (bigger, more prominent)
- **Mobile-first responsive** (stacks on small screens, spreads on desktop)

### Visual Language
- **Colors:** Use existing theme (primary = category color, gray = inactive rounds)
- **Typography:** Round numbers clear, entrant names readable
- **Spacing:** Generous margins, breathing room
- **Icons:** Minimal (maybe checkmark for winners, "→" for advancing)
- **Clarity over decoration:** No unnecessary chrome

---

## Layout Approaches (Compare)

### Option A: Horizontal Tree (Left → Right)
```
[Round 1]    [Round 2]    [Semifinals]    [Final]    [Champion]
  ┌─ A ─┐
  │     ├─────┬─ A ─┐
  └─ B ─┘     │     ├─────┬─ A ─┐
              │     │     │     ├─── A (CHAMPION)
  ┌─ C ─┐     │     ├─ C ─┘     │
  │     ├─────┘     │           │
  └─ D ─┘           └─────┬─ D ─┘
```

**Pros:**
- Natural left-to-right reading flow
- Scales well for 4/8/16 entrants
- Desktop-native (spreads wide)
- Professional tournament feel

**Cons:**
- Wide on desktop (needs scrolling on narrow screens)
- Mobile becomes vertical nightmare (stacks vertically = messy)
- Matchups get small at edges

### Option B: Vertical Tree (Top → Bottom)
```
Round 1             Round 2             Round 3
├─ A                ├─ A                ├─ A (CHAMPION)
│  │                │  │                │
├─ B ─────────────┤ A │
│                 │  │
├─ C              │  ├─────────────────┤ A
│  │              │  │
├─ D ─────────────┤ C
```

**Pros:**
- Mobile-friendly (natural scrolling)
- Readable on any screen width
- Simple CSS Grid layout
- Accessible structure

**Cons:**
- Vertical space hungry (tall brackets)
- Less like "standard" bracket visualization
- Matchup lines get confusing with many entrants

### Option C: Radial/Circular (Unrealistic for v2.5)
Skip. Too complex, animations needed, overkill.

---

## Recommendation: Option A (Horizontal) + Responsive Fallback

**Why:** Matches user expectations for "bracket" (ESPN, tournament apps, etc.). Mobile fallback to stacked columns.

**Implementation:**
- **Desktop (≥768px):** Horizontal tree, horizontal scrolling if needed
- **Tablet (768px-480px):** Horizontal with smaller text, possible scroll
- **Mobile (<480px):** Column-based fallback (vertical stack), individual rounds as sections

---

## Component Structure

### Root: `<BracketTree />`
Displays the entire bracket at once.

**Props:**
- `bracket` (object) — tournament structure from game state
- `entrants` (array) — original list
- `categoryName` (string) — for header
- `categoryColor` (string) — for styling

**Renders:**
- Header (category name, size info: "8 Entrants, 3 Rounds")
- Matchup Rounds Container
  - Round 1, Round 2, ... Champion
- Legend/Status

### Child: `<BracketRound />`
Single round column/section.

**Props:**
- `roundNumber` (integer) — "1", "2", "Finals", etc.
- `matchups` (array) — games in this round
- `categoryColor` (string)

**Renders:**
- Round header ("Round 1", "Semifinals", etc.)
- Matchup cards/lines for each game

### Child: `<BracketMatchup />`
Individual matchup display (not clickable, view-only at first).

**Props:**
- `entrant1` (string) — name
- `entrant2` (string or null) — name or "TBD" if bye
- `winner` (string or null) — if decided
- `isFinal` (boolean) — make it bigger
- `categoryColor` (string)
- `onClick` (function) — navigate to vote on this matchup

**Renders:**
- Two entrant names (vertically stacked)
- Visual indicator of winner (checkmark, highlight, arrow)
- Subtle border/background color based on state

---

## Visual States & Indicators

### Matchup States

**Not Yet Played (Upcoming)**
- Gray background or neutral color
- Both names visible but dimmed slightly
- Text: "vs." between them

**Active (Current Round)**
- Category color highlight
- Both names bright/bold
- "Vote Now" button or hover effect
- Subtle pulse or border glow (optional)

**Decided (Winner Chosen)**
- Winner name bold/highlighted with checkmark ✓
- Loser name grayed out or with strikethrough
- Arrow → pointing to next round matchup
- Category color for winner line

**Bye (Auto-advance)**
- Single name with icon: "→" or "BYE"
- Different styling than two-entrant matchups
- Move to next round automatically

**Current Matchup (Being Voted)**
- Highlighted heavily (border + shadow)
- "Vote" buttons active
- Call out visually

---

## Layout Grid (Horizontal, Desktop)

```
[HEADER: "Bracket: Food, 8 Entrants, 3 Rounds"]

[Round 1]        [Round 2]       [Finals]       [Winner]
┌─────────┐      ┌──────────┐   ┌──────────┐   ┌────────────┐
│ A vs B  │      │ A        │   │          │   │            │
│         │      │ vs       │   │ A        │   │ A (Champion)│
│ Vote ◉  │ ──→  │ C        │ ──│ vs       │──│            │
│         │      │          │   │ D        │   │  VICTORY   │
├─────────┤      │ Vote ◉   │   │          │   └────────────┘
│ C vs D  │      └──────────┘   │ Vote ◉   │
│         │                     │          │
│ Vote ◉  │      ┌──────────┐   └──────────┘
│         │      │ D        │
└─────────┘      │          │
                 │ (Bye)    │
                 │ (→ Finals)
                 └──────────┘
```

**Visual Details:**
- Each round column is ~180-200px wide
- Vertical spacing between matchups = ~80-100px
- Connecting lines (SVG) between winner → next matchup
- Whole thing lives in horizontally scrollable container

---

## Responsive Breakpoints

### Desktop (≥1200px)
- Full horizontal tree visible
- No horizontal scroll needed (4 rounds fit on screen)
- Matchup cards: 180px wide
- Font: 14px entrant names, 12px round label

### Tablet (768px–1199px)
- Horizontal scroll required for 3+ rounds
- Matchup cards: 150px wide
- Font: 12px entrant names, 10px round label
- Spacing tighter

### Mobile (<768px)
- **Stacked column layout** (vertical)
- Each round as separate section
- Full-width matchup cards
- Horizontal scroll only if needed (unlikely)
- Font: 13px entrant names, 11px round label

---

## Interaction Flow

### Viewing Bracket (No Votes Yet)
1. User selects category + entrants
2. Bracket tree displays (all matchups visible)
3. User sees full scope instantly
4. "Vote Now" or "Start Bracket" button
5. **Effect:** No scrolling needed, user understands the tournament

### Voting
1. Round 1 matchups active, rest grayed out
2. User clicks/taps a matchup card
3. Modal or card expands to voting UI (existing matchup card)
4. User votes, matchup resolves
5. Winner highlighted in tree, next matchup becomes active
6. **Effect:** Bracket updates in real-time, user sees progress

### Bracket Complete
1. All matchups played, champion crowned
2. Tree shows full path: winners highlighted, losers grayed
3. Champion card enlarged/special styling
4. Call to action: "Save to Vault" or "New Bracket"

---

## SVG Connector Lines

### Purpose
Visual lines connecting winner → next matchup's position.

### Implementation (Simple)
```
<svg class="bracket-lines">
  <!-- Line from Round 1 winner (A) to Round 2 matchup -->
  <line x1="200" y1="40" x2="380" y2="40" stroke="#category-color" />
  
  <!-- Line from Round 2 winner (A) to Finals -->
  <line x1="560" y1="40" x2="740" y2="40" stroke="#category-color" />
</svg>
```

**Styling:**
- Stroke color = category color (lighter in inactive rounds)
- Stroke width = 2–3px
- Opacity = 0.5 (subtle)
- Drawn only for decided matchups

**Alternative (No Lines):**
If lines feel cluttered, use arrow glyphs ("→") instead.

---

## Color & Typography

### Colors
- **Active matchup:** Category color (solid background or border)
- **Won matchup:** Category color with checkmark
- **Lost matchup:** #999 or #ccc (grayed)
- **Bye:** Category color with arrow
- **Inactive round:** Very light gray (#f5f5f5)
- **Text:** #333 (dark), #666 (secondary), #999 (tertiary)

### Typography
- **Round label:** Bold, 11–14px, uppercase ("ROUND 1", "SEMIFINALS")
- **Entrant names:** Regular, 12–14px, truncate if needed (CSS ellipsis)
- **Winner indicator:** Bold, 12px, "✓ Winner"
- **Champion:** Extra large, bold, 18–22px

### Icons/Symbols
- **Winner:** ✓ (checkmark) or ▶ (forward arrow)
- **Bye:** → (arrow) or "(auto-advance)"
- **Active:** Subtle pulse or border glow
- **Inactive:** Muted color, reduced opacity

---

## Mobile-Specific Considerations

### Challenge: Small Screens
- Names cut off
- Spacing collapses
- Horizontal scroll is friction

### Solutions

**For Names:**
- Truncate to 15–20 characters with ellipsis
- Show full name on tap (tooltip or brief view)
- Use abbreviations if sensible (e.g., "Pizza 🍕" → "Pizza")

**For Spacing:**
- Reduce padding/margin on mobile
- Stack matchups closer (60–80px vertical gap)
- Smaller font (12px names, 10px labels)

**For Layout:**
- Switch to column layout (<768px)
- Each round as a section with clear header
- Full-width matchup cards
- Scrollable vertically only

---

## States & Accessibility

### Keyboard Navigation
- Tab through matchups in order
- Enter to expand matchup for voting
- Escape to collapse
- Arrow keys to move between rounds (optional, v2.6)

### ARIA Labels
```html
<div role="region" aria-label="Bracket tree">
  <div role="heading" aria-level="2">Round 1</div>
  <button aria-label="Vote: Pizza vs Burgers">...</button>
</div>
```

### Focus Indicators
- Clear focus rings on all interactive elements
- High contrast for visibility

---

## Animation Plan (v2.5 vs v2.6)

### v2.5 (No Animations)
- Bracket loads fully formed (static)
- Winner highlight appears instantly on vote
- Next round activates immediately
- **Why:** Bundle size, performance, simplicity

### v2.6 (Animations, Future)
- Smooth transitions between rounds
- Entrant names slide into position
- Winner line highlights travel to next round
- Confetti on final victory (reuse canvas-confetti)
- Subtle pulse on active matchups
- **Why:** Polish, engagement, after launch stability

---

## Implementation Checklist

### Phase 1: Static Tree (Hour 1)
- [ ] BracketTree component structure
- [ ] Horizontal layout (CSS Grid or Flexbox)
- [ ] SVG connector lines
- [ ] Color/state styling
- [ ] Round labels

### Phase 2: Interaction (Hour 1)
- [ ] Click/tap to expand matchup
- [ ] Vote integration (pass to existing voting logic)
- [ ] Winner highlight updates tree
- [ ] Progress indicator (X/Y matchups completed)

### Phase 3: Mobile Responsiveness (Hour 0.5)
- [ ] Tablet layout adjust
- [ ] Mobile column fallback
- [ ] Text truncation
- [ ] Touch-friendly tap targets

### Phase 4: Polish & Testing (Hour 0.5)
- [ ] Accessibility (ARIA, keyboard nav)
- [ ] Cross-device testing (mobile, tablet, desktop)
- [ ] Performance check (render time, scrolling)
- [ ] BOB commentary integration (optional: "The bracket is taking shape...")

---

## Code Architecture (Pseudo)

```javascript
// Game state tracks bracket structure
const bracketState = {
  entrants: ["Pizza", "Burger", "Taco", "Sushi"],
  matchups: [
    { id: 1, round: 1, e1: "Pizza", e2: "Burger", winner: "Pizza" },
    { id: 2, round: 1, e1: "Taco", e2: "Sushi", winner: null },
    { id: 3, round: 2, e1: "Pizza", e2: null, winner: null }, // Pending
  ],
};

// BracketTree component receives state
<BracketTree 
  bracket={bracketState}
  categoryColor="#FF6B6B"
  onMatchupClick={(matchupId) => handleVote(matchupId)}
/>

// BracketRound organizes matchups by round number
// BracketMatchup displays each game with state

// Update: When vote completes, matchup.winner updates, tree re-renders
```

---

## Performance Notes

### Rendering
- Single tree component, all rounds at once
- Rerender only on vote (winner updates)
- No expensive animations (yet)
- Bundle impact: ~3–5 KB (new components + SVG)

### Optimization
- Memoize BracketRound and BracketMatchup (prevent unnecessary re-renders)
- Lazy load SVG connector lines (only draw for visible/decided matchups)
- CSS Grid over Canvas (simpler, lighter)

---

## Success Metrics

✅ **On Launch Day (v2.5):**
- Bracket tree visible on all screen sizes
- Responsive layout adapts (desktop → mobile)
- Interaction feels natural (click matchup → vote → winner highlights)
- No performance issues (<200ms render)
- All matchups tracked visually

✅ **Before Christmas Eve:**
- Family testing confirms "bracket feel"
- Age 10–70 can understand at a glance
- Mobile experience smooth
- Zero blockers for voice/sound integration

---

## Notes

This is the "bracket feel" missing from current implementation. Not complex, not heavy. Just visible tournament structure that makes the competition real.

**Core principle:** The bracket should answer the user's question instantly: "How big is this? How many rounds? Where am I?" Everything else is detail.

Focus v2.5 on getting this right. Animations and polish wait for v2.6.

---

**Created:** December 6, 2025  
**For:** Coach D — Battle o Brackets v2.5  
**Scope:** 2.5 hours implementation time  
**Status:** Ready for sprint work Monday
