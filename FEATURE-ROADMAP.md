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

### 🔲 Olympics Categories
**Status:** Designed, not yet added to app

- Winter Olympics Events (16 entrants)
- Summer Olympics Events (16 entrants)  
- All Olympics Combined (32 entrants)

**Implementation:** Add to category library data structure in index-v2.html

### 🔲 Vote Correction / Undo
**Status:** Not built

Options discussed:
- Undo button after each matchup (~5 seconds)
- "Wait, go back" visible during next matchup
- Review screen at end of each round

**Recommendation:** Undo button with 5-second window

### 🔲 Bracket Visualization
**Status:** Not built

Options discussed:
- Mini bracket at top showing progression
- "View Full Bracket" button with tree view
- Round summary between rounds
- Final bracket recap at champion screen

**Challenge:** Mobile-friendly full bracket is tricky

**Recommendation:** Start with round summary screens

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
| **Ad-supported** | Free for users | Disrupts party vibe |
| **Corporate licensing** | High value per sale | Different audience |
| **Tip jar / Donate** | Goodwill | Unpredictable |

**Current recommendation:** Free with optional tip jar. Monetize corporate version if demand emerges.

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

## Christmas Eve Checklist

**Must have:**
- [x] Working bracket flow
- [x] Quick start with presets
- [x] BOB personality
- [x] Share results
- [x] Sound toggle
- [ ] Olympics categories added

**Nice to have:**
- [ ] Vote correction
- [ ] Basic bracket visualization

**Not needed for debut:**
- Social features
- Multi-language
- Corporate version
