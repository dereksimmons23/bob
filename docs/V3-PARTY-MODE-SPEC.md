# BOB v3 — Party Mode Specification

> Created: December 29, 2025
> Updated: January 1, 2026
> Status: Design Complete, Implementation Pending
> Target: March 1, 2026 (March Madness launch)
> Origin: Christmas Eve 2025 playtesting insights
>
> See also: `MARCH-MADNESS-RELEASE.md` for implementation plan

---

## The Christmas Eve Revelation

**What happened:** BOB v2.8 shipped successfully. Technically flawless. But the family played Hitster and Herd Mentality instead.

**The feedback:** "We played better games tho."

**The insight:** BOB isn't competing with other bracket apps. BOB is competing with party games. And party games have different rules.

---

## Why Hitster & Herd Mentality Won

### What Hitster Does Right
| Element | Why It Works |
|---------|--------------|
| Instant recognition | Song plays → nostalgia hits → no thinking required |
| No setup | Shuffle deck, play |
| Continuous engagement | Everyone guessing every round |
| Physical component | Timeline you build is visible progress |
| Generational chaos | Grandma knows 70s, kids know 2010s |
| Speed | 30 seconds per round max |

**The secret:** You're not voting on abstract preferences. You're triggering memories.

### What Herd Mentality Does Right
| Element | Why It Works |
|---------|--------------|
| Simultaneous decision | Everyone writes at once |
| Social tension | "Am I thinking what everyone's thinking?" |
| Instant payoff | Flip cards, see if you matched |
| Penalty is funny | Pink cow of shame |
| No facilitator needed | Everyone plays simultaneously |
| Speed | 60 seconds per round |

**The secret:** You're not trying to be right. You're trying to think like the group.

### What BOB v2 Does Wrong (For Parties)
| Element | The Problem |
|---------|-------------|
| Setup required | Category, players, maybe entrants |
| Facilitator role | Someone's tallying, not playing |
| Sequential voting | One person engaged at a time |
| Delayed payoff | 15+ matchups before champion |
| Abstract preferences | Not memory-based |
| No simultaneous tension | Not everyone deciding at once |

**The problem:** BOB asks you to manufacture opinions about hypotheticals. Hitster and Herd tap existing memories and social dynamics.

---

## The Two-Game Theory

BOB is trying to be two different games:

### Game A: Tournament Simulator (Current)
- Pick your GOAT
- See how far they go
- Champion gets crowned
- Share the result

**Works for:** Individual play, personal reflection, settling "best ever" debates over time

**Doesn't work for:** Party energy, group dynamics, immediate fun

### Game B: Rapid-Fire Opinion Chaos (Needed)
- Fast decisions
- Immediate reactions
- Group reveals
- Debates erupt naturally

**Works for:** Parties, family gatherings, getting laughs

**Doesn't work for:** Meaningful GOAT debates, careful consideration

**The solution:** BOB needs both modes. Solo Mode (current) + Party Mode (new).

---

## Party Mode: The Mechanics

### 1. Halftime Speech (formerly "Stumping")

**What it is:** 30-second advocacy speech before voting

**How it works:**
```
Matchup: Foo Fighters vs Coldplay

[HALFTIME SPEECH FOR FOO FIGHTERS]
[HALFTIME SPEECH FOR COLDPLAY]
[SKIP TO VOTE]

Derek taps HALFTIME SPEECH FOR FOO FIGHTERS

BOB: "The floor recognizes Derek. 30 seconds. Make it count."

[Timer: 30... 29... 28...]

Derek: "Dear esteemed family: We are not voting on best song.
We are voting on best band. Chris Martin couldn't carry
Dave Grohl's guitar OR drum kit. May The Foo Be With You."

[Timer ends]

BOB: "Compelling. Also possibly slander. The vote proceeds."
```

**Why it works:**
- Performance creates entertainment
- Persuasion adds stakes
- Social pressure is the fun part
- "Hurts a few itty bitty feelings" — that's the spice

