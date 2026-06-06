/**
 * BOB Daily — the bracket schedule.
 *
 * Each template is an 8-entrant bracket. BOB's opinion lives in `bobRanking`
 * (best -> worst). For ANY matchup, BOB picks whichever entrant ranks higher;
 * his confidence scales with the gap. That's his whole brain in v1 — authored,
 * offline, instant. (v2 swaps this for a real LLM ensemble via panel.js.)
 *
 * `crowdLean` is an OPTIONAL hand-authored crowd ordering used only for the
 * pre-launch "early read" estimate (clearly labeled as an estimate in the UI).
 * Once real votes accrue in Supabase, crowd.js ignores this entirely.
 *
 * Keep entrants to exactly 8. Keep opinions strong. BOB is no fun on the fence.
 */

export const DAILY_BRACKETS = [
  {
    slug: 'road-trip-snack',
    title: 'Best Road Trip Snack',
    theme: 'food',
    blurb: "Eight snacks. One long drive. The panel has convened. Try to keep up.",
    entrants: ['Beef Jerky', 'Combos', 'Sunflower Seeds', 'Twizzlers', 'Trail Mix', 'Gas Station Hot Dog', 'Sour Patch Kids', 'Pringles'],
    bobRanking: ['Combos', 'Beef Jerky', 'Pringles', 'Sour Patch Kids', 'Twizzlers', 'Sunflower Seeds', 'Trail Mix', 'Gas Station Hot Dog'],
    crowdLean: ['Beef Jerky', 'Combos', 'Pringles', 'Twizzlers', 'Sour Patch Kids', 'Sunflower Seeds', 'Gas Station Hot Dog', 'Trail Mix'],
  },
  {
    slug: 'breakfast-cereal',
    title: 'Best Breakfast Cereal',
    theme: 'food',
    blurb: "The most important bracket of the day. Pour responsibly.",
    entrants: ['Cinnamon Toast Crunch', 'Frosted Flakes', 'Lucky Charms', 'Cheerios', 'Froot Loops', 'Raisin Bran', 'Cap\'n Crunch', 'Honey Nut Cheerios'],
    bobRanking: ['Cinnamon Toast Crunch', 'Honey Nut Cheerios', 'Lucky Charms', 'Frosted Flakes', 'Cap\'n Crunch', 'Froot Loops', 'Cheerios', 'Raisin Bran'],
    crowdLean: ['Cinnamon Toast Crunch', 'Lucky Charms', 'Frosted Flakes', 'Honey Nut Cheerios', 'Froot Loops', 'Cap\'n Crunch', 'Cheerios', 'Raisin Bran'],
  },
  {
    slug: 'one-hit-wonder',
    title: 'Greatest One-Hit Wonder',
    theme: 'music',
    blurb: "One song. One shot at immortality. They took it. Now you judge it.",
    entrants: ['Take On Me', 'Tainted Love', 'Africa', 'Come On Eileen', 'Mr. Brightside', 'Somebody That I Used to Know', '99 Luftballons', 'Tubthumping'],
    bobRanking: ['Africa', 'Take On Me', 'Mr. Brightside', 'Tainted Love', 'Come On Eileen', 'Somebody That I Used to Know', '99 Luftballons', 'Tubthumping'],
    crowdLean: ['Mr. Brightside', 'Take On Me', 'Africa', 'Somebody That I Used to Know', 'Tainted Love', 'Come On Eileen', 'Tubthumping', '99 Luftballons'],
  },
  {
    slug: 'pixar',
    title: 'Best Pixar Movie',
    theme: 'movies',
    blurb: "I cried during the first ten minutes of one of these. I won't say which.",
    entrants: ['Toy Story', 'Up', 'The Incredibles', 'Finding Nemo', 'Inside Out', 'Ratatouille', 'WALL-E', 'Coco'],
    bobRanking: ['WALL-E', 'Up', 'The Incredibles', 'Toy Story', 'Ratatouille', 'Inside Out', 'Coco', 'Finding Nemo'],
    crowdLean: ['Toy Story', 'The Incredibles', 'Up', 'Finding Nemo', 'Inside Out', 'WALL-E', 'Coco', 'Ratatouille'],
  },
  {
    slug: 'sitcom',
    title: 'Best Sitcom Ever',
    theme: 'tv',
    blurb: "Comfort television, on trial. The laugh track cannot save you now.",
    entrants: ['Seinfeld', 'The Office', 'Friends', 'Parks and Recreation', 'Cheers', 'Frasier', 'It\'s Always Sunny', 'Arrested Development'],
    bobRanking: ['Seinfeld', 'Cheers', 'Frasier', 'The Office', 'Arrested Development', 'It\'s Always Sunny', 'Parks and Recreation', 'Friends'],
    crowdLean: ['The Office', 'Friends', 'Seinfeld', 'Parks and Recreation', 'It\'s Always Sunny', 'Cheers', 'Arrested Development', 'Frasier'],
  },
  {
    slug: 'candy',
    title: 'Best Candy Bar',
    theme: 'food',
    blurb: "Pure sugar, pure conviction. No wrong answers — except most of yours.",
    entrants: ['Snickers', 'Reese\'s', 'Twix', 'Kit Kat', 'Milky Way', 'Butterfinger', '3 Musketeers', 'Almond Joy'],
    bobRanking: ['Reese\'s', 'Snickers', 'Twix', 'Kit Kat', 'Butterfinger', 'Milky Way', 'Almond Joy', '3 Musketeers'],
    crowdLean: ['Reese\'s', 'Snickers', 'Kit Kat', 'Twix', 'Milky Way', 'Butterfinger', '3 Musketeers', 'Almond Joy'],
  },
  {
    slug: 'pizza-topping',
    title: 'Best Pizza Topping',
    theme: 'food',
    blurb: "We've ended friendships over less. Choose, and live with it.",
    entrants: ['Pepperoni', 'Mushrooms', 'Sausage', 'Bacon', 'Onions', 'Pineapple', 'Black Olives', 'Extra Cheese'],
    bobRanking: ['Pepperoni', 'Sausage', 'Mushrooms', 'Bacon', 'Extra Cheese', 'Onions', 'Black Olives', 'Pineapple'],
    crowdLean: ['Pepperoni', 'Bacon', 'Sausage', 'Mushrooms', 'Extra Cheese', 'Pineapple', 'Onions', 'Black Olives'],
  },
  {
    slug: 'superpower',
    title: 'Best Superpower',
    theme: 'life',
    blurb: "Choose your gift. The panel has already chosen, and judged you for it.",
    entrants: ['Flight', 'Invisibility', 'Time Travel', 'Teleportation', 'Super Strength', 'Telepathy', 'Healing', 'Stop Time'],
    bobRanking: ['Stop Time', 'Teleportation', 'Time Travel', 'Flight', 'Healing', 'Telepathy', 'Invisibility', 'Super Strength'],
    crowdLean: ['Time Travel', 'Flight', 'Teleportation', 'Invisibility', 'Stop Time', 'Telepathy', 'Super Strength', 'Healing'],
  },
  {
    slug: 'nba-goat',
    title: 'NBA GOAT',
    theme: 'sports',
    blurb: "The oldest argument in the gym. Settle it. Or don't. You won't.",
    entrants: ['Michael Jordan', 'LeBron James', 'Kareem Abdul-Jabbar', 'Magic Johnson', 'Bill Russell', 'Larry Bird', 'Kobe Bryant', 'Tim Duncan'],
    bobRanking: ['Michael Jordan', 'Kareem Abdul-Jabbar', 'LeBron James', 'Bill Russell', 'Magic Johnson', 'Larry Bird', 'Tim Duncan', 'Kobe Bryant'],
    crowdLean: ['Michael Jordan', 'LeBron James', 'Kobe Bryant', 'Magic Johnson', 'Larry Bird', 'Kareem Abdul-Jabbar', 'Bill Russell', 'Tim Duncan'],
  },
  {
    slug: 'holiday',
    title: 'Best Holiday',
    theme: 'life',
    blurb: "A bracket about days off. Finally, a topic everyone overrates differently.",
    entrants: ['Christmas', 'Thanksgiving', 'Halloween', 'Fourth of July', 'New Year\'s Eve', 'Easter', 'Memorial Day', 'St. Patrick\'s Day'],
    bobRanking: ['Thanksgiving', 'Halloween', 'Christmas', 'Fourth of July', 'Memorial Day', 'New Year\'s Eve', 'St. Patrick\'s Day', 'Easter'],
    crowdLean: ['Christmas', 'Halloween', 'Thanksgiving', 'Fourth of July', 'New Year\'s Eve', 'St. Patrick\'s Day', 'Easter', 'Memorial Day'],
  },
  {
    slug: 'fast-food',
    title: 'Best Fast Food',
    theme: 'food',
    blurb: "Drive-thru democracy. Pull forward and make your selection.",
    entrants: ['In-N-Out', 'Chick-fil-A', 'Taco Bell', 'McDonald\'s', 'Wendy\'s', 'Popeyes', 'Five Guys', 'Raising Cane\'s'],
    bobRanking: ['In-N-Out', 'Popeyes', 'Chick-fil-A', 'Taco Bell', 'Wendy\'s', 'Five Guys', 'McDonald\'s', 'Raising Cane\'s'],
    crowdLean: ['Chick-fil-A', 'In-N-Out', 'Taco Bell', 'Raising Cane\'s', 'McDonald\'s', 'Popeyes', 'Wendy\'s', 'Five Guys'],
  },
  {
    slug: 'decade-music',
    title: 'Best Decade for Music',
    theme: 'music',
    blurb: "Your teenage self is in this bracket somewhere, and it's nervous.",
    entrants: ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '1950s', '2020s'],
    bobRanking: ['1970s', '1990s', '1960s', '1980s', '2000s', '1950s', '2010s', '2020s'],
    crowdLean: ['1990s', '1980s', '2000s', '1970s', '2010s', '1960s', '2020s', '1950s'],
  },
]

// Epoch for the daily counter. BOB Daily #1 = this date.
export const DAILY_EPOCH = '2026-06-01'
