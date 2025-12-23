# Battle o' Brackets — Launch Plan

## Overview

**Launch Date:** December 24, 2025 (Christmas Eve)
**Live URL:** https://bob.claudewill.io

---

## Pre-Launch Checklist (Dec 20-23)

### Technical
- [x] All v2.5 features complete
- [x] Shareable bracket links working
- [x] Supabase analytics tracking games
- [x] Dev mode available for testing
- [x] Mobile UX polished
- [ ] Final testing on multiple devices
- [ ] Test shared link flow end-to-end

### Content Preparation
- [ ] Record 30-60 second demo video (Dec 24)
- [x] Prepare LinkedIn post draft
- [x] Prepare Twitter/X post draft
- [ ] Screenshot gallery ready
- [ ] "Built with AI" story outline (Substack post-Christmas)
- [x] Dec 23 teaser posted (LinkedIn, X, Facebook, Instagram, Substack)

---

## Launch Timeline

### Day 0: Christmas Eve (Dec 24)
**Goal:** Family debut, capture reactions

**Morning:**
- Final deploy check
- Clear test data from Supabase
- Prep device for family play

**Evening (Family Gathering):**
- Run 2-3 brackets with family
- Capture moments:
  - Video of debates
  - Screenshots of controversial results
  - Shared bracket links created
- Note memorable BOB quotes and reactions

**End of Night:**
- Check Supabase for game data
- Save best shared links for posts

---

### Day 1: Christmas Day (Dec 25)
**Goal:** Soft launch to personal network

**Social Posts:**

#### LinkedIn
```
🏆 Built something fun for the holidays...

Christmas Eve tradition at our house: family debates that escalate quickly.
"Best Christmas Movie" (Die Hard won. Fight me.)
"Best Pizza Topping" (Chaos ensued.)

So I built Battle o' Brackets — a party game that turns these debates into
tournament-style voting. Complete with an AI host named BOB who has opinions.

Built it in a week using Claude. The whole thing is one HTML file.

Try it: bob.claudewill.io

What would your family bracket be?

#buildinpublic #ai #sideprojcet
```

#### Twitter/X
```
🏆 Made a party game for family debates.

Battle o' Brackets: Pick a category, vote head-to-head, crown a champion.

Features an AI host (BOB) who's seen enough family drama to be unimpressed.

Built with @AnthropicAI Claude in a week.

bob.claudewill.io
```

**Direct Outreach:**
- Text/email link to friends who'd appreciate it
- Share specific bracket results with relevant friends ("You'd have opinions on this...")

---

### Days 2-3: Post-Christmas (Dec 26-27)
**Goal:** Gather feedback, prep for broader launch

**Tasks:**
- Check feedback submissions in Supabase
- Review analytics (games played, categories used)
- Note any bugs or UX issues
- Respond to any social engagement

---

### Days 4-7: Broader Announcement (Dec 28-31)
**Goal:** Reach indie/dev communities

#### Reddit Posts

**r/SideProject**
```
Title: Built a party game with AI in a week — Battle o' Brackets

Made this for family Christmas and thought others might enjoy it.

It's a tournament-style voting game — pick a category (Best Pizza Topping,
Best Christmas Movie, etc.), vote head-to-head until a champion emerges.

The twist: an AI host named BOB provides commentary. He's... opinionated.

Tech: Single-file React PWA, Supabase for backend, built with Claude.

Try it: bob.claudewill.io

Happy to answer questions about the build process!
```

**r/webdev**
```
Title: Shipped a single-file React PWA (no build process) — lessons learned

Wanted to share a project I built without any build tooling.

Battle o' Brackets is a party game that runs entirely from one HTML file:
- React 18 via CDN
- Babel standalone for JSX
- Supabase for persistence
- Web Audio API for sounds
- Canvas API for share images

No npm, no webpack, no Vite. Just file → browser.

Trade-offs:
- Pros: Instant deploy, no build errors, easy to debug
- Cons: No tree-shaking, larger bundle, can't use npm packages easily

Link: bob.claudewill.io

Would love to hear what others think about this approach.
```