**BOB dialogue:**
```javascript
BOB.halftimeOpening = [
  "The floor recognizes you. 30 seconds. Make it count.",
  "You have the floor. Begin your plea.",
  "Halftime speech. Timer starts now.",
  "Make your case. The clock is running.",
  "30 seconds to sway the room. Go."
];

BOB.halftimeClosing = [
  "Compelling. The vote proceeds.",
  "Well argued. Democracy will decide.",
  "Time's up. Let's vote.",
  "That was passionate. Moving on.",
  "The case has been made. Voters, decide."
];
```

---

### 2. Challenge (formerly "Veto")

**What it is:** Secret power to reverse a result

**Key rules:**
- 3 Challenges distributed randomly at game start
- Nobody knows who has them
- Round 1 only (expires after)
- Championship is SACRED — no challenges allowed
- Blowout immunity: 3+ vote margin = no challenge allowed

**How it works:**
```
Vote: Coldplay 7, Foo Fighters 5

[10-second Challenge window]
[Everyone sees the same button]
[Only holders can actually use it]

Derek taps his name
[Phone vibrates — he has a Challenge]

BOB: "Challenge invoked. Result reversed. Foo Fighters advance."

Room: "WHO DID THAT?!"
Derek: [says nothing]
```

**The mystery:**
- You don't know if YOU have a Challenge until you try
- You don't know WHO used a Challenge
- Accusations + speculation = drama

**Why Round 1 only:**
- Prevents exhaustion (max 4 games in 8-entrant bracket)
- Creates "use it or lose it" pressure
- Everything after Round 1 is EARNED

**Why no Championship Challenges:**
- Champion must be legitimate
- Can't steal a title
- The journey matters

---

### 3. Block (formerly "Counter-Veto")

**What it is:** Counter someone's Challenge within 5 seconds

**How it works:**
```
[Challenge invoked]
BOB: "Challenge! Coldplay OUT. Foo Fighters—"

[5-second Block window]
Mom taps her name
[Phone vibrates — she has a Block]

BOB: "Block. The Challenge has been challenged.
      Original result stands. Coldplay advances."

Derek: "MOM."
Mom: [sips wine]
```

**Distribution:**
- 3 Blocks distributed randomly (different people than Challenges)
- 2 people have nothing
- 8 players = 3 Challenges + 3 Blocks + 2 powerless

---

### 4. 3-2-1 Reveal

**What it is:** Simultaneous voting with countdown

**How it works:**
```
BOB: "3... 2... 1... VOTE!"

[Everyone raises hand or taps choice]
[Facilitator counts]

BOB: "Pepperoni 7, Pineapple 5. Pepperoni advances."
```

**Why it works:**
- Creates Herd Mentality tension
- Everyone engaged simultaneously
- The reveal is the moment

---

### 5. Blowout Immunity

**What it is:** Decisive victories can't be Challenged

**The rule:** If margin is 3+ votes, no Challenge window appears

**BOB dialogue:**
```javascript
BOB.blowoutImmunity = [
  "That wasn't close. Challenge window: cancelled.",
  "Margin too large. Democracy stands.",
  "Statement win. No Challenge can save you now.",
  "The people have spoken decisively."
];
```

**Why it works:**
- Protects dominant picks
- Makes Challenges tactical (save for close games)
- Feels fair

---

### 6. Upset Windows

**What it is:** Underdog victories get extended Challenge time

**The rule:** If lower seed wins, Challenge window is 20 seconds (not 10)

**BOB dialogue:**
```javascript
BOB.upsetWindow = [
  "Upset alert. Extended Challenge window. 20 seconds.",
  "The underdog won. This result will be scrutinized.",
  "Cinderella moment. Extra time for the favorite to respond."
];
```

**Why it works:**
- March Madness energy — upsets SHOULD be questioned
- More drama on unexpected results
- If no one Challenges in 20 seconds, the upset is LEGENDARY

---

## The Full Flow (Party Mode)

