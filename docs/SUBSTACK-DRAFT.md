# How I Built a Party Game with AI in a Week

**Draft Substack Post — December 2025**

*Chapters 1-3 ready. Chapters 4-6 coming after Christmas Eve.*

---

## Chapter 1: The Problem

Every family gathering, the same debates happen.

Best pizza topping. Best Christmas movie. Best 90s band. Best Thanksgiving side dish.

They start friendly. They escalate. Someone brings up pineapple on pizza and suddenly Uncle Mike isn't talking to Cousin Sarah.

These debates have no structure. No closure. No official winner. They just... fade out when someone changes the subject or the food arrives.

I wanted to fix that.

What if there was a game that turned these debates into something structured? Something with rounds, with eliminations, with a definitive champion at the end?

A bracket. Like March Madness, but for arguing about whether Die Hard is a Christmas movie.

---

## Chapter 2: Meet BOB

Every game show needs a host. And I knew exactly who mine would be based on.

My Uncle Bob — Robert Jake — was one of eleven kids. Third to last. Nothing surprised him. He'd seen it all.

He had this bone-dry wit. Never oversold a joke. Would say something devastating in complete deadpan, then just... move on. Irish Goodbye energy. He didn't linger.

He was a 4:30 AM letter writer — the kind of guy who'd drop a profound observation in a note, then never mention it again. Hunter, drinker, Air Force trombone player. Chain smoker. Always twitchy, leg bouncing, looking for the exit.

And he had *opinions* about food. Strong ones.

Uncle Bob passed away years ago, but his voice stuck with me. When I started building this game, I knew the host needed that energy. Dry. Measured. Impatient but warm underneath.

So I named him BOB.

But BOB isn't just Uncle Bob. He's a synthesis:

- **Bob Barker's** warmth and genuine care for contestants
- **Bob Newhart's** mastery of the slow burn and pause
- **Alex Trebek's** measured authority with wit
- **Bob Eubanks'** deadpan reactions to chaos on The Newlywed Game
- **Bob Ross's** calming presence (happy little accidents when your favorite loses)

The result is a host who says things like:

> "A tie. A TIE. Someone has to make the call. Not me. I'm just the host."

> "Food bracket. Finally, a topic worth ruining friendships over."

> "By the power vested in me by absolutely no one — we have a champion."

He's not mean. He's just... seen enough family drama to be unimpressed by yours.

---

## Chapter 3: Building with Claude

I built Battle o' Brackets in about a week. With Claude.

Not "Claude wrote the code and I watched." More like pair programming with someone who never gets tired, never gets frustrated when I change my mind, and has read every programming book ever written.

The whole thing is one HTML file. No build process. No npm. No webpack. Just React via CDN, Babel for JSX transpilation, and about 4,000 lines of code in a single index.html.

Why? Because I wanted to see how far I could push it. And because "just push the file" is a deployment strategy I can actually remember.

Here's what surprised me about building with AI:

**It's not about the code.** Claude can write bracket math and voting logic all day. The interesting part was the creative collaboration. Developing BOB's personality. Writing dialogue that felt right. Figuring out what makes a tie-breaker *fun* instead of just annoying.

We'd go back and forth:

*Me:* "BOB needs a line for when there's a tie."
*Claude:* "How about 'Deadlocked. The voters have failed us.'"
*Me:* "Good but needs the Uncle Bob energy. He'd make them call someone."
*Claude:* "What about 'Call someone. Anyone. A neighbor. A delivery person. Your weird uncle. They decide.'"
*Me:* "That's it."

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

But for a side project meant to debut at Christmas dinner? It shipped. That's what matters.

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

*Built with Claude. Inspired by Uncle Bob. Tested on family.*