#### Indie Hackers
- Post in relevant groups
- Focus on "built with AI" angle

#### Hacker News (Show HN)
- Wait for a weekday (Dec 30 or later)
- Keep it simple, technical focus

---

## Product Hunt Strategy

### Timing Considerations
- Holiday week (Dec 24-31) is quiet — fewer eyeballs but less competition
- January is crowded with "new year" launches
- Consider waiting until January 6-10 for better timing

### Prep Needed
- [ ] Product Hunt account verified
- [ ] 5-6 screenshots ready
- [ ] Short video/GIF
- [ ] Tagline: "The party game where democracy gets dumb"
- [ ] Description draft
- [ ] Maker comment ready

### Launch Day (If Doing)
- Post early morning (12:01 AM PST)
- Share to social immediately
- Engage with all comments
- Update friends/supporters to check it out

---

## Content Assets Needed

### Screenshots
1. Home screen with BOB
2. Category library (showing themes)
3. Voting in action (VS screen)
4. Champion celebration (confetti)
5. The Vault (carousel)
6. Shared bracket view

### Video
- 30-60 second screen recording
- Show: category selection → voting → champion
- Capture BOB commentary
- End with share flow

### Blog Post Outline
**"How I Built a Party Game with AI in a Week"**

1. The Problem: Family debates need structure
2. The Solution: Tournament-style voting
3. The Character: BOB (Uncle Bob + famous Bobs)
4. The Tech: Single-file PWA, no build process
5. The AI: How Claude helped (code + character development)
6. The Launch: Christmas Eve debut
7. What's Next: Banners & Banter social features

---

## Success Metrics

### Week 1 Goals
| Metric | Target | How to Track |
|--------|--------|--------------|
| Games played | 100+ | Supabase `games` table |
| Shared links created | 50+ | Supabase `shared_brackets` table |
| Custom categories | 10+ | Supabase `custom_categories` table |
| Feedback submissions | 5+ | Supabase `feedback` table |
| Social impressions | 1000+ | LinkedIn/Twitter analytics |

### Week 2-4 Goals
| Metric | Target |
|--------|--------|
| Returning users | 20%+ |
| Organic shares | 10+ |
| Feature requests | 5+ useful ones |
| Bug reports | Track and fix |

---

## Post-Launch Priorities

### Immediate (Week 1)
- Fix any bugs reported
- Respond to feedback
- Share user-generated content

### Short-term (January)
- Analyze which categories are popular
- Consider adding requested features
- Plan Banners & Banter Phase 2

### Medium-term (Q1 2026)
- Public feed of brackets
- Reactions/voting on others' results
- Category leaderboards

---

## Key Messages

### For General Audience
> "A party game that turns your family debates into tournament brackets.
> Pick a category, vote head-to-head, crown a champion.
> Perfect for holidays, game nights, and settling arguments."

### For Tech/AI Audience
> "Built a full party game PWA with AI in a week.
> Single HTML file, no build process.
> Claude helped with both code and character development."

### For Family/Friends
> "Remember our pizza topping debate? I made a game for that."

---

## Risk Mitigation

### If No One Cares
- Focus on family use (it's still valuable personally)
- Keep iterating based on own usage
- Wait for natural word-of-mouth

### If Too Popular
- Supabase can scale
- No real-time features = low server load
- Analytics will help prioritize features

### If Negative Feedback
- Address legitimate concerns quickly
- Ignore trolls
- Use feedback for v3 planning

---

## Notes

- Product Hunt timing: Consider waiting until after New Year's
- Keep posts authentic — this is a fun side project, not a startup
- BOB's personality is the differentiator — lean into it
- The "built with AI" angle is timely but don't oversell it