```
SETUP:
- Pick category
- Enter player names
- BOB secretly assigns 3 Challenges + 3 Blocks
- BOB: "Powers distributed. Only you'll know if you have one."

EACH MATCHUP:

1. OPTIONAL: Halftime Speech (30 sec)
   - Anyone can advocate for either side
   - Unlimited speeches (but make them count)

2. VOTE: 3-2-1 Countdown
   - Everyone raises hand or taps
   - Facilitator tallies
   - Lock in result

3. BOB CHECKS MARGIN:
   - If 3+ votes: "Decisive. Moving on." (no Challenge)
   - If close: Challenge window opens

4. CHALLENGE WINDOW (if margin < 3):
   - Standard: 10 seconds
   - Upset: 20 seconds
   - First tap wins
   - If used → Block window opens

5. BLOCK WINDOW (if Challenge used):
   - Standard: 5 seconds
   - Upset: 10 seconds
   - If used → original result stands

6. WINNER ADVANCES
   - BOB announces
   - Next matchup

END OF ROUND 1:
- BOB: "Round 1 complete. X Challenges used. Y Blocks used.
        All remaining powers have expired."

CHAMPIONSHIP:
- No Challenges allowed
- Pure democracy
- BOB: "The championship is sacred. The people decide."
```

---

## The Figure Skating Insight

> "I've turned March Madness into figure skating."

**March Madness:** Pure meritocracy. Better team wins (mostly). Bracket records what happened.

**Figure Skating:** Judged competition. Performance matters. Subjective scoring. Politics influence results.

**BOB Party Mode:** Opinion expression + advocacy + secret power + judged outcomes.

This isn't a bug. It's the feature.

- **March Madness clone:** Challonge already exists
- **Figure Skating bracket:** Nobody's built this

BOB Party Mode is **RISK meets WEREWOLF meets MARCH MADNESS**.

---

## Naming: Sports Energy, Not Senate Energy

| Political Term | Sports Term | Why Better |
|----------------|-------------|------------|
| Veto | **Challenge** | Everyone knows this from sports |
| Counter-Veto | **Block** | Basketball energy |
| Stumping | **Halftime Speech** | Timeouts, locker rooms, rallying |
| Blowout Immunity | **Blowout** | Self-explanatory |

BOB should sound like ESPN, not C-SPAN.

---

## Category Strategy

### Categories That Work for Parties
- **Food & Drink** — Everyone has opinions, visceral memories
- **Music** — Nostalgia triggers, generational debates
- **Movies & TV** — Shared experiences
- **Holidays** — Strong traditions, family-specific

### Categories That DON'T Work for Parties
- **Best Olympic Sport** — Too abstract
- **Best Mythical Creature** — No personal stake
- **Best Superpower** — Hypothetical, no lived experience

**The pattern:** Good categories trigger personal memories and strong existing opinions. Bad categories require hypothetical thinking.

---

## Implementation Priorities

### v2.9 NYE 2025 (SHIPPED)
- [x] 3-2-1 countdown reveal
- [x] Simultaneous voting UX (raise hands, single device counts)
- [x] Feature NYE categories prominently

### v3.0 March Madness (Target: March 1, 2026)
- [ ] Halftime Speech (30-sec timer)
- [ ] Challenge system (secret distribution, Round 1 only)
- [ ] Block system
- [ ] Blowout immunity (3+ margin)
- [ ] Upset windows (extended Challenge time)
- [ ] Party Mode toggle in settings
- [ ] March Madness category theme

### v3.5 (Summer 2026)
- [ ] Multi-device voting (everyone on their own phone)
- [ ] Live vote tally streaming
- [ ] QR code room join
- [ ] Bob personalities

### v4.0 (Voice-First, TBD)
- [ ] BOB speaks all announcements
- [ ] Voice recognition for voting
- [ ] AI-driven Challenge/Block commentary

---

## Success Metrics

**Party Mode works when:**
- People use Halftime Speeches without prompting
- "WHO CHALLENGED THAT?!" gets shouted
- Debates erupt after Blocks
- Someone references the game the next day
- It competes with Hitster/Herd Mentality

**Party Mode fails when:**
- People skip speeches because they're awkward
- Challenges feel arbitrary or annoying
- The game drags
- People check their phones during matchups
- They'd rather play something else

---

## The Philosophy

> "The bracket isn't the game. The bracket is the STAGE for the game."

Before Party Mode:
- Bracket = container for opinions
- Voting = expressing opinions
- Champion = aggregated opinion
- Memorability: "We played a bracket game"

After Party Mode:
- Bracket = stage for competition
- Voting = influenced by performance
- Halftime Speech = persuasion layer
- Challenge = power layer
- Block = counter-power layer
- Mystery = intrigue layer
- Champion = survivor of chaos
- Memorability: "Remember when Derek Challenged after THAT speech?"

