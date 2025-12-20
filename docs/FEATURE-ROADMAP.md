# Battle o Brackets — Feature Roadmap

## Version History

| Version | Date | Summary |
|---------|------|---------|
| v1 | Dec 2-3, 2025 | MVP: Bracket engine, voting, Vault, BOB basics |
| v2 | Dec 4, 2025 | Category library, Quick Start, BOB personality, Share, Sound, Custom saves |

---

## v2 Features (Current — Shipped Dec 4, 2025)

### ✅ Core Engine (from v1)
- Bracket math engine (any entrant count 4+)
- Auto-calculates play-ins and byes
- Voting system (+1/-1 facilitator tallying)
- Lock-in confirmation
- Tie-breaker "phone a friend" flow
- Round progression
- Champion celebration with confetti

### ✅ Category Library
- 60+ preset categories across 7 themes
- Theme-based filtering (pills)
- Category cards with entrant counts
- Full entrant lists auto-populate
- Color-coded by theme

### ✅ Quick Start Mode
- "🎯 Quick Start" from home screen
- Browse by theme
- "🎲 Surprise Me" random selection
- 2-tap to gameplay

### ✅ Uncle BOB Personality
- Category-specific openers by theme
- Context-aware matchup commentary
- Margin-aware result reactions (blowout/close/normal)
- Tie-specific dialogue
- Championship intros and crowning lines
- Mood colors (normal/excited/dramatic/victory/chaos)

### ✅ Share Champion
- Canvas-generated 600x400 PNG image
- Trophy emoji, category, champion, runner-up
- Download button (saves as PNG)
- Copy Text button (shareable format with hashtag)
- #BattleOfBrackets branding

### ✅ Sound Effects
- Vote sound (chirp)
- Lock-in sound (confirmation)
- Champion fanfare (chord progression)
- Tie sound (buzzer)
- Toggle on/off in settings
- Silent fail on audio errors

### ✅ Custom Category Builder
- "💾 Save Category" button
- localStorage persistence
- Displays in library under "YOUR CUSTOM CATEGORIES"
- Updates existing if name matches

### ✅ The Vault / Banners & Banter
- Champion history browser
- Category, champion, runner-up, date
- localStorage persistence
- BOB callbacks

### ✅ PWA Support
- Manifest for home screen install
- Offline-capable
- Touch-friendly controls
- Mobile-first responsive design

---

## v2.5 Features (Pre-Christmas Polish)

### ✅ Battle Animations & UI Polish (Shipped Dec 9, 2025)
**Status:** Complete

- VS badge clash animation with pulse
- Winner celebration scale animation
- Loser fade-out animation
- Vote pop animation on tallying
- Button hover effects
- Pulsing Lock In button

### ✅ Expanded Dialogue (Shipped Dec 9, 2025)
**Status:** Complete

- Wired up unused BOB arrays: `bobAdvice` (15%), `deadpan` (30%), `impatience` (25%)
- Random probability for variety
- No repetition in single bracket

### ✅ New Sound Effects (Shipped Dec 9, 2025)
**Status:** Complete

- `advance` — Rising tone when winner advances
- `roundComplete` — Fanfare when completing a round
- `dramatic` — Deep build for championship intro

### ✅ Vote Correction / Undo (Shipped Dec 9, 2025)
**Status:** Complete

- 5-second undo window after each vote
- State snapshot preserved for rollback
- BOB acknowledges: "Fine. Let's redo that one. Democracy demands accuracy."

### ✅ Compact Bracket Visualization (Shipped Dec 9, 2025)
**Status:** Complete

- Horizontal bracket path view (replaced tall vertical)
- March Madness-style naming: Sweet 16, Elite 8, Final Four, Finals
- Visual bracket lines connecting rounds
- Current round highlighted with accent color

### ✅ Mobile UX Improvements (Shipped Dec 9, 2025)
**Status:** Complete

- Sticky footer action buttons (always visible)
- Reduced padding to fit content above fold
- First-time user hints (disappear after first vote)
- Smaller font for category cards on mobile

### ✅ BOB Comments in Vault (Shipped Dec 10, 2025)
**Status:** Complete

- `bobComment` field added to entry structure
- BOB comment captured at championship moment
- Displayed in Vault with "— BOB" attribution
- Same comment shown on ChampionScreen and stored

### ✅ Pre-populated Vault (Shipped Dec 10, 2025)
**Status:** Complete

