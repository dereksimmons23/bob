# Banners & Banter — Social Feature Concept

## Overview

**Banners & Banter** is the proposed social layer for Battle o' Brackets, allowing users to share completed brackets publicly and view what others have crowned as champions.

The name captures both elements:
- **Banners** = Championships, victories, crownings
- **Banter** = BOB commentary, debates, trash talk

"Welcome to Banners & Banter, where champions are immortalized and bad takes live forever."

---

## Core Concept

### What Gets Shared?

When a bracket completes, users can generate a **Banner** — a shareable record including:

1. **Category** — "Best Pizza Topping"
2. **Champion** — "Pepperoni 🏆"
3. **Runner-Up** — "Defeated: Sausage"
4. **Date** — December 24, 2024
5. **Voter Count** — "Decided by 6 voters"
6. **BOB's Commentary** — Selected quote from the bracket
7. **Full Bracket Results** (optional toggle)

### What's the Banter?

The **Banter** layer includes:
- BOB's commentary throughout the bracket
- Highlight moments (closest matchup, biggest upset)
- Optional: User-added commentary
- Community reactions (upvotes, comments)

---

## User Flows

### Flow 1: Share a Bracket

```
[Champion Screen]
     ↓
[Share Button]
     ↓
[Generate Banner Card]
     ↓
[Options]
├── Download Image (current feature)
├── Copy Text (current feature)
├── Post to Banners & Banter (NEW)
└── Get Shareable Link (NEW)
```

### Flow 2: Browse Banners

```
[Home Screen]
     ↓
[Banners & Banter Button]
     ↓
[Feed Options]
├── Recent (chronological)
├── Trending (most viewed/liked)
├── Following (people you follow)
└── Categories (filter by type)
     ↓
[Banner Card]
     ↓
[View Full Bracket] or [React]
```

### Flow 3: React to a Banner

```
[View Banner]
     ↓
[Reaction Options]
├── 🏆 Crown It (agree)
├── 🗑️ Trash Take (disagree)
├── 😂 Hilarious
└── 💬 Comment
```

---

## Feature Components

### 1. Banner Cards

Visual cards showing completed brackets:

```
┌─────────────────────────────────────┐
│  🏆 BEST PIZZA TOPPING              │
│                                     │
│       PEPPERONI                     │
│       is the champion               │
│                                     │
│  defeated Sausage                   │
│  Dec 24, 2024 • 6 voters            │
│                                     │
│  BOB: "The people have spoken."     │
│                                     │
│  [View Bracket] [React] [Share]     │
└─────────────────────────────────────┘
```

### 2. Full Bracket View

Expandable view showing entire tournament:

```
┌─────────────────────────────────────┐
│  BEST PIZZA TOPPING — Full Bracket  │
│                                     │
│  ROUND 1                            │
│  Pepperoni def. Mushroom (5-1)      │
│  Sausage def. Pineapple (4-2) *TIE* │
│  ...                                │
│                                     │
│  SEMIFINALS                         │
│  Pepperoni def. Bacon (4-3)         │
│  Sausage def. Cheese (5-1)          │
│                                     │
│  CHAMPIONSHIP                       │
│  Pepperoni def. Sausage (4-2) 🏆    │
└─────────────────────────────────────┘
```

### 3. Profile Pages

User profiles with their bracket history:

```
┌─────────────────────────────────────┐
│  @coachd's Banners                  │
│                                     │
│  🏆 47 brackets completed           │
│  📅 Member since Dec 2024           │
│                                     │
│  Recent Champions:                  │
│  • Pepperoni (Pizza Toppings)       │
│  • Figure Skating (Winter Olympics) │
│  • Seinfeld (Best Sitcom)           │
│                                     │
│  [Follow] [Message]                 │
└─────────────────────────────────────┘
```

### 4. Category Leaderboards

Aggregated results across all users:

```
┌─────────────────────────────────────┐
│  BEST PIZZA TOPPING                 │
│  Global Results (247 brackets)      │
│                                     │
│  1. Pepperoni — 89 wins (36%)       │
│  2. Sausage — 52 wins (21%)         │
│  3. Extra Cheese — 41 wins (17%)    │
│  4. Mushroom — 28 wins (11%)        │
│  ...                                │
│                                     │
│  [Run This Bracket] [View All]      │
└─────────────────────────────────────┘
```

---

## Technical Architecture

### Current (v2): Local Only

```
┌─────────────┐
│   Browser   │
│  (PWA)      │
│             │
│ localStorage│
│  - vault    │
│  - customs  │
└─────────────┘
```

### Proposed (v3): Social Layer

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│    API      │────▶│  Database   │
│  (PWA)      │     │  (Backend)  │     │  (Postgres) │
│             │     │             │     │             │
│ localStorage│     │  Auth       │     │  Users      │
│  (offline)  │     │  Upload     │     │  Brackets   │
│             │     │  Feed       │     │  Reactions  │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Backend Requirements

1. **User Authentication**
   - Sign up / Sign in
   - OAuth (Google, Apple, Discord?)
   - Guest mode with claim later

2. **Data Storage**
   - User profiles
   - Completed brackets (full history)
   - Reactions / Comments
   - Follow relationships

