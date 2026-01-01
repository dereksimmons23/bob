# BOB v3.0 — March Madness Release Plan

> Created: January 1, 2026
> Target: March 1, 2026 (before March Madness tips off)
> Resume work: Mid-February 2026

---

## The Opportunity

March Madness is the perfect moment for BOB v3.0:
- Bracket culture is mainstream for 3 weeks
- "Who's your pick?" conversations everywhere
- Party Mode mechanics align with tournament energy
- Challenge/Block = upsets and busted brackets
- Natural marketing hook

---

## Scope: What Ships March 1

### Must Have (Party Mode MVP)

| Feature | Description | Sessions |
|---------|-------------|----------|
| **Halftime Speech** | 30-sec advocacy timer before voting | 2 |
| **Challenge System** | Secret power to reverse results (Round 1 only) | 3 |
| **Block System** | Counter a Challenge within 5 seconds | 2 |
| **Blowout Immunity** | 3+ margin = no Challenge allowed | 1 |
| **Upset Windows** | Extended Challenge time for underdog wins | 1 |
| **Party Mode Toggle** | Enable/disable in settings | 1 |
| **March Madness Theme** | Category set + seasonal styling | 1 |

**Total: ~11 working sessions**

### Bug Fixes (Do First)

| Bug | Priority | Sessions |
|-----|----------|----------|
| "defeated 0" bug on champion screen | High | 1 |
| Vault individual share failing | High | 1 |
| og-image.png gray box | Low | Manual fix |

**Total: ~2 sessions**

### Nice to Have (If Time)

| Feature | Sessions |
|---------|----------|
| Mobile UX polish (from Dec 30 review) | 2-3 |
| Bracket Recap visualization | 2 |
| Settings consolidation | 1 |

---

## Technical Design

### Challenge/Block Distribution

```javascript
// At game start with 8 players:
// - 3 random players get Challenges
// - 3 different random players get Blocks
// - 2 players have no powers

const distributePowers = (playerCount) => {
  const players = shuffle([...Array(playerCount).keys()])
  return {
    challenges: players.slice(0, 3),
    blocks: players.slice(3, 6),
    powerless: players.slice(6)
  }
}
```

### State Changes

```javascript
// New game state for Party Mode
partyMode: {
  enabled: true,
  powers: {
    challenges: [playerId1, playerId2, playerId3],
    blocks: [playerId4, playerId5, playerId6],
    used: { challenges: [], blocks: [] }
  },
  round1Complete: false
}
```

### UI Flow

```
1. Matchup appears
2. [Optional] "Halftime Speech" button → 30-sec timer
3. "3-2-1 Vote!" countdown
4. Results shown
5. If margin < 3 and Round 1:
   - Challenge window (10-20 sec based on upset)
   - If Challenge used → Block window (5-10 sec)
6. Final result announced
7. Next matchup
```

### Files to Modify

| File | Changes |
|------|---------|
| `App.jsx` | Party mode state, power distribution |
| `PlayingScreen.jsx` | Halftime Speech UI, Challenge/Block windows |
| `MatchupCard.jsx` | Challenge/Block buttons, timers |
| `data/bob.js` | New dialogue arrays |
| `lib/storage.js` | Party mode preference |
| `data/categories.js` | March Madness categories |

---

## Timeline

Assuming resume mid-February with ~2 weeks to ship:

### Week 1 (Feb 15-21)
- [ ] Fix priority bugs (2 sessions)
- [ ] Halftime Speech (2 sessions)
- [ ] Challenge system foundation (2 sessions)

### Week 2 (Feb 22-28)
- [ ] Challenge system complete (1 session)
- [ ] Block system (2 sessions)
- [ ] Blowout immunity + Upset windows (2 sessions)
- [ ] Party Mode toggle + settings (1 session)

### Final Push (Mar 1)
- [ ] March Madness theme + categories
- [ ] Testing + polish
- [ ] Deploy

---

## March Madness Categories

```javascript
// New category theme for March Madness
{
  theme: 'marchmadness',
  label: 'March Madness',
  categories: [
    { name: 'Best Cinderella Story', entrants: [...] },
    { name: 'Greatest Tournament Performance', entrants: [...] },
    { name: 'Best Bracket Buster', entrants: [...] },
    { name: 'Best Championship Game', entrants: [...] },
    { name: 'Best College Basketball Arena', entrants: [...] },
    { name: 'Best March Madness Moment', entrants: [...] },
    { name: 'Best One-and-Done Player', entrants: [...] },
    { name: 'Best Tournament Mascot', entrants: [...] },
  ]
}
```

---

## Success Metrics

**v3.0 works when:**
- People use Halftime Speeches without prompting
- "WHO CHALLENGED THAT?!" gets shouted
- Debates erupt after Blocks
- Plays well during actual March Madness viewing parties
- Shares increase during tournament weeks

**v3.0 fails when:**
- Party Mode feels clunky or confusing
- Challenge/Block mechanics slow things down
- People disable Party Mode after trying once

---

## What's NOT in v3.0

Explicitly deferred to v3.5+:
- Multi-device voting (invite links, QR codes)
- Bob personalities
- QuickPlayScreen iteration
- Dynamic OG images
- Voice-first BOB

---

## Pre-Launch Checklist

- [ ] All Party Mode features working
- [ ] March Madness categories populated
- [ ] Mobile testing pass
- [ ] Analytics tracking Party Mode usage
- [ ] Substack post published (ties into launch)
- [ ] Social share text updated for tournament season

---

## Notes

The ~11 session estimate assumes focused work sessions. With a mid-February resume, this is comfortable for a March 1 ship.

If time runs short, the minimum viable Party Mode is:
1. Halftime Speech
2. Challenge (no Block)
3. 3-2-1 countdown (already shipped)

Block, Blowout Immunity, and Upset Windows add polish but aren't essential for the core "debates happen during the bracket" goal.