- 13 family bracket winners seeded for new users
- Custom BOB comments for each entry
- Dates span Nov 27 - Dec 8, 2024 (last year's play)

### ✅ Olympics Categories (Shipped Dec 11, 2025)
**Status:** Complete

- Winter Olympics Events (16 entrants)
- Summer Olympics Events (16 entrants)
- All Olympics Combined (32 entrants)

Already integrated in category library.

### ✅ In-App Feedback System (Shipped Dec 20, 2025)
**Status:** Complete

- Supabase project created (`bob`)
- Feedback table with RLS policies
- Submit feedback modal in settings
- Admin panel to view/delete feedback
- Accessible via Settings → View Feedback

### 🔲 Voice Integration (ElevenLabs)
**Status:** Stretch goal — not critical for MVP

- Derek's cloned voice for BOB
- Settings toggle for audio on/off
- API endpoint integration

---

## v3 Features (Post-Christmas / Q1 2026)

### 🔲 Banners & Banter Social
**Status:** Concept only

Full social layer for sharing and viewing brackets:
- Public gallery of completed brackets
- Shareable bracket URLs
- View others' champions and banter
- Reaction/voting on others' results
- Leaderboards (most brackets, streaks)

See: `BANNERS-AND-BANTER-SOCIAL.md` for full concept

### 🔲 Multi-Language Support
**Status:** Not built

- Spanish
- French
- German
- Portuguese
- Japanese

**Challenge:** BOB's personality needs localization, not just translation

### 🔲 Export/Import Categories
**Status:** Not built

- Export custom categories as JSON
- Import from file
- Share category packs

### 🔲 Snub List
**Status:** Concept only

When creating a bracket, option to add "Notable Snubs" — entrants that didn't make the cut. BOB can reference them.

"I notice you left out Coldplay. Bold move."

### 🔲 Callback Humor
**Status:** Partial

BOB references past brackets if they're in the Vault.

"Pineapple? Again? Didn't we settle this last Thanksgiving?"

### 🔲 Milestone Reactions
**Status:** Not built

BOB acknowledges bracket milestones:
- "Your 10th bracket. We're practically family."
- "100 total voters. Democracy at scale."
- "First tie-breaker of the night. The chaos begins."

### 🔲 Entrant-Specific Hot Takes
**Status:** Not built

BOB has opinions on specific entrants:
- "Ah, Coldplay. Controversial choice. I'm watching you."
- "Pineapple on pizza. Here we go."
- "Turkey in the Thanksgiving bracket. Gutsy."

---

## v4 Features (Future / If Commercial)

### 🔲 Multiplayer / Real-Time Voting
- Each voter on their own device
- Real-time vote sync
- No facilitator needed

**Challenge:** Requires backend

### 🔲 Corporate/Team Version
- Custom branding
- Private instances
- Analytics dashboard
- Team-building features

### 🔲 API / Integrations
- Slack integration
- Discord bot
- Twitch overlay

### 🔲 Premium Categories
- Licensed content (sports teams, movies)
- Exclusive seasonal packs
- Early access to new categories

---

## Technical Debt / Improvements

### 🔲 Service Worker
- Full offline caching
- Background sync

### 🔲 Database Backend (if needed)
- User accounts
- Cloud sync
- Social features

### 🔲 Testing
- Unit tests for bracket math
- E2E tests for voting flow
- Accessibility audit

### 🔲 Analytics
- Anonymous usage tracking
- Category popularity
- Completion rates

---

## Revenue Model Options (Future)

| Model | Pros | Cons |
|-------|------|------|
| **Free forever** | Maximum adoption | No revenue |
| **Freemium** | Free core + premium categories | Limits engagement |
| **One-time purchase** | Simple, fair | Limited ongoing revenue |
| **Subscription** | Recurring revenue | Hard sell for party game |
| **Ad-supported (interstitial)** | Free for users | Disrupts party vibe |
| **Ad-supported (on-open only)** | Non-intrusive, Wordle-style | Lower revenue than interstitial |
| **Corporate licensing** | High value per sale | Different audience |
| **Tip jar / Donate** | Goodwill | Unpredictable |
| **Sponsorship** | Brand integration | Requires traction first |

### Recommended Approach (Phased)

**Phase 1: Launch (2025)**
- Free with tip jar ("Buy BOB a coffee")
- No ads, build goodwill and user base

**Phase 2: Monetization (2026)**
- One-time ad on app open (Wordle-style)
  - Shows once per session, not between matchups
  - Doesn't interrupt gameplay
  - Could be skippable after 5 seconds
- Premium category packs ($1.99-4.99)
  - Licensed content (sports teams, movie franchises)
  - Exclusive seasonal packs
  - Early access to new categories

**Phase 3: Scale (If traction)**
- Corporate/Team Building Edition ($500-2000/event)
  - Custom branding
  - Private hosting
  - Analytics dashboard
- Brand sponsorship
  - "Best Chip Flavor, presented by Frito-Lay"
  - Category-specific sponsors
- Remove ads option ($2.99 one-time)

### In-App Purchases with PWA

Yes, PWAs can handle payments:
- Stripe Checkout (redirect to payment page)
- Web Payment Request API
- Simple unlock codes stored in localStorage
- No App Store cut (30%)

---

## Priority Matrix

| Feature | Impact | Effort | Priority |
|---------|--------|--------|----------|
| Olympics categories | Medium | Low | **Now** |
| Vote correction | Medium | Low | **v2.5** |
| Bracket visualization | High | High | **v2.5** |
| Social layer | High | Very High | **v3** |
| Multi-language | Medium | High | **v3** |
| Export/Import | Low | Low | **v3** |
| Multiplayer | High | Very High | **v4** |
| Corporate version | High | High | **If demand** |

---

## Christmas Eve Checklist — ALL COMPLETE 🎄

**Must have:**
- [x] Working bracket flow
- [x] Quick start with presets
- [x] BOB personality
- [x] Share results
- [x] Sound toggle
- [x] Olympics categories

**Nice to have:**
- [x] Vote correction / undo
- [x] Basic bracket visualization
- [x] Battle animations
- [x] Mobile UX polish
- [x] BOB comments in Vault
- [x] Pre-populated Vault
- [x] In-app feedback system

**Deferred to v3:**
- [ ] Voice integration (ElevenLabs)

**Not needed for debut:**
- Social features
- Multi-language
- Corporate version