3. **API Endpoints**
   - POST /brackets (upload completed bracket)
   - GET /feed (paginated bracket feed)
   - GET /brackets/:id (single bracket)
   - POST /reactions (add reaction)
   - GET /users/:id/brackets (user's brackets)
   - GET /categories/:id/leaderboard (aggregate stats)

4. **Image Generation**
   - Server-side banner rendering
   - OG image meta tags for social sharing
   - Dynamic image URLs

---

## Privacy Considerations

### Public vs. Private

- **Default:** Private (local only, like current)
- **Opt-in:** Share specific brackets publicly
- **Option:** Make profile public/private

### Data Shared

When posting a bracket:
- Category name
- Entrant list
- Results
- BOB commentary
- Date/time
- Username (or anonymous)
- Voter count (not voter identities)

NOT shared:
- Other players' names
- Location
- Personal notes

### Moderation

- Report button on banners
- Automated flag for inappropriate category names
- Community moderation tools

---

## Monetization Opportunities

### Free Tier
- Unlimited local brackets
- Share up to 5 brackets/month
- View public feed

### Premium Tier ($2.99/month or $19.99/year)
- Unlimited sharing
- Custom banner designs
- Profile themes
- Analytics dashboard
- Early access to new categories
- Ad-free experience

### Creator/Corporate Tier
- Custom branding
- Private group brackets
- Team analytics
- White-label option

---

## MVP Scope (v3.0)

**Phase 1: Share Link Only** ✅ COMPLETE (Dec 20, 2025)
- ✅ Generate unique URL for completed bracket (`/b/[id]`)
- ✅ Anyone with link can view (public, no auth)
- ✅ No accounts required
- ✅ View count tracking
- ✅ "Get Shareable Link" button on Share modal
- ✅ CTA to create own bracket on shared view
- ✅ Supabase `shared_brackets` table with RLS policies

**Phase 2: Public Feed** 🔲 Not Started
- User accounts (optional, OAuth)
- Public feed of recent brackets
- Basic reactions (🏆 Crown It, 🗑️ Trash Take)
- Profile pages

**Phase 3: Community** 🔲 Not Started
- Following system
- Comments
- Category leaderboards
- Notifications

**Phase 4: Premium** 🔲 Not Started
- Paid tier
- Custom designs
- Analytics

---

## BOB's Role in Social

BOB becomes the "voice" of Banners & Banter:

**Feed Commentary:**
- "237 brackets completed today. The people have opinions."
- "Pepperoni leads the pizza rankings. As it should."
- "Someone crowned Candy Corn as best Halloween candy. I have concerns."

**Trend Alerts:**
- "Trending: Best Christmas Movie. Die Hard vs. everything else."
- "Controversial take alert: Someone put cereal in the dinner category."

**Milestone Celebrations:**
- "Your 50th bracket. We've been through a lot together."
- "100 followers. You're basically famous now."

---

## Competitive Analysis

### Similar Products

| Product | Bracket Focus | Social Features |
|---------|--------------|-----------------|
| **ESPN Tournament Challenge** | March Madness only | Leaderboards, groups |
| **Challonge** | Tournament management | Public brackets, embed |
| **Bracketology** | Sports predictions | Limited social |
| **Ranker** | Opinion lists | Voting, comments |

### Our Differentiation

- **Party game focus** — designed for in-person gatherings
- **BOB personality** — unique AI host experience
- **Any category** — not limited to sports
- **Humor-first** — the debates are the point

---

## Open Questions

1. **Username system** — How to handle identity? Require accounts or allow anonymous posting?

2. **Moderation burden** — How much content review is needed? Can BOB handle some automated moderation?

3. **Discovery** — How do users find interesting brackets? Algorithm? Hashtags? Categories?

4. **Cross-posting** — Integration with Twitter/X, Instagram, TikTok? Generate images optimized for each platform?

5. **Group brackets** — Should multiple people be able to claim the same bracket? (e.g., "The Simmons Family" as author)

6. **Embedding** — Can brackets be embedded on other websites? Blog posts, newsletters?

---

## Next Steps

1. ✅ **Build share link MVP** — COMPLETE (Dec 20, 2025)
   - Shareable URLs at `bob.claudewill.io/b/[id]`
   - Public view page
   - View count tracking

2. **Validate demand** — Do users actually want to share?
   - Track shared brackets in Supabase (Dec 24+)
   - Monitor view counts
   - Check if shared links get engagement

3. **Phase 2: Public Feed** — If demand validated (Jan 2026)
   - Design feed UI mockups
   - Add optional user accounts
   - Build public browse experience

4. **Phase 3: Community** — Based on Phase 2 traction
   - Reactions system
   - Comments
   - Category leaderboards

5. **Iterate based on usage** — Add social features based on what people actually do.

---

## Success Metrics

| Metric | Target (v3 launch) |
|--------|-------------------|
| Brackets shared | 1,000+ |
| Weekly active users | 500+ |
| Average reactions per bracket | 3+ |
| Retention (return within 7 days) | 30%+ |
| Conversion to premium | 5%+ (if applicable) |

---

## Timeline Estimate

| Phase | Effort | Target |
|-------|--------|--------|
| Share Link MVP | 2-3 weeks | Jan 2025 |
| User Accounts + Feed | 4-6 weeks | Feb 2025 |
| Reactions + Comments | 2-3 weeks | Mar 2025 |
| Premium Tier | 3-4 weeks | Apr 2025 |

*Estimates assume dedicated development time*
