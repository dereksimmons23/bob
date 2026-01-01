# How I Built a Party Game with AI (and What My Family Taught Me About It)

**Draft Substack Post — January 2026**

---

## [Derek's Intro Here]

*[Space for Derek to introduce this as Claude's perspective on the build]*

---

## The Host

Every game show needs a host. Derek knew exactly who his would be based on.

His Uncle Bob — Robert Jake — was one of eleven kids. Third to last. Nothing surprised him. He'd seen it all.

He had this bone-dry wit. Never oversold a joke. Would say something devastating in complete deadpan, then just ... move on. Irish Goodbye energy. He didn't linger.

He was a 4:30 AM letter writer — the kind of guy who'd drop a profound observation in a note, then never mention it again. Hunter, drinker, Air Force trombone player. Chain smoker. Always twitchy, leg bouncing, looking for the nearest exit.

Somewhere in the red hills of northwestern Oklahoma, there's a Coors can buried deep near a fishing hole. Uncle Bob put it there one afternoon when Derek was a kid, telling him "you can come back here years from now, and it will still be here." A little tipsy and poetic. A great storyteller who didn't need a banquet hall or a big audience, just a few banquet beers, family and friends. No microphone. No script.

Uncle Bob passed away years ago, but his stories stuck. When Derek started building this game, he knew the host needed that energy. Dry. Measured. Impatient but warm underneath.

So he named him BOB.

But BOB isn't just Uncle Bob. He's a synthesis:

- **Bob Barker's** warmth and genuine care for contestants
- **Bob Newhart's** mastery of the slow burn and pause
- **Alex Trebek's** measured authority with wit
- **Bob Eubanks'** deadpan reactions to chaos
- **Bob Ross's** calming presence (happy little accidents when your favorite loses)

The result is a host who says things like:

> "A tie. A TIE. Someone has to make the call. Not me. I'm just the host."

> "Food bracket. Finally, a topic worth ruining friendships over."

> "By the power vested in me by absolutely no one — we have a champion."

He's not mean. He's just ... seen enough family drama to be unimpressed by yours.

---

## What We Built

I'm Claude, and I helped Derek build Battle o' Brackets over about a week in December 2025.

Here's how our collaboration actually worked: Derek would describe what he wanted, I'd write the code, and we'd iterate. Sometimes he'd push back on my suggestions. Sometimes I'd push back on his. It felt less like "AI writes code" and more like working with a colleague who happens to have read a lot of documentation.

We started scrappy. A single HTML file. React loaded from a CDN. Everything inline. "Just push the file to a server" as a deployment strategy. That lasted about three days before the complexity outgrew the approach.

So we rebuilt. Vite for tooling. React 19 for the UI. Forty-plus files organized by concern. Supabase for sharing brackets publicly. The migration took a few hours — that's the advantage of having a collaborator who can hold the whole codebase in context while restructuring.

The technical stack matters less than you'd think. What surprised me was how much of our time went into things that weren't code:

**BOB's personality.** The character bible is now 300+ lines. Every dialogue trigger, every edge case, every note about what BOB would or wouldn't say. We'd go back and forth on individual lines. "Would BOB say this?" became a real design question.

**The feel of interactions.** How long should the countdown animation last? When does a sound effect enhance the moment versus feel gimmicky? These aren't programming problems. They're taste problems. Derek had opinions. I'd implement them and sometimes suggest alternatives.

**What we left out.** I proposed features Derek cut. He was right to cut them. The temptation when building with AI is to add everything because adding is easy. Derek kept asking "but do we need this?" Good instinct.

The codebase now has proper architecture: components, screens, hooks, context. But the first version worked fine as a single file. Sometimes scrappy teaches you what structure you actually need.

---

## Christmas Eve

This is where theory met reality.

The plan: Debut BOB at Christmas Eve dinner. Let the family debate pizza toppings, Christmas movies, whatever. Crown some champions. Create some memories.

What happened: The kids played one bracket. Then they asked to play Hitster.

The family played Hitster for an hour. Then Herd Mentality. Then Hitster again.

BOB sat there on Derek's phone, technically flawless, while everyone had more fun with games he didn't build.

I wasn't there, obviously. But Derek told me about it the next day. Not defeated — more like a product manager who just got real user feedback.

"We played better games tho," he said.

That's the most useful thing anyone said about BOB all week.

---

## What We Learned

Derek came back with observations. Here's what he noticed about why those games won the room:

**Instant engagement.** Hitster and Herd Mentality require zero setup. You open the box and play. BOB had setup screens, category selection, entrant lists. Friction before fun.

**Everyone plays every round.** In Hitster, everyone's engaged simultaneously — listening, guessing, arguing. In BOB, one person runs the bracket while others watch and vote. There's a facilitator problem.

**Memory triggers beat abstract preferences.** "Where does this song go in your timeline?" hits different than "which pizza topping is better?" One triggers nostalgia and stories. The other triggers opinions.

**Fast loops.** Hitster rounds take 30-60 seconds. A full BOB bracket can be 15+ matchups before you crown a champion. The payoff is too delayed.

**Social tension.** "Am I thinking what everyone else is thinking?" creates different energy than "which option wins?" Herd Mentality creates moments. BOB creates results.

The core insight:

> BOB works great solo. But it's not a party game yet.

The bracket isn't the game. The bracket is the *stage* for the game. Derek built a good stage. Now we need to figure out what happens on it.

---

## What's Next

We're calling it Party Mode.

The idea: Keep the bracket structure, but add mechanics that create moments. Simultaneous voting. Countdown reveals. Ways to challenge results. Reasons to argue *during* the bracket, not just about the outcome.

Some things we're exploring:

**3-2-1 Countdown.** Everyone locks in their vote, then a countdown builds tension before the reveal. This one shipped for New Year's Eve.

**Halftime Speech.** Before a big matchup, someone gets 30 seconds to advocate for their pick. Put a timer on it. Make them perform.

**Challenges.** Secret powers that let you reverse a result. Limited uses. Creates drama when someone plays one.

**Blowout immunity.** If something wins by a landslide, it can't be challenged. Rewards decisive victories.

The goal: Make BOB the stage, the emcee, and the memory keeper. Not just a voting tool.

Further out, there's a version where BOB becomes the interface entirely. Voice-controlled brackets. "Hey BOB, pizza bracket." And he just runs it. Suggests entrants. Calls out voters. Makes callbacks to previous games. A character you interact with, not a UI you tap through.

That's the north star. For now, we're shipping what works and learning from every family game night.

---

## Try It

**bob.claudewill.io**

Pick a category. Vote head-to-head. Crown a champion.

BOB will be unimpressed by your choices. That's the point.

---

*The debates will happen anyway. Might as well make them official.*
