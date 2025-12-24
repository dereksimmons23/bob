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

### ✅ About Modal & First-Visit Experience (Shipped Dec 20, 2025)
**Status:** Complete

- Expanded About modal with "How It Works" section
- BOB origin story (Uncle Robert Jake + famous Bobs)
- Creator credit (Derek Simmons + Claude)
- Auto-shows on first visit

### ✅ UI/UX Polish (Shipped Dec 20, 2025)
**Status:** Complete

- Fixed doubled icons (🏆 THE CHAMPIONSHIP, etc.)
- Changed "Back" buttons to "← Home" for clarity
- Styled ConfirmModal (replaced browser confirm())
- Increased touch targets on vote buttons (44px min)
- Shortened progress labels for mobile
- Keyboard navigation (← → arrows for voting, Enter to lock in)

### ✅ Dev Mode (Shipped Dec 20, 2025)
**Status:** Complete

- Add `?dev=true` to URL for builder/tester tools
- Dev Tools modal with:
  - Reset First Visit
  - Reset Vault to Seed Data
  - Clear All localStorage

### ✅ Supabase Analytics (Shipped Dec 20, 2025)
**Status:** Complete

- `games` table tracks completed brackets (category, champion, runner-up, player count)
- `custom_categories` table tracks user-created categories
- Anonymous tracking (no user identification)

### ✅ Vault Carousel Redesign (Shipped Dec 20, 2025)
**Status:** Complete

- One-card-per-screen hero display
- Navigation counter ("1 of 13 champions")
- Keyboard navigation (← → arrows)
- Sticky footer with controls always visible
- Edit/Delete on each card

### ✅ Shareable Bracket Links — Banners & Banter Phase 1 (Shipped Dec 20, 2025)
**Status:** Complete

- "Get Shareable Link" button on Share modal
- `shared_brackets` table in Supabase
- Public view page at `/b/[id]`
- Shows category, champion, runner-up, BOB comment
- Tracks view count
- CTA to create your own bracket

### ✅ Privacy Policy & Terms of Use (Shipped Dec 21, 2025)
**Status:** Complete

- Tabbed modal accessible from Settings → "Privacy & Terms"
- Privacy Policy covers: data collection, local storage, no tracking, data deletion
- Terms of Use covers: game usage, shared brackets, content policy
- Human-readable, plain English (not legalese)
- Contact email for data requests

### 🔲 Voice Integration (ElevenLabs)
**Status:** Stretch goal — not critical for MVP

- Derek's cloned voice for BOB
- Settings toggle for audio on/off
- API endpoint integration

---

## v3 Features (Post-Christmas / Q1 2026)

### ✅ Banners & Banter Phase 1 — Shareable Links (Shipped Dec 20, 2025)
**Status:** Complete

- Shareable bracket URLs (`bob.claudewill.io/b/[id]`)
- Public view page (read-only)
- No accounts required
- View count tracking

### 🔲 BOB Modes — Classic vs Spicy
**Status:** Concept only (Dec 23, 2025)

Two personality modes for different audiences:

| Mode | Vibe | Implementation | Audience |
|------|------|----------------|----------|
| **Classic BOB** | Dry, deadpan, safe | Static dialogue (current) | All ages — default |
| **Spicy BOB** | Cards Against Humanity energy | LLM-powered | Adults only — opt-in toggle |

**Classic BOB (Current):**
- Pre-written dialogue triggered by game events
- Works offline, zero API costs
- Fast, consistent, family-safe
- Limitation: can't react to specific matchups or custom categories intelligently

**Spicy BOB (Future):**
- LLM-powered with custom system prompt
- Could react to actual bracket content ("Pineapple vs Pepperoni? Oh, we're going THERE.")
- Genuine opinions on specific matchups
- Could remember past brackets ("Didn't Ranch already lose to Ketchup?")
- Adult humor, edgier takes

**Implementation Notes:**
- Settings toggle: "BOB Mode: Classic / Spicy (18+)"
- Spicy mode requires internet (API calls)
- Warning on toggle: "Spicy BOB says things your grandma wouldn't approve of"
- Could be gated as premium feature

