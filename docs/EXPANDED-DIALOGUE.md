---
Created: December 6, 2025
Version: v1
Project: Battle o Brackets
Context: Uncle BOB dialogue expansion (50+ new lines for v2.5)
Status: Ready for Integration
Confidentiality: Internal
Related: BOB-CHARACTER-BIBLE.md, VOICE-STRATEGY.md
Target Location: /Users/dereksimmons/Desktop/bob/
Format Rationale: Organized by context/mood for easy search & rotation in code
---

# Expanded BOB Dialogue — v2.5 Sprint

## Overview

**Current state:** ~40 existing dialogue lines (in index.html BOB object)
**Target:** +50 new lines organized by category and emotional context
**Goal:** Eliminate repetition in single-session brackets, maintain personality consistency

**Integration approach:**
- Add NEW arrays to BOB object (don't replace existing)
- Implement rotation system (track used lines, cycle through unused)
- Keep all lines ≤2 sentences, deadpan delivery

---

## 1. EXPANDED CATEGORY OPENERS (8 new lines per category)

### Food (8 new)
- "Food bracket. I've started wars over less."
- "Eating preferences as a sport. This is America."
- "Let the great taste debate begin. Spoiler: everyone's wrong but you."
- "Food. The most personal category. Also the most divisive."
- "You're about to discover which family members have terrible taste."
- "Culinary battle royale. Bon appétit. Or don't."
- "Food opinions. The gateway to family drama."
- "A edible bracket. My stomach approves. Your palate's on trial."

### Music (8 new)
- "Music bracket. Spotify Wrapped just got personal."
- "The greatest hits. According to you people. We'll see about that."
- "Musical opinions incoming. Your teenage self is judging current you."
- "The songs that defined your life. Or regrettably didn't."
- "Playlist wars. The soundtrack to family tensions."
- "Music tastes. Where wrong answers go to die. Yours included, probably."
- "I've seen relationships end over less than this bracket."
- "Time to find out whose 'good music' everyone actually respects."

### Movies & TV (8 new)
- "Entertainment bracket. Your viewing history is about to be judged."
- "Movies and TV. The great divider between comfort and culture."
- "Streaming arguments made official. Let's crown a champion."
- "Film and television. Where nostalgia meets critical thinking. Good luck."
- "The entertainment you'll defend forever. Starting now."
- "Your taste in shows is about to be exposed. Brace yourself."
- "Drama in the bracket. Ironic, considering the category."
- "Movies and TV. Comfort picks vs. respect. Which wins?"

### Sports (8 new)
- "Sports bracket. Childhood teams vs. current reality. May the better memory win."
- "Athletic opinions. Where stats meet heart. Usually heart loses."
- "Sports. The one arena where being wrong is a lifestyle."
- "Team loyalties about to be tested. Betrayals incoming."
- "Sports debates. Why families practice civil war strategies."
- "The athletic showdowns that actually matter to nobody, which is why they matter."
- "Sports. Where nostalgia is a full-time job."
- "Competitive debates about competitive sports. Meta. I like it."

### Games (8 new)
- "Gaming bracket. Time to settle arguments your parents don't understand."
- "Video games. Board games. The stakes are eternal."
- "Game nights made official. Friendships will be tested."
- "Gaming. Where reflexes meet strategy. Also rage quits."
- "Games that defined entire generations. Time to rank them."
- "The games you've lost sleep over. Now make them fight."
- "Gaming opinions. Undefeated in being divisive."
- "Games. Where everyone's an expert. No one agrees."

### Random (8 new)
- "Random category. The chaos council approves."
- "Absurdity time. This is where decisions get weird."
- "Pure chaos bracket. My kind of energy."
- "Random selections. Where logic goes to sit in the corner."
- "Wildcard category. Anything's possible. Everything's weird."
- "Non-standard topic. I respect the audacity."
- "Completely random. I wouldn't have it any other way."
- "Off-the-wall bracket. These are my favorite."

### Holidays & Seasons (8 new)
- "Holiday bracket. Family trauma officially sanctioned."
- "Seasonal preferences. How to divide a family in one bracket."
- "Holiday opinions. Where memories meet resentment."
- "Seasonal warfare. Every family's favorite tradition."
- "Holiday takes. Some of you are about to regret this."
- "Seasons and holidays. Nostalgia mixed with judgment."
- "Traditions ranked. Prepared for disagreement?"
- "Holiday bracket. Love, family, and petty divisions."

### Olympics (8 new)
- "Olympic events. The global stage. Your opinion matters. Or doesn't. IOC doesn't care."
- "Sports of the world. Which one deserves the podium?"
- "Olympic glory. Your vote will determine history. Or nothing. Probably nothing."
- "International athletics. Where nationalism meets sportsmanship. Spoiler: nationalism wins."
- "The Games. Decades of athletic tradition. Ranked by you."
- "Olympic events. Four years of waiting. Settled in minutes."
- "World stage, family votes. Low stakes, high drama."
- "Global sports ranked by local opinion. What could go wrong?"

---

## 2. EXPANDED MATCHUP COMMENTARY (12 new lines per context)

### Food Commentary (12 new)
- "Which one fuels your 2 AM regrets?"
- "Close your eyes. Feel the calories."
- "Think about cravings. Think about guilt. Choose wisely."
- "If you could only eat one forever, which?
- "The late-night test. Heating up or heating down?"
- "Nostalgic taste vs. current craving. Old self vs. new self."
- "Which memory tastes better?"
- "Temperature test: cold or hot? Your answer reveals everything."
- "Saturday morning or midnight snack? Know thyself."
- "One is pure indulgence. One is almost respectable. Pick."
- "The hunger test: which satisfies completely?"
- "Taste vs. guilt. Which one wins in your head?"

### Music Commentary (12 new)
- "Which one gets the car karaoke vote?"
- "Road trip soundtrack or confession booth song?"
- "Years later, which do you still respect?"
- "The shower singing test. Which one?"
- "Gym playlist or breakup album?"
- "Which one defined an era of your life?"
- "Concert or comfort listen?"
- "Teenage you or current you — which picks which?"
- "Which artist had the better reign?"
- "Genuine bop or guilty pleasure? Both? Neither?"
- "The one that changed your taste in music. Or tried."
- "Which gets the all-caps FAN vote?"

### Movies Commentary (12 new)
- "Rewatchable comfort or respect-worthy once?"
- "Which one owns your movie night?"
- "Nostalgia or legitimately good?"
- "The test: would you watch it on a plane?"
- "Cultural moment or just good fun?"
- "Which director would you trust more?"
- "The cinematography test. Which holds up?"
- "Guilty pleasure or guilty genius?"
- "Which one gets the age-appropriate rewatch?"
- "Streaming or theater? Which demands what?"
- "The dialogue test: remember the lines?"
- "Which one changed how you see film?"

### Sports Commentary (12 new)
- "Current team or all-time great?"
- "Stats or legacy. Which actually wins?"
- "The clutch moment test. Who delivers?"
- "Championship or consistency?"
- "Draft pick or development success?"
- "Historical dominance or modern excellence?"
- "Peak years or longevity?"
- "The underdog story or the dynasty?"
- "One-season wonder or generational talent?"
- "Trade decision. Who'd you rather have?"
- "The comeback test. Which one wins?"
- "Home team or actual talent?"

### Games Commentary (12 new)
- "Replayability or story?"
- "Nostalgia or current-gen quality?"
- "Competitive or casual vibes?"
- "Solo or multiplayer mastery?"
- "Difficulty or accessibility?"
- "Innovation or perfection of formula?"
- "Hours sunk or hours well-spent?"
- "Speedrun or 100% completion?"
- "Graphics or gameplay?"
- "Franchise favorite or best entry?"
- "Cult classic or mainstream hit?"
- "The one you'd teach someone new?"

---

## 3. EXPANDED RESULT REACTIONS (16 new lines total)

### Blowout Reactions — NEW (4 new)
- "That wasn't close. It was a statement."
- "One side got embarrassed. The other got validated."
- "The gap was astronomical. Advance with confidence."
- "That margin was less a result, more a judgment."

### Close Reactions — NEW (4 new)
- "One vote. Democracy in its purest, pettiest form."
- "The people nearly went the other way. But didn't."
- "That was as close as it gets. Still, decisive."
- "Photo finish energy. Winner takes all. Barely."

### Normal Reactions — NEW (4 new)
- "The consensus has spoken. Moving along."
- "Clear winner. No asterisks needed."
- "Democracy didn't dwell on that one."
- "The people knew what they wanted. Let's respect it."

### Tie Reactions — EXTENDED (4 new, beyond existing 8)
- "Equal votes. Unequal stakes. Call someone. NOW."
- "Perfect deadlock. I don't negotiate with ties."
- "The voters have split themselves into a corner."
- "Tied at [X]-[X]. Fascinating. Also problematic. Call."

---

## 4. CHAMPIONSHIP MOMENTS (12 new lines)

### Championship Setup (4 new)
- "We've eliminated the weak. Now the strong face each other."
- "Everything filtered down to these two. No mercy."
- "The final battle. Two entrants. One crown."
- "Thousands died (bracket-wise) for this moment."

### Champion Victory (4 new)
- "Crowned. Documented. Eternal."
- "The people have spoken their final word."
- "Legacy locked in. History made. Moving on."
- "Your champion. Controversial? Maybe. Final? Absolutely."

### Post-Victory Commentary (4 new)
- "The Vault now holds another champion. Congratulations."
- "You did this. You made this choice. Forever."
- "Bracket complete. Legacy uncertain. But official."
- "One name. One moment. One bracket. Forever connected."

---

## 5. PERSONALITY MOMENTS (10 new lines — pure BOB energy)

### Impatience (3 new)
- "We've got other brackets to run. Let's move."
- "I've got all night, but I'd rather not use it."
- "Speed's not slowing us down. Indecision is. Vote."
- "The clock's my enemy. Your hesitation's mine."

### Deadpan Commentary (4 new)
- "That's... a choice."
- "Interesting. Also wrong, probably."
- "I've seen worse decisions. Not recently, but I have."
- "The voters have chosen wisdom. Or chaos. Time will tell."

### Slight Confusion (3 new)
- "I wasn't expecting that. Should've been."
- "Well. That was not the obvious path."
- "Surprising. Though I've learned not to be."

---

## 6. STRUCTURAL COMMENTARY (8 new lines)

### Play-In Energy (2 new)
- "Play-in games. The losers' bracket nobody asked for."
- "Not everyone advances. The weak are eliminated first. Democratically."

### Bye Reactions (2 new)
- "Some of you get byes. Congratulations, I guess."
- "Automatic advancement. The lottery of bracket math."

### Massive Brackets (2 new)
- "That many entrants. You people really thought big."
- "A bracket of biblical proportions. Let's see if it holds."

### Small Brackets (2 new)
- "Four entrants. Cozy. Efficient. Quick."
- "Boutique bracket. Just the essentials."

---

## 7. SURPRISE ME / RANDOM SELECTIONS (6 new)

- "Chaos bracket selected. Expect the unexpected."
- "Random category unlocked. Let's see what fate demands."
- "Surprise mode active. No refunds, no takebacks."
- "Randomness deployed. The gods have spoken."
- "Complete chaos incoming. I approve."
- "Fate made a choice for you. Live with it."

---

## 8. QUICK START REACTIONS (4 new)

- "Preset category. No time for setup. I respect the efficiency."
- "Quick start engaged. Let's move this along."
- "Preset picked. No deliberation needed. I like your style."
- "You know what you want. Rare quality. Let's bracket."

---

## 9. TIE-BREAKER DRAMA (8 new)

### Tie Announced (4 new, beyond existing 8)
- "A tie. Democracy has frozen."
- "Equal votes mean no vote. Call someone. They're the oracle."
- "Deadlocked. No consensus. External intervention required."
- "The voters are split 50/50. One of you needs to fix this."

### Tie Resolved (4 new, beyond existing 8)
- "The oracle has ruled. We continue."
- "Outside judgment made. Let's respect it and move on."
- "Tie-breaker submitted. Proceeding with authority."
- "Third-party verdict rendered. Advancing with confidence."

---

## 10. BOB LIFE ADVICE (6 new — personality depth)

### Apropos of Nothing (6 new)
- "You people know brackets are just opinions, right?"
- "In the end, none of this matters. But that's the fun of it."
- "Democracy is chaos organized into entertainment. You're welcome."
- "You're all wrong. Also right. Also passionate. It's enough."
- "Here's the thing about brackets: the real winner is the memories."
- "Family drama formalized. Peak human entertainment."

---

## Integration Strategy for Code

### Current BOB object structure:
```javascript
const BOB = {
  welcome: [...],
  categoryOpeners: { food: [...], music: [...], ... },
  matchupIntros: [...],
  matchupCommentary: { food: [...], music: [...], ... },
  blowout: [...],
  close: [...],
  normal: [...],
  tie: [...],
  tieInstructions: [...],
  tieResolved: [...],
  championshipIntro: [...],
  champion: [...],
  // NEW:
  categoryOpenersExpanded: { food: [...8], music: [...8], ... },
  matchupCommentaryExpanded: { food: [...12], music: [...12], ... },
  blowoutExpanded: [...4],
  closeExpanded: [...4],
  normalExpanded: [...4],
  tieExpanded: [...4],
  championshipSetup: [...4],
  championVictory: [...4],
  postVictoryCommentary: [...4],
  personalityMoments: {
    impatience: [...],
    deadpan: [...],
    confusion: [...],
  },
  structuralCommentary: { playIns: [...], byes: [...], ... },
  surpriseMe: [...6],
  quickStart: [...4],
  tieResolved: [...4],
  bobAdvice: [...6],
};
```

### Rotation system pseudo-code:
```javascript
const usedLines = new Set(); // Track lines used in current session

function getRotatedLine(arrayName) {
  const array = BOB[arrayName];
  const available = array.filter(line => !usedLines.has(line));
  
  if (available.length === 0) {
    usedLines.clear(); // Reset rotation
    available = array;
  }
  
  const line = available[Math.floor(Math.random() * available.length)];
  usedLines.add(line);
  return line;
}

// Usage in matchup:
const reaction = getRotatedLine('blowout'); // or 'blowoutExpanded'
```

---

## Testing Checklist

- [ ] Each category has 8 new openers (not 6)
- [ ] Dialogue feels authentic to Uncle Bob (dry, measured, clear)
- [ ] No line exceeds 2 sentences
- [ ] No exclamation points except championship
- [ ] Rotation system prevents repeats in single bracket
- [ ] New lines integrate seamlessly with existing
- [ ] Voice compatibility tested (reads naturally aloud)

---

## Notes

**Total new lines:** 50+
**Organized by:** Category, mood, context, use case
**Format:** Ready to paste into BOB object
**Tone:** Consistent with existing (deadpan, impatient warmth, Irish goodbye energy)
**Integration difficulty:** Low (just add arrays, implement rotation)

**Next phase:** Integrate into index.html, test with voice, refine based on playtest feedback.
