# How I Built a Party Game with AI (and What My Family Taught Me About It)

**Draft Substack Post — December 2025**

---

## [Your Intro Here]

*[Space for Derek to write the runway intro]*

---

## Meet BOB

Every game show needs a host. And I knew exactly who mine would be based on.

My Uncle Bob — Robert Jake — was one of eleven kids. Third to last. Nothing surprised him. He'd seen it all.

He had this bone-dry wit. Never oversold a joke. Would say something devastating in complete deadpan, then just ... move on. Irish Goodbye energy. He didn't linger.

He was a 4:30 AM letter writer — the kind of guy who'd drop a profound observation in a note, then never mention it again. Hunter, drinker, Air Force trombone player. Chain smoker. Always twitchy, leg bouncing, looking for nearest exit.

Somewhere in the red hills of northwestern Oklahoma, there's a Coors can buried deep near a fishing hole. Uncle Bob put it there one afternoon when I was a kid, telling me "you can come back here years from now, and it will still be here." He was a little tipsy and poetic. A great storyteller who didn't need a banquet hall or a big audience, just a few banquet beers, family and friends. No microphone. No script.

Uncle Bob passed away years ago, but his stories stuck with me. When I started building this game, I knew the host needed that energy. Dry. Measured. Impatient but warm underneath.

So I named him BOB.

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

## Building with Claude

I built Battle o' Brackets in about a week. With Claude.

Not "Claude wrote the code and I watched." More like pair programming with someone who never gets tired, never gets frustrated when I change my mind, and has read every programming book ever written.

It started as a single HTML file. React via CDN, everything inline, "just push the file" as a deployment strategy. That lasted about three days before I needed real architecture.

So Claude and I rebuilt it. Vite. React 19. Forty-plus files. Supabase for the backend. Proper components and state management. The kind of structure that lets you iterate fast without everything breaking.

The migration took a few hours. That's the thing about building with AI — you can be scrappy, hit the wall, and restructure without losing momentum. The code is malleable when you have a partner who can hold the whole thing in context.

Here's what surprised me about the process:

**It's not about the code.** Claude can write bracket math and voting logic all day. The interesting part was the creative collaboration. Developing BOB's personality. Writing dialogue that felt right. Figuring out what makes a tie-breaker *fun* instead of just annoying.

The character bible for BOB is now 300+ lines. Every dialogue trigger, every edge case, every personality note. That document is as important as the code.

**What worked:**

- Vite for instant hot reload — change a line, see it immediately
- Inline styles for rapid iteration — no CSS file management
- localStorage for vault history — works offline, persists forever
- Supabase for sharing — public links without authentication headaches
- Sound effects that fail silently — audio is hard, don't crash over it

**What I'd do differently:**

- Start with proper architecture (but scrappy-first taught me what I actually needed)
- TypeScript would've caught some dumb bugs
- More mobile testing earlier (spoiler: this becomes important)

I won't pretend I understand every line. That's not the point. I knew what I wanted. Claude knew how to build it. Together we shipped something real.

---

## Christmas Eve

This is where theory met reality.

The plan: Debut BOB at Christmas Eve dinner. Let the family debate pizza toppings, Christmas movies, whatever. Crown some champions. Create some memories.

What actually happened: The kids played one bracket. Then they asked to play Hitster.

We played Hitster for an hour. Then Herd Mentality. Then Hitster again.

BOB sat there on my phone, technically flawless, while everyone had more fun with games I didn't build.

Ouch.

But also: data.

---

## What They Taught Me

Here's why those games won the room:

**Instant engagement.** Hitster and Herd Mentality require zero setup. You open the box and play. BOB had setup screens, category selection, entrant lists. Friction before fun.

**Everyone plays every round.** In Hitster, everyone's engaged simultaneously — listening, guessing, arguing. In BOB, one person runs the bracket while others watch and vote. There's a facilitator problem.

**Memory triggers beat abstract preferences.** "Where does this song go in your timeline?" hits different than "which pizza topping is better?" One triggers nostalgia and stories. The other triggers opinions.

**Fast loops.** Hitster rounds take 30-60 seconds. A full BOB bracket can be 15+ matchups before you crown a champion. The payoff is too delayed.

**Social tension.** "Am I thinking what everyone else is thinking?" is a different kind of fun than "which option wins?" Herd Mentality creates moments. BOB creates results.

The insight that stuck with me:

> BOB works great solo. But it's not a party game yet.

The bracket isn't the game. The bracket is the *stage* for the game. I'd built a good stage. Now I needed to figure out what happens on it.

---

## What's Next

I'm calling it Party Mode.

The core idea: Keep the bracket structure, but add mechanics that create moments. Simultaneous voting. Countdown reveals. Ways to challenge results. Reasons to argue *during* the bracket, not just about the outcome.

Some things I'm exploring:

**3-2-1 Countdown.** Everyone locks in their vote, then a countdown builds tension before the reveal. (This one's already shipped for NYE.)

**Halftime Speech.** Before a big matchup, someone gets 30 seconds to advocate for their pick. Put a timer on it. Make them perform.

**Challenges.** Secret powers that let you reverse a result. Limited uses. Creates drama when someone plays one.

**Blowout immunity.** If something wins by a landslide, it can't be challenged. Rewards decisive victories.

The goal: Make BOB the stage, the emcee, and the memory keeper. Not just a voting tool.

Further out, I'm thinking about what happens when BOB becomes the interface entirely. Voice-controlled brackets. "Hey BOB, pizza bracket." And he just... runs it. Suggests entrants. Calls out voters. Makes callbacks to previous games. Becomes a character you interact with, not a UI you tap through.

That's the north star. For now, I'm shipping what works and learning from every family game night.

---

## Try It

**bob.claudewill.io**

Pick a category. Vote head-to-head. Crown a champion.

BOB will be unimpressed by your choices. That's the point.

---

*Built with Claude. Inspired by Uncle Bob. Battle-tested on family.*

*The debates will happen anyway. Might as well make them official.*