---

## Appendix: BOB Dialogue Additions

```javascript
// Halftime Speech
BOB.halftimeOpening = [
  "The floor recognizes you. 30 seconds. Make it count.",
  "You have the floor. Begin your plea.",
  "Halftime speech. Timer starts now.",
  "Make your case. The clock is running."
];

BOB.halftimeClosing = [
  "Compelling. The vote proceeds.",
  "Well argued. Democracy will decide.",
  "Time's up. Let's vote.",
  "That was passionate. Moving on."
];

// Challenge
BOB.challengeUsed = [
  "Challenge invoked. Democracy pauses.",
  "Override detected. Result reversed.",
  "A Challenge. Someone used their secret power.",
  "Challenge activated. The people have been overruled."
];

// Block
BOB.blockUsed = [
  "Block. The Challenge has been Challenged. Democracy restored.",
  "Override overridden. We've come full circle.",
  "The Challenge was Blocked. Original result stands.",
  "Block activated. Chaos neutralized."
];

// Blowout Immunity
BOB.blowoutImmunity = [
  "Margin too large. Challenge window: cancelled.",
  "That wasn't close. Democracy stands.",
  "Statement win. No Challenge can save you now.",
  "The people have spoken decisively."
];

// Upset Windows
BOB.upsetWindow = [
  "Upset alert. Extended Challenge window. 20 seconds.",
  "The underdog won. This result will be scrutinized.",
  "Cinderella moment. Extra time for the favorite to respond."
];

// Championship Sacred
BOB.championshipSacred = [
  "We've reached the championship. Challenges are suspended. The people decide.",
  "The finals are sacred. No Challenges. Democracy crowns the champion.",
  "Championship round. No overrides. May the best entrant win."
];

// Round 1 Complete
BOB.round1Complete = [
  "Round 1 complete. All Challenges and Blocks have expired.",
  "First round chaos is over. Everything from here is earned.",
  "Powers expired. The remaining rounds are pure competition."
];
```

---

## v3.5: Invite Links & Multi-Device (Jackbox-Style)

> Added: December 29, 2025
> Updated: January 3, 2026 — Christmas vacation use case

### The Jackbox Inspiration

**What Jackbox.tv does right:**
- One person hosts on a TV/laptop
- Everyone else joins on their phones via simple URL
- Room code gets you in instantly
- Simultaneous voting/input from all players
- Results revealed together on the main screen

**The BOB version:**
```
DINNER TABLE SCENARIO:
"Where should we go for Christmas 2026 vacation?"

Derek: "Let's BOB it."
→ Opens bob.claudewill.io
→ Picks "Tropical Vacation" category (or creates custom)
→ Taps "Start Party Game"
→ Gets room code: BOB-7X4K
→ Shares code to family group chat

Everyone else:
→ Goes to bob.claudewill.io/join
→ Enters BOB-7X4K
→ Joins as "Mom", "Dad", "Sarah", etc.

Gameplay:
→ Derek's phone shows the bracket (or cast to TV)
→ Matchup appears: "Puerto Rico vs Belize"
→ Everyone votes on their OWN phone
→ "3... 2... 1... REVEAL!"
→ Votes appear simultaneously
→ "Puerto Rico advances 4-2!"
→ Next matchup...

Result:
→ Champion: Dominican Republic
→ Everyone saw the journey
→ Decision made, no one to blame
```

### Real Use Cases That Sparked This

1. **Christmas 2026 Vacation** (Jan 2026 dinner): Families discussing tropical destinations. Should've used BOB to vote together.

2. **Dream Job Clarity** (Jan 2026): Derek used a solo custom bracket to think through career paths. Could work for couples deciding together.

3. **Family Game Night Pick**: Instead of "what does everyone want to play?" → run a quick bracket.

### The Two-Screen Experience

**HOST DEVICE (TV or shared screen):**
- Shows current matchup
- Displays bracket progress
- Reveals vote results with drama
- BOB commentary visible to all

