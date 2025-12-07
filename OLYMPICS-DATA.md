---
Created: December 6, 2025
Version: v1
Project: Battle o Brackets
Context: Olympics event data for category expansion
Status: Ready for Integration
Confidentiality: Internal
Related: CATEGORY-LIBRARY.md, FEATURE-ROADMAP.md
Target Location: /Users/dereksimmons/Desktop/bob/
---

# Olympics Data — v2.5 Expansion

## Overview

Three new Olympic categories for Battle o Brackets:
- **Summer Olympics Events** (16 events)
- **Winter Olympics Events** (12 events)
- **All Olympics Events** (28 events combined)

Uses canonical IOC event lists (2024 Paris Summer, 2022 Beijing Winter) to ensure accuracy and family recognition.

---

## Summer Olympics Events (16)

**Context:** Most recognizable globally. Strong nostalgia + recent memory for 2024 Paris Olympics.

**Entrants:**
1. Track & Field (Athletics)
2. Swimming
3. Gymnastics
4. Basketball
5. Soccer (Football)
6. Tennis
7. Volleyball
8. Diving
9. Rhythmic Gymnastics
10. Badminton
11. Table Tennis
12. Rowing
13. Weightlifting
14. Boxing
15. Archery
16. Cycling (Road/Track)

**Alternative additions if you want 20:**
- Water Polo
- Surfing
- Skateboarding
- Breaking (Dance)
- Skateboarding

**BOB's Context:**
- Focus on "Which would you actually wake up at 3 AM to watch?"
- Gymnastics will dominate (predictable, dramatic)
- Swimming is the old reliable (Phelps nostalgia)
- Tennis & Basketball are "people recognize these"
- Niche sports (Table Tennis, Badminton) create chaos

---

## Winter Olympics Events (12)

**Context:** Smaller event pool = tighter, more competitive bracket. Strong character divisions (speed vs. grace).

**Entrants:**
1. Figure Skating
2. Alpine Skiing
3. Snowboarding (Halfpipe/Slopestyle)
4. Ice Hockey
5. Speed Skating (Short Track)
6. Speed Skating (Long Track)
7. Cross-Country Skiing
8. Ski Jumping
9. Bobsled
10. Curling
11. Freestyle Skiing (Aerials)
12. Biathlon

**Why 12 (not 16):**
- Winter Olympics has smaller event pool
- 12 is a perfect bracket size (plays in/byes work cleanly)
- Avoids bloat; keeps Winter tight

**BOB's Context:**
- "Figure Skating vs. Hockey" is THE divide (grace vs. grit)
- Curling will get memed
- Bobsled has underdog energy
- Biathlon is "forgotten but interesting"
- Ski Jumping is pure spectacle

---

## All Olympics Events (28 — Summer + Winter Combined)

**Context:** For users who want everything. Summer + Winter merged for "ultimate Olympics debate."

**Entrants:**

### Summer (16)
1. Track & Field (Athletics)
2. Swimming
3. Gymnastics
4. Basketball
5. Soccer (Football)
6. Tennis
7. Volleyball
8. Diving
9. Rhythmic Gymnastics
10. Badminton
11. Table Tennis
12. Rowing
13. Weightlifting
14. Boxing
15. Archery
16. Cycling (Road/Track)

### Winter (12)
17. Figure Skating
18. Alpine Skiing
19. Snowboarding (Halfpipe/Slopestyle)
20. Ice Hockey
21. Speed Skating (Short Track)
22. Speed Skating (Long Track)
23. Cross-Country Skiing
24. Ski Jumping
25. Bobsled
26. Curling
27. Freestyle Skiing (Aerials)
28. Biathlon

**Why Combined?**
- "Which Olympic sport is objectively the best?"
- Forces Summer vs. Winter debates
- Gymnastics vs. Figure Skating energy
- Basketball vs. Ice Hockey
- Creates family chaos

**Bracket Math:**
- 28 entrants = 14 play-in games + 14 byes
- 4 rounds to champion
- 27 total matchups
- ~45 min gameplay (long bracket)

---

## Code Integration

### Format for `index.html` CATEGORY_LIBRARY update:

```javascript
olympics: {
  name: "Olympics",
  icon: "🏅",
  color: "#00a8e8",
  categories: [
    {
      name: "Summer Olympics Events",
      entrants: [
        "Track & Field",
        "Swimming",
        "Gymnastics",
        "Basketball",
        "Soccer",
        "Tennis",
        "Volleyball",
        "Diving",
        "Rhythmic Gymnastics",
        "Badminton",
        "Table Tennis",
        "Rowing",
        "Weightlifting",
        "Boxing",
        "Archery",
        "Cycling"
      ]
    },
    {
      name: "Winter Olympics Events",
      entrants: [
        "Figure Skating",
        "Alpine Skiing",
        "Snowboarding",
        "Ice Hockey",
        "Speed Skating (Short Track)",
        "Speed Skating (Long Track)",
        "Cross-Country Skiing",
        "Ski Jumping",
        "Bobsled",
        "Curling",
        "Freestyle Skiing",
        "Biathlon"
      ]
    },
    {
      name: "All Olympics Events",
      entrants: [
        "Track & Field",
        "Swimming",
        "Gymnastics",
        "Basketball",
        "Soccer",
        "Tennis",
        "Volleyball",
        "Diving",
        "Rhythmic Gymnastics",
        "Badminton",
        "Table Tennis",
        "Rowing",
        "Weightlifting",
        "Boxing",
        "Archery",
        "Cycling",
        "Figure Skating",
        "Alpine Skiing",
        "Snowboarding",
        "Ice Hockey",
        "Speed Skating (Short Track)",
        "Speed Skating (Long Track)",
        "Cross-Country Skiing",
        "Ski Jumping",
        "Bobsled",
        "Curling",
        "Freestyle Skiing",
        "Biathlon"
      ]
    }
  ]
}
```

### BOB Dialogue for Olympics Category

Already exists in current code:
```javascript
olympics: [
  "Olympic events. Where the whole world disagrees, but politely.",
  "The Olympics. Nationalism meets athletics meets opinions.",
  "Winter or Summer? Speed or grace? Let's settle this.",
  "Olympic bracket. May the best sport win. Or the one you actually watch.",
],
```

**Suggestion:** Keep existing 4 lines, add 4 more in dialogue expansion phase.

---

## Testing Notes

**Summer (16 entrants):**
- Clean bracket, no play-ins
- ~32 minutes play time
- Expected chaos: Gymnastics vs. Swimming drama

**Winter (12 entrants):**
- Clean bracket, no play-ins
- ~24 minutes play time
- Expected chaos: Figure Skating vs. Hockey divide

**All (28 entrants):**
- 14 play-ins + 14 byes
- ~45 minutes play time
- Expected chaos: Season debates, discipline debates

---

## Future Enhancements (v2.6+)

- [ ] Medal counts by sport (trivia element)
- [ ] Host nation callbacks ("From Paris... from Beijing...")
- [ ] Athlete spotlight (famous names per sport)
- [ ] "I just watched this" recency bonus dialogue
- [ ] Summer vs. Winter meta-debate category

---

## Notes

All events are **canonical IOC sports**, no invented categories. This ensures:
- Family familiarity (everyone knows these sports)
- No research friction (user doesn't need to look anything up)
- Clean, professional category
- Internationally recognizable

Olympics categories should feel **official**, not chaotic. BOB's tone here is more "measured authority" than in absurd categories.