**Why Hybrid:**
- Magic of BOB is his *voice*, not intelligence — static lines often land harder
- LLM shines for custom categories where pre-written content impossible
- Different audiences need different modes (Timmy & Grandma Jean vs. adult game night)

### 🔲 Run It Back — Replay Previous Brackets
**Status:** Concept only

Replay brackets from The Vault with original or new voters.

- Select any past bracket from The Vault
- Re-run with same entrants, fresh votes
- Compare results: "Then vs Now" view
- Seasonal rotation: auto-surface relevant brackets (holiday music in December, chips during Super Bowl)
- Track how opinions shift over time

**Use cases:** Cheese, chips, holiday music, annual traditions

### 🔲 Banners & Banter Phase 2 — Public Feed
**Status:** Not started

- User accounts (optional)
- Public feed of recent brackets
- Basic reactions (🏆 Crown It, 🗑️ Trash Take)
- Profile pages
- Wordle-style text sharing (emoji grid for Twitter/iMessage)

### 🔲 Banners & Banter Phase 3 — Community
**Status:** Not started

- Following system
- Comments
- Category leaderboards (aggregated results)
- Notifications

See: `BANNERS-AND-BANTER-SOCIAL.md` for full concept

### 🔲 Bracket Visualization & Visual Identity
**Status:** Concept only (Dec 24, 2025)

Make the bracket structure more visible throughout the app. The *journey* is what makes brackets fun — seeing how the champion got there.

**Post-game bracket reveal:**
- After champion crowned, show the full tournament tree with all results filled in
- "Here's how it went down" — animated fill-in of the bracket path
- Tap to expand, see matchup details

**In-game bracket progress:**
- Mini bracket diagram in corner during gameplay
- Winners slide toward center, losers fade out
- Visual representation of narrowing field

**Share the journey:**
- Share card shows bracket path, not just champion
- Full tournament results in a visual format
- More interesting than "X beat Y"

**Bracket iconography:**
- Replace 🎯 dartboard in About modal with stylized bracket logo
- Consider custom bracket-shaped icon/emoji for app identity
- Consistent visual language: brackets = structure, ⚔️ = battle, 🏆 = victory

**Current emoji usage:**
- 🎯 About header, Quick Start — dartboard doesn't fit app theme
- ⚔️ Locked VS badge, Start Battle — works well for combat moments
- 🏆 Trophy — correct everywhere, keep as-is

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
- [x] About modal with first-visit experience
- [x] Keyboard navigation
- [x] Shareable bracket links (Banners & Banter Phase 1)
- [x] Vault carousel redesign
- [x] Dev mode for testing
- [x] Supabase analytics
- [x] Privacy Policy & Terms of Use

**Deferred to v3:**
- [ ] Voice integration (ElevenLabs)
- [ ] Public feed / Banners & Banter Phase 2
- [ ] User accounts

**Not needed for debut:**
- Multi-language
- Corporate version

---

## Launch Plan — December 24-26, 2025

### Launch Day (Dec 24)
- **Christmas Eve debut** with family
- Create first shared brackets from family play
- Capture reactions, memorable moments

### Soft Launch (Dec 25-26)
- Share results on personal social:
  - LinkedIn (professional angle: "Built with AI")
  - Twitter/X (quick demo or GIF)
  - Substack (if applicable)
- Text/email direct links to friends and family

### Broader Announcement (Dec 27-31)
- Reddit: r/SideProject, r/webdev
- Product Hunt (consider timing — holiday week is quiet)
- Indie Hackers
- Hacker News (Show HN)

### Content Ideas
- Short video walkthrough (30-60 sec screen recording)
- "How I built a party game with AI in a week" blog post
- BOB origin story (Uncle Bob + Claude)
- Screenshots of family playing

### Success Metrics (First Week)
- 100+ brackets played (via Supabase analytics)
- 50+ shared bracket links created
- 10+ custom categories saved
- Feedback submissions from non-family users