**PLAYER DEVICES (everyone's phone):**
- Simple voting interface
- Just the two choices
- Big tap targets
- Vote submitted → waiting animation
- Challenge/Block buttons (if applicable)

### What This Solves

| Problem | Solution |
|---------|----------|
| Facilitator tallying | Everyone votes on own device |
| Sequential voting | True simultaneous 3-2-1 countdown |
| Public votes | Secret votes until reveal |
| Challenge buttons awkward | Everyone taps on their own device |
| Room-bound | Could play remotely (Zoom holiday call!) |
| "Who wants to vote?" friction | Everyone's already holding their phone |

### Technical Stack (Already Have It)

- Supabase real-time subscriptions
- Game state in database
- Invite links with game_id
- Join flow exists (just needs UI)

### UX Flow

**Starting a Game:**
```
1. Home Screen → "Party Game" button
2. Pick category (or custom)
3. Configure: entrant count, party mode on/off
4. → Room created: "BOB-7X4K"
5. Show QR code + room code + shareable link
6. Wait for players to join (show who's in)
7. Host taps "Start Game" when ready
```

**Joining a Game:**
```
1. bob.claudewill.io/join
2. Enter room code: BOB-7X4K
3. Enter your name: "Mom"
4. Wait for host to start
5. (Or scan QR code → auto-fills room code)
```

**During a Matchup:**
```
HOST SCREEN:          PLAYER PHONE:
┌─────────────────┐   ┌───────────────┐
│  MATCHUP 3/15   │   │    VOTE!      │
│                 │   │               │
│  [HAWAII]       │   │  ┌─────────┐  │
│     vs          │   │  │ HAWAII  │  │
│  [BELIZE]       │   │  └─────────┘  │
│                 │   │               │
│  Waiting for    │   │  ┌─────────┐  │
│  votes...       │   │  │ BELIZE  │  │
│  4/6 voted      │   │  └─────────┘  │
└─────────────────┘   └───────────────┘
```

**Vote Reveal:**
```
HOST SCREEN:
┌─────────────────────────────────┐
│        3... 2... 1...           │
│                                 │
│  HAWAII        ████████ 5      │
│  BELIZE        ██████ 3        │
│                                 │
│  "Hawaii advances! Pack your   │
│   sunscreen and your opinions."│
│                                 │
│       [NEXT MATCHUP →]          │
└─────────────────────────────────┘
```

### URL Format

```
bob.claudewill.io/join?code=BOB-7X4K
bob.claudewill.io/play/BOB-7X4K  (players)
bob.claudewill.io/host/BOB-7X4K  (host view)
```

Room codes: `BOB-XXXX` (4 characters, alphanumeric, easy to say aloud)

### Database Schema Addition

```sql
-- Party game sessions
CREATE TABLE party_games (
  id UUID PRIMARY KEY,
  room_code VARCHAR(8) UNIQUE NOT NULL,  -- "BOB-7X4K"
  host_device_id UUID NOT NULL,
  category_name TEXT NOT NULL,
  entrants JSONB NOT NULL,
  current_matchup_index INT DEFAULT 0,
  game_state JSONB,  -- bracket, results
  status VARCHAR(20) DEFAULT 'waiting',  -- waiting, playing, finished
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ  -- auto-cleanup
);

-- Players in a party game
CREATE TABLE party_players (
  id UUID PRIMARY KEY,
  game_id UUID REFERENCES party_games(id),
  device_id UUID NOT NULL,
  display_name VARCHAR(20) NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- Votes (real-time)
CREATE TABLE party_votes (
  id UUID PRIMARY KEY,
  game_id UUID REFERENCES party_games(id),
  matchup_index INT NOT NULL,
  player_id UUID REFERENCES party_players(id),
  vote VARCHAR(100) NOT NULL,  -- entrant name
  voted_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Priority:** High — this unlocks the full v3 vision and is the path to Jackbox-level party energy

---

## v3.5: Bob Personalities

> Added: December 29, 2025

### Why Rename "Salty/Spicy Bob"

| Old Name | Problem |
|----------|---------|
| Salty Bob | Sounds passive-aggressive |
| Spicy Bob | Sounds like a menu item |
| **Bad-A** Bob** | Sounds like a personality choice |

### The B-Word Bob Lineup

| Personality | Vibe | Example Line |
|-------------|------|--------------|
| **Classic Bob** | Deadpan, measured (default) | "The people have spoken." |
| **Bad-A** Bob** | Sharp, roasts, no mercy | "That's what you chose? Alright." |
| **Bold Bob** | Takes strong stances | "Pepperoni is obviously superior. I don't make the rules." |
| **Bitter Bob** | Passive-aggressive | "Pineapple won. Again. As if that makes it right." |
| **Boisterous Bob** | Loud energy | "THE CROWD GOES WILD! By crowd I mean six of you!" |
| **Bored Bob** | Deeply unimpressed | "Another food bracket. Riveting." |
| **Benevolent Bob** | Kind, encouraging | "What a thoughtful vote. Both should be proud." |
| **British Bob** | Dry UK wit | "Quite the upset, that. Proper shocker." |
| **Brooklyn Bob** | NYC attitude | "Youse guys really voted for Coldplay? Get outta here." |
| **Bookish Bob** | Intellectual, verbose | "The dialectic between pizza toppings reveals much about late-stage capitalism." |
| **Bewildered Bob** | Confused by everything | "Wait, what? How did that win? I don't even know anymore." |
| **Belligerent Bob** | Actively combative | "That vote was WRONG. Someone had to say it." |

### Personality Selection UI

```
┌─────────────────────────────────┐
│  Bob's Personality:             │
│  ○ Classic Bob (default)        │
│  ○ Bad-A** Bob                  │
│  ○ Wholesome Bob                │
│  ○ Bewildered Bob               │
│  ○ British Bob                  │
│  ○ Brooklyn Bob                 │
│  ○ Surprise Me (random)         │
│                                 │
│  ☐ Change personality each round│
└─────────────────────────────────┘
```

### Dynamic Personality Shifts (Optional Mode)

Mood shifts based on game events:
- Close game → Bewildered Bob
- Blowout → Bad-A** Bob
- Upset → Bitter Bob (if favorite lost)
- Championship → Bold Bob

### Implementation: Dialogue Structure

**Current:**
```javascript
BOB.normal = [
  "The people have spoken.",
  "Moving on.",
];
```

**With Personalities:**
```javascript
BOB.normal = {
  classic: [
    "The people have spoken.",
    "Moving on."
  ],
  badass: [
    "That's what you chose? Alright. Moving on.",
    "Democracy in action. Questionable action, but action."
  ],
  wholesome: [
    "What a thoughtful decision! Well done, everyone.",
    "Both entrants gave it their all. Onto the next!"
  ],
  bewildered: [
    "Okay. Sure. That happened. Next?",
    "I guess we're doing this. Moving on, I suppose."
  ],
  british: [
    "Right then. Sorted. Moving along.",
    "The voters have had their say. Onwards."
  ],
  brooklyn: [
    "Aight, we got a winner. Let's keep it movin'.",
    "There it is. Next up."
  ]
};
```

**Function:**
```javascript
function getBobLine(context, personality) {
  return BOB[context][personality][random()];
}
```

### Storage

Per-user preference:
```javascript
localStorage.setItem('bob-personality', 'badass');
```

Or per-game:
```javascript
gameState.bobPersonality = 'bewildered';
```

---

## Updated Roadmap

| Version | Target | Focus | Key Features |
|---------|--------|-------|--------------|
| **v2.9** | Dec 2025 | NYE Edition (SHIPPED) | 3-2-1 countdown, bigger buttons, NYE theme |
| **v3.0** | Mar 1, 2026 | Party Mode | Challenge, Block, Halftime Speech, Blowout immunity |
| **v3.5** | Summer 2026 | Multi-Device | Invite links, real-time sync, Bob personalities |
| **v4.0** | TBD | Voice-First | BOB speaks, voice recognition, AI commentary |

---

## Final Note

> "Delicious and dumb are not mutually exclusive."

The McRib is delicious and dumb. Las Vegas is delicious and dumb. Professional wrestling is delicious and dumb. Figure skating is delicious and dumb.

BOB Party Mode: People defending pizza toppings. Anonymous Challenges. Mystery about who has power. Everyone arguing about results. Families playing.

Same energy. Different stakes. Both delicious. Both dumb.

Ship it.
