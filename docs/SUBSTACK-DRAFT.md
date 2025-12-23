# How I Built a Party Game with AI in a Week

**Draft Substack Post — December 2025**

*Chapters 1-3 ready. Chapters 4-6 coming after Christmas Eve.*

---

## Chapter 1: The Problem

Every family gathering, the same debates happen.

Best pizza topping. Best Christmas movie. Best 90s band. Best side dish.

They start friendly. They escalate. Someone brings up pineapple on pizza and suddenly aunt Sue isn't talking to cousin Sam.

It's the kind of pettiness that needs some structure. Maybe a little democracy. Winners. Losers. The kind of stuff that becomes party lore.

So I built an app to capture it.

A game that turns these debates (let's face it, arguments) into something formal. With rounds, eliminations, a definitive champion at the end, and a vault to record it all.

A bracket. Like March Madness, but for arguing about whether Die Hard is a Christmas movie. And if so, can it beat It's a Wonderful Life?

---

## Chapter 2: Meet BOB

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

He's not mean. He's just ... seen enough family drama to be unimpressed but amused by yours.

---

## Chapter 3: Building with Claude

I built Battle o' Brackets in about a week. With Claude.

Not "Claude wrote the code and I watched." More like pair programming with someone who never gets tired, never gets frustrated when I change my mind, and has read every programming book ever written.

The whole thing is one HTML file. No build process. No npm. No webpack. Just React via CDN, Babel for JSX transpilation, and about 4,000 lines of code in a single index.html.

Why? Because I wanted to see how far I could push it. And because "just push the file" is a deployment strategy I can actually remember.

Here's what surprised me about building with AI:

**It's not about the code.** Claude can write bracket math and voting logic all day. The interesting part was the creative collaboration. Developing BOB's personality. Writing dialogue that felt right. Figuring out what makes a tie-breaker *fun* instead of just annoying.

The character bible for BOB is now 300+ lines. Every dialogue trigger, every edge case, every personality note. That document is as important as the code.

**Technical decisions that worked:**

- Single-file PWA — no build errors, ever
- localStorage for everything — works offline, no server costs
- Canvas API for share images — native sharing, no external APIs
- Sound effects that fail silently — audio is hard, don't crash over it

**Things I'd do differently:**

- TypeScript would've caught some dumb bugs
- Component organization in one file is "creative"
- Hot reload means manual refresh (old school)

I won't pretend I understand every line. That's the point. I knew what I wanted. Claude knew how to build it.

But for a side project meant to debut at Christmas dinner? It shipped.

---

## Chapter 4: Christmas Eve

*Coming soon.*

*This is where the real testing happens. The kids. The debates. The chaos.*

*Video footage incoming.*

---

## Chapter 5: What the Kids Taught Me

*Coming soon.*

*They're brutal. They're honest. They found every UX problem in 30 seconds.*

---

## Chapter 6: What's Next

*Coming soon.*

*The roadmap. The social features. Whether anyone besides my family actually uses this thing.*

---

## Try It

**bob.claudewill.io**

Pick a category. Vote head-to-head. Crown a champion.

BOB will be unimpressed by your choices. That's the point.

---

*Built with Claude. Inspired by Uncle Bob. Tested on family and friends.*
