---
Created: December 5, 2025
Updated: December 26, 2025
Version: v2
Project: Battle o' Brackets
Context: Claude Project setup guide
Status: Instructions
Confidentiality: Internal
Target Location: Reference only (follow steps below)
---

# Claude Project Setup Guide

## How to Create the Claude Project

### Step 1: Create New Project in Claude
1. Go to https://claude.ai/projects
2. Click **"Create Project"**
3. Fill in details:
   - **Project Name:** Battle o' Brackets — Uncle BOB
   - **Description:** Family bracket voting game PWA with AI host personality. Launching Christmas Eve 2025.

### Step 2: Add Knowledge Base Files
In the Project, go to **Knowledge** and upload these files from `/Users/dereksimmons/Desktop/BoB/`:

1. `BOB-CHARACTER-BIBLE.md` — Uncle BOB's personality, voice, dialogue system
2. `CATEGORY-LIBRARY.md` — All 60+ preset categories with entrants
3. `FEATURE-ROADMAP.md` — What's built, what's planned
4. `MULTIMEDIA-STRATEGY.md` — Media integration framework
5. `VOICE-STRATEGY.md` — ElevenLabs voice integration
6. `V2.5-SPRINT-PLAN.md` — Development roadmap & hour breakdown
7. `PROJECT-README.md` — Project overview & technical stack
8. `GAME-SHOW-HOST-RESEARCH.md` — BOB inspiration (Bob Barker, Trebek, etc.)
9. `PROJECT-CUSTOM-INSTRUCTIONS.md` — These guidelines (add as instructions, not KB)
10. `OLYMPICS-DATA.md` — When created (Summer/Winter/Combined events)
11. `EXPANDED-DIALOGUE.md` — When created (50+ new BOB lines)
12. `USER-CATEGORY-TEMPLATES.md` — When created (Soda, Band, etc. templates)

### Step 3: Add Custom Instructions
In the Project, go to **Instructions** and paste the content from `PROJECT-CUSTOM-INSTRUCTIONS.md`:

- Code guidelines
- Uncle BOB character rules
- Feature priorities
- Testing requirements
- Decision framework
- Deployment checklist

### Step 4: Set Project Memory
Click **Memory** in the Project and add:

```
**Current Date:** December 5, 2025
**Target Launch:** December 24, 2025 (19 days)
**Sprint Duration:** December 5–19 (2 weeks, 10 hours, 5 days/week)

**Current Priorities:**
1. Dialogue expansion (50+ lines, rotation engine)
2. Voice integration (Derek's ElevenLabs cloned voice)
3. Olympics categories (Summer/Winter/Combined)
4. Bracket tree visualization
5. Sound strategy document + SFX placement
6. Testing & polish

**Key Constraints:**
- Single-file PWA (no build process)
- Bundle size <150 KB
- Offline-first, localStorage persistence
- Family-friendly (ages 10–70)
- All devices tested before Dec 19

**Success Metric:**
Ship v2.5 by December 19 with all features working, 5-day buffer before Christmas Eve family debut.
```

### Step 5: Start the Sprint
You're ready! Each day:

1. **Morning:** "Here's what we're building today"
2. **Work:** Follow V2.5-SPRINT-PLAN.md task for the day
3. **Evening:** Quick status update + next day preview
4. **Weekly:** Review progress, adjust if needed

---

## Project Structure for Reference (v2.6+)

```
/Users/dereksimmons/Desktop/bob/
├── src/
│   ├── main.jsx              # React DOM entry
│   ├── App.jsx               # Main router + state
│   ├── components/           # UI components
│   │   ├── ui/               # Atoms (Button, Input, Logo, etc.)
│   │   └── *.jsx             # Features (BobSays, MatchupCard, etc.)
│   ├── screens/              # Page components
│   ├── modals/               # Modal dialogs
│   ├── hooks/                # Custom hooks
│   ├── context/              # React Context
│   ├── lib/                  # Utilities
│   ├── data/                 # Constants
│   └── styles/               # CSS
│
├── dist/                     # Production build
├── public-legacy/            # Original single-file version
│
├── docs/                     # Documentation
│   ├── BOB-CHARACTER-BIBLE.md
│   ├── CATEGORY-LIBRARY.md
│   ├── FEATURE-ROADMAP.md
│   ├── PROJECT-README.md
│   └── ...
│
├── index.html                # Vite entry point
├── vite.config.js            # Vite config
├── netlify.toml              # Netlify config
└── package.json
```

**Commands:**
```bash
npm install              # Install dependencies
npm run dev              # Dev server (localhost:5173)
npm run build            # Production build
npx netlify-cli deploy --prod  # Deploy to Netlify
```

---

## Using the Project Effectively

### During Development
- **Always reference the Knowledge Base** before answering questions
- **Check V2.5-SPRINT-PLAN.md** for today's task
- **Confirm BOB personality** with BOB-CHARACTER-BIBLE.md
- **Verify feature scope** with FEATURE-ROADMAP.md

### When Updating Memory
- Add progress snapshots weekly
- Note blockers encountered
- Track completed tasks
- Update timeline if needed

### When Code Changes
- Update version numbers in metadata
- Document changes in relevant MD files
- Test against all requirements
- Commit with clear message (if using GitHub)

### When Questions Come Up
1. Search the Knowledge Base first
2. Check FEATURE-ROADMAP.md for scope
3. Reference PROJECT-CUSTOM-INSTRUCTIONS.md for rules
4. If still unclear, ask for clarification

---

## Quick Reference Links

**Inside Project Memory:**
- V2.5-SPRINT-PLAN.md — Today's task + hour breakdown
- BOB-CHARACTER-BIBLE.md — Character rules + dialogue system
- VOICE-STRATEGY.md — Voice integration details

**In /BoB folder:**
- index.html — Production code (update this)
- PROJECT-README.md — Project overview
- CATEGORY-LIBRARY.md — All categories

---

## Switching Between Standalone Chat & Project

**When to use Project:**
- Development work (coding, testing)
- Feature planning (sprint tasks)
- Documentation updates
- Architectural decisions

**When to use Standalone Chat:**
- Quick questions/answers
- Brainstorming new ideas
- One-off research
- No-context tasks

**Best Practice:** Keep everything in the Project. Standalone chats = lost context.

---

## Project Checklist

- [ ] Project created in Claude
- [ ] Knowledge base files uploaded (10 files)
- [ ] Custom instructions added
- [ ] Memory populated with sprint info
- [ ] Team invited (if collaborative)
- [ ] First task started
- [ ] Daily updates happening
- [ ] Weekly reviews scheduled

---

## Notes

This Project is designed to keep us organized, maintain context across 2 weeks, and make sure we ship v2.5 on time with zero fragmentation.

The knowledge base is our source of truth. The sprint plan is our daily guide. The instructions ensure we stay true to Uncle BOB's character and the technical constraints.

Let's ship something worth playing on Christmas Eve. 🏀

---

**Created:** December 5, 2025  
**For:** Coach D (Derek Simmons)  
**Target:** December 24, 2025 (Family debut)
