export const CATEGORY_LIBRARY = {
  food: {
    name: "Food & Drink",
    icon: "🍕",
    color: "var(--accent-orange)",
    categories: [
      { name: "Best Pizza Topping", entrants: ["Pepperoni", "Mushrooms", "Sausage", "Green Peppers", "Onions", "Black Olives", "Bacon", "Pineapple", "Jalapeños", "Extra Cheese", "Anchovies", "Spinach", "Tomatoes", "Garlic", "Ham", "Chicken"] },
      { name: "Best Pizza Style", featured: true, entrants: ["New York", "Chicago Deep Dish", "Detroit", "Neapolitan", "Sicilian", "New Haven", "California", "St. Louis", "Grandma Style", "Roman", "Greek", "Tavern Style", "Stuffed Crust", "Wood-Fired", "Bar Pie", "Pan Pizza"] },
      { name: "Best Fast Food Chain", featured: true, entrants: ["McDonald's", "Chick-fil-A", "Wendy's", "Taco Bell", "Burger King", "Popeyes", "Five Guys", "In-N-Out", "Chipotle", "Shake Shack", "Arby's", "Panda Express", "Sonic", "Whataburger", "Jersey Mike's", "Raising Cane's"] },
      { name: "Best Ice Cream Flavor", entrants: ["Vanilla", "Chocolate", "Strawberry", "Cookies & Cream", "Mint Chocolate Chip", "Cookie Dough", "Rocky Road", "Butter Pecan", "Salted Caramel", "Coffee", "Pistachio", "Neapolitan", "Birthday Cake", "Peanut Butter Cup", "Cherry Garcia", "Moose Tracks"] },
      { name: "Best Breakfast Food", entrants: ["Pancakes", "Waffles", "French Toast", "Bacon", "Eggs Benedict", "Omelette", "Breakfast Burrito", "Bagel & Lox", "Cereal", "Avocado Toast", "Biscuits & Gravy", "Cinnamon Roll", "Fruit Bowl", "Hash Browns", "Smoothie Bowl", "Croissant"] },
      { name: "Best Thanksgiving Side", entrants: ["Mashed Potatoes", "Stuffing", "Green Bean Casserole", "Cranberry Sauce", "Sweet Potato Casserole", "Mac & Cheese", "Dinner Rolls", "Gravy", "Corn on the Cob", "Brussels Sprouts", "Cornbread", "Pumpkin Pie", "Pecan Pie", "Apple Pie", "Glazed Carrots", "Coleslaw"] },
      { name: "Best Candy", entrants: ["Reese's", "Snickers", "M&Ms", "Kit Kat", "Twix", "Skittles", "Sour Patch Kids", "Milky Way", "Butterfinger", "3 Musketeers", "Swedish Fish", "Jolly Ranchers", "Nerds", "Starburst", "Hershey's", "Almond Joy"] },
      { name: "Best Chip Flavor", featured: true, entrants: ["Classic/Original", "Sour Cream & Onion", "BBQ", "Salt & Vinegar", "Cheddar", "Ranch", "Jalapeño", "Honey BBQ", "Loaded Baked Potato", "Dill Pickle", "Cool Ranch Doritos", "Nacho Cheese Doritos", "Flamin' Hot", "Kettle Cooked", "Lime", "All Dressed"] },
      { name: "Best Soda", entrants: ["Coca-Cola", "Pepsi", "Dr Pepper", "Sprite", "Mountain Dew", "Fanta", "7-Up", "Root Beer", "Ginger Ale", "Orange Crush", "Cherry Coke", "Cream Soda", "Grape Soda", "Sierra Mist", "Sunkist", "Big Red"] },
      { name: "Best Coffee Order", entrants: ["Black Coffee", "Latte", "Cappuccino", "Americano", "Espresso", "Mocha", "Cold Brew", "Iced Coffee", "Macchiato", "Flat White", "Frappuccino", "Irish Coffee", "Cortado", "Affogato", "Pour Over", "Red Eye"] },
      { name: "Best Cuisine", entrants: ["Italian", "Mexican", "Chinese", "Japanese", "Thai", "Indian", "Greek", "French", "Korean", "Vietnamese", "American", "Mediterranean", "Spanish", "Middle Eastern", "Ethiopian", "Brazilian"] },
    ]
  },
  music: {
    name: "Music",
    icon: "🎵",
    color: "var(--accent-purple)",
    categories: [
      { name: "Best Band of All Time", featured: true, entrants: ["The Beatles", "Led Zeppelin", "Pink Floyd", "Queen", "The Rolling Stones", "Nirvana", "U2", "AC/DC", "Guns N' Roses", "Metallica", "The Who", "Fleetwood Mac", "Radiohead", "The Beach Boys", "Pearl Jam", "Red Hot Chili Peppers"] },
      { name: "Best Music Genre", entrants: ["Rock", "Pop", "Hip-Hop", "R&B", "Country", "Jazz", "Classical", "Electronic", "Metal", "Indie", "Folk", "Reggae", "Blues", "Soul", "Punk", "Alternative"] },
      { name: "Best Decade for Music", featured: true, entrants: ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"] },
      { name: "Best Musical Instrument", entrants: ["Guitar", "Piano", "Drums", "Violin", "Saxophone", "Bass", "Trumpet", "Flute", "Cello", "Harmonica", "Ukulele", "Banjo", "Clarinet", "Trombone", "Accordion", "Synthesizer"] },
      { name: "Best Album Cover", entrants: ["Dark Side of the Moon", "Abbey Road", "Nevermind", "The Velvet Underground & Nico", "Unknown Pleasures", "Thriller", "Sgt. Pepper's", "Rumours", "OK Computer", "London Calling", "Born in the USA", "Blue (Joni Mitchell)", "Purple Rain", "The Miseducation of Lauryn Hill", "Kid A", "Is This It"] },
      { name: "Best One-Hit Wonder", entrants: ["Toto - Africa", "A-ha - Take On Me", "Soft Cell - Tainted Love", "Dexys - Come On Eileen", "Lipps Inc - Funkytown", "Men at Work - Down Under", "The Vapors - Turning Japanese", "Tommy Tutone - 867-5309", "Nena - 99 Luftballons", "Chumbawamba - Tubthumping", "Right Said Fred - I'm Too Sexy", "Dexy's Midnight Runners", "Gotye - Somebody That I Used to Know", "Hanson - MMMBop", "Vanilla Ice - Ice Ice Baby", "Los Del Rio - Macarena"] },
    ]
  },
  movies: {
    name: "Movies & TV",
    icon: "🎬",
    color: "var(--accent-red)",
    categories: [
      { name: "Best Movie Genre", entrants: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Animation", "Documentary", "Fantasy", "Mystery", "Western", "Musical", "Crime", "Adventure", "War"] },
      { name: "Best Pixar Movie", entrants: ["Toy Story", "Finding Nemo", "The Incredibles", "Up", "WALL-E", "Monsters, Inc.", "Ratatouille", "Inside Out", "Coco", "Toy Story 3", "Finding Dory", "Cars", "Brave", "Soul", "Turning Red", "Elemental"] },
      { name: "Best Christmas Movie", featured: true, entrants: ["Home Alone", "Elf", "A Christmas Story", "It's a Wonderful Life", "Die Hard", "The Polar Express", "How the Grinch Stole Christmas", "National Lampoon's Christmas Vacation", "Miracle on 34th Street", "Love Actually", "A Charlie Brown Christmas", "The Santa Clause", "Scrooged", "White Christmas", "The Nightmare Before Christmas", "Rudolph the Red-Nosed Reindeer"] },
      { name: "Best Movie Villain", featured: true, entrants: ["Darth Vader", "The Joker", "Hannibal Lecter", "Thanos", "Lord Voldemort", "Hans Gruber", "Nurse Ratched", "Anton Chigurh", "Norman Bates", "Agent Smith", "Scar", "Hans Landa", "The Terminator", "Freddy Krueger", "Magneto", "Gollum"] },
      { name: "Best TV Show Ever", featured: true, entrants: ["Breaking Bad", "The Sopranos", "The Wire", "Game of Thrones", "Friends", "Seinfeld", "The Office", "The Simpsons", "Mad Men", "Lost", "Stranger Things", "The Crown", "Band of Brothers", "Succession", "The West Wing", "Arrested Development"] },
      { name: "Best Movie Snack", entrants: ["Popcorn", "M&Ms", "Milk Duds", "Twizzlers", "Nachos", "Raisinets", "Junior Mints", "Sour Patch Kids", "Hot Dog", "Pretzel Bites", "Gummy Bears", "Icee", "Cookie Dough Bites", "Reese's Pieces", "Red Vines", "Buncha Crunch"] },
      { name: "Best Disney Animated Movie", entrants: ["The Lion King", "Beauty and the Beast", "Aladdin", "The Little Mermaid", "Frozen", "Moana", "Mulan", "Tangled", "Cinderella", "Sleeping Beauty", "Snow White", "The Jungle Book", "Pocahontas", "Hercules", "Lilo & Stitch", "Encanto"] },
      { name: "Best Sitcom", entrants: ["Friends", "Seinfeld", "The Office", "Parks and Recreation", "How I Met Your Mother", "Brooklyn Nine-Nine", "Cheers", "Frasier", "30 Rock", "Arrested Development", "Schitt's Creek", "New Girl", "Community", "Modern Family", "It's Always Sunny", "Curb Your Enthusiasm"] },
    ]
  },
  sports: {
    name: "Sports",
    icon: "🏀",
    color: "var(--accent-green)",
    categories: [
      { name: "Best Sport to Watch", entrants: ["Football (NFL)", "Basketball (NBA)", "Baseball (MLB)", "Soccer", "Hockey (NHL)", "Tennis", "Golf", "MMA/UFC", "Boxing", "College Football", "College Basketball", "Formula 1", "Olympics", "Rugby", "Cricket", "Wrestling"] },
      { name: "Best NBA Team", entrants: ["Lakers", "Celtics", "Bulls", "Warriors", "Heat", "Spurs", "Knicks", "76ers", "Nets", "Mavericks", "Nuggets", "Bucks", "Suns", "Clippers", "Rockets", "Thunder"] },
      { name: "Best NFL Team", entrants: ["Cowboys", "Patriots", "Packers", "Steelers", "49ers", "Chiefs", "Bears", "Eagles", "Raiders", "Giants", "Broncos", "Dolphins", "Saints", "Ravens", "Bills", "Seahawks"] },
      { name: "Best Olympic Sport", entrants: ["Gymnastics", "Swimming", "Track & Field", "Basketball", "Soccer", "Volleyball", "Diving", "Figure Skating", "Skiing", "Snowboarding", "Boxing", "Wrestling", "Tennis", "Hockey", "Surfing", "Skateboarding"] },
      { name: "Best Athlete of All Time", featured: true, entrants: ["Michael Jordan", "Muhammad Ali", "Tom Brady", "Serena Williams", "Wayne Gretzky", "Babe Ruth", "LeBron James", "Usain Bolt", "Michael Phelps", "Lionel Messi", "Tiger Woods", "Jim Brown", "Bo Jackson", "Jackie Robinson", "Simone Biles", "Pelé"] },
      { name: "Best Sports Video Game", entrants: ["NBA 2K", "Madden NFL", "FIFA", "MLB The Show", "NHL", "Tony Hawk Pro Skater", "Wii Sports", "Mario Kart", "Rocket League", "PGA Tour", "WWE 2K", "UFC", "SSX Tricky", "NCAA Football", "Mario Tennis", "Golf With Your Friends"] },
    ]
  },
  games: {
    name: "Games & Gaming",
    icon: "🎮",
    color: "var(--accent-blue)",
    categories: [
      { name: "Best Video Game Console", featured: true, entrants: ["PlayStation 5", "Xbox Series X", "Nintendo Switch", "PlayStation 4", "PlayStation 2", "Nintendo 64", "Super Nintendo", "Xbox 360", "Wii", "GameCube", "Sega Genesis", "NES", "Game Boy", "Dreamcast", "PSP", "Steam Deck"] },
      { name: "Best Board Game", featured: true, entrants: ["Monopoly", "Scrabble", "Chess", "Clue", "Risk", "Settlers of Catan", "Ticket to Ride", "Codenames", "Pandemic", "Uno", "Trivial Pursuit", "Battleship", "Life", "Sorry!", "Jenga", "Cards Against Humanity"] },
      { name: "Best Mario Game", entrants: ["Super Mario Bros. 3", "Super Mario World", "Super Mario 64", "Super Mario Odyssey", "Mario Kart 8", "Paper Mario", "Super Mario Galaxy", "Mario Party", "Super Mario Bros.", "New Super Mario Bros.", "Mario Kart: Double Dash", "Super Mario Sunshine", "Mario Kart Wii", "Luigi's Mansion", "Super Smash Bros. Ultimate", "Super Mario RPG"] },
      { name: "Best Video Game Ever", entrants: ["The Legend of Zelda: Ocarina of Time", "Super Mario Bros.", "Tetris", "Minecraft", "GTA V", "The Witcher 3", "Red Dead Redemption 2", "Breath of the Wild", "Elden Ring", "Portal 2", "Half-Life 2", "Mass Effect 2", "Skyrim", "Halo", "God of War", "The Last of Us"] },
      { name: "Best Card Game", entrants: ["Poker", "Blackjack", "Uno", "Exploding Kittens", "Cards Against Humanity", "Magic: The Gathering", "Pokémon TCG", "Skip-Bo", "Phase 10", "Rummy", "Spades", "Hearts", "Solitaire", "Go Fish", "War", "Crazy Eights"] },
      { name: "Best Party Game", entrants: ["Mario Party", "Jackbox Games", "Rock Band", "Guitar Hero", "Just Dance", "Wii Sports", "Super Smash Bros.", "Overcooked", "Fall Guys", "Among Us", "Codenames", "Charades", "Pictionary", "Heads Up!", "Trivia Games", "Beer Pong"] },
    ]
  },
  random: {
    name: "Random & Absurd",
    icon: "🎲",
    color: "var(--accent-pink)",
    categories: [
      { name: "Best Superpower", entrants: ["Flight", "Invisibility", "Super Strength", "Teleportation", "Time Travel", "Mind Reading", "Super Speed", "Shapeshifting", "Immortality", "Telekinesis", "Healing", "X-Ray Vision", "Fire Control", "Ice Powers", "Elasticity", "Talking to Animals"] },
      { name: "Best Mythical Creature", entrants: ["Dragon", "Phoenix", "Unicorn", "Griffin", "Kraken", "Werewolf", "Vampire", "Mermaid", "Centaur", "Pegasus", "Basilisk", "Hydra", "Bigfoot", "Loch Ness Monster", "Yeti", "Thunderbird"] },
      { name: "Best Way to Spend a Snow Day", entrants: ["Sleep In", "Watch Movies", "Build a Snowman", "Hot Chocolate", "Video Games", "Read a Book", "Bake Cookies", "Snowball Fight", "Sledding", "Make Soup", "Puzzle", "Nap", "Clean House", "Online Shopping", "Call Friends", "Build a Blanket Fort"] },
      { name: "Best Smell", featured: true, entrants: ["Fresh Baked Cookies", "Coffee Brewing", "Rain on Pavement", "Gasoline", "Fresh Cut Grass", "Ocean Breeze", "Campfire", "Lavender", "New Car", "Bacon Cooking", "Christmas Tree", "Clean Laundry", "Vanilla", "Bookstore", "BBQ", "Cinnamon"] },
      { name: "Best Month", entrants: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
      { name: "Best Day of the Week", entrants: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      { name: "Best Age to Be", entrants: ["5", "10", "16", "18", "21", "25", "30", "35", "40", "50", "60", "70", "80", "90", "100", "Any Age"] },
      { name: "Best Zoo Animal", entrants: ["Elephant", "Lion", "Giraffe", "Penguin", "Gorilla", "Tiger", "Panda", "Zebra", "Hippo", "Monkey", "Polar Bear", "Flamingo", "Koala", "Kangaroo", "Sea Lion", "Red Panda"] },
      { name: "Best Dog Breed", entrants: ["Golden Retriever", "Labrador", "German Shepherd", "Bulldog", "Poodle", "Beagle", "Husky", "Corgi", "Dachshund", "Boxer", "Great Dane", "Dalmatian", "Pit Bull", "Shih Tzu", "Border Collie", "Rottweiler"] },
      { name: "Best Cat Trait", entrants: ["Purring", "Kneading", "Zoomies", "Loafing", "Hunting Bugs", "Knocking Things Over", "Ignoring You", "Sudden Affection", "Box Obsession", "Laptop Sitting", "3 AM Energy", "Slow Blinks", "Chattering at Birds", "Belly Trap", "Head Bonks", "Judging You"] },
      { name: "Best Excuse to Leave a Party", entrants: ["My Dog Needs Me", "Early Morning Tomorrow", "Not Feeling Well", "Uber's Here", "Parking Meter", "Phone Call", "Baby Sitter", "Irish Goodbye", "Work Emergency", "Forgot Something at Home", "Another Commitment", "Just Tired", "Cat's Acting Weird", "Medication", "Weather's Getting Bad", "Just Vibed Out"] },
      { name: "Best Thing About Mondays", entrants: ["Nothing", "Fresh Start", "Coffee", "Weekend Stories", "Meal Prep Results", "Clean Inbox", "New Week Energy", "Productive Meetings", "Gym's Empty", "TV Shows Return", "Grocery Restocked", "Routines", "Monday Night Football", "Silence After Weekend Chaos", "Hope", "It Ends Eventually"] },
    ]
  },
  holidays: {
    name: "Holidays & Seasons",
    icon: "🎄",
    color: "var(--accent-gold)",
    categories: [
      { name: "Best Holiday", entrants: ["Christmas", "Thanksgiving", "Halloween", "Fourth of July", "Easter", "New Year's Eve", "Valentine's Day", "St. Patrick's Day", "Memorial Day", "Labor Day", "Mother's Day", "Father's Day", "Cinco de Mayo", "Hanukkah", "Super Bowl Sunday", "Your Birthday"] },
      { name: "Best Halloween Candy", entrants: ["Reese's Cups", "Snickers", "Kit Kat", "M&Ms", "Twix", "Skittles", "Candy Corn", "Milky Way", "3 Musketeers", "Butterfinger", "Nerds", "Sour Patch Kids", "Tootsie Rolls", "Jolly Ranchers", "Almond Joy", "Smarties"] },
      { name: "Best Season", entrants: ["Spring", "Summer", "Fall", "Winter"] },
      { name: "Best Holiday Tradition", entrants: ["Decorating the Tree", "Opening Presents", "Big Family Dinner", "Watching Football", "Black Friday Shopping", "Cookie Baking", "Caroling", "Ugly Sweater Party", "Secret Santa", "New Year's Countdown", "Watching Holiday Movies", "Volunteering", "Road Trip Home", "Fireworks", "Parade Watching", "Staying in Pajamas All Day"] },
      { name: "Best Holiday Movie Food", entrants: ["Turkey", "Ham", "Stuffing", "Mashed Potatoes", "Pumpkin Pie", "Eggnog", "Apple Cider", "Gingerbread", "Candy Canes", "Hot Chocolate", "Pecan Pie", "Sweet Potato Casserole", "Latkes", "Fruitcake", "Sugar Cookies", "Prime Rib"] },
    ]
  },
  nye: {
    name: "NYE 2026",
    icon: "🥂",
    color: "#f59e0b",
    categories: [
      { name: "Best NYE Song", featured: true, entrants: ["Auld Lang Syne", "1999 (Prince)", "New Year's Day (U2)", "Celebration (Kool & The Gang)", "Let's Go Crazy", "I Gotta Feeling", "Party in the USA", "Raise Your Glass", "Year 3000", "It's the End of the World", "Closing Time", "New Year's Eve (Snoop)", "Happy (Pharrell)", "Good Riddance (Green Day)", "What a Wonderful World", "Here Comes the Sun"] },
      { name: "Best NYE Tradition", featured: true, entrants: ["Midnight Kiss", "Champagne Toast", "Ball Drop Watch", "Countdown", "Fireworks", "Resolutions", "First Footer", "Noisemakers", "Sparklers", "Eating 12 Grapes", "Wearing White", "Burning Effigies", "Polar Plunge", "Black-Eyed Peas", "Hoppin' John", "Staying Up Till Midnight"] },
      { name: "Best NYE Resolution", featured: true, entrants: ["Exercise More", "Eat Healthier", "Save Money", "Learn Something New", "Read More Books", "Travel More", "Quit Bad Habits", "Spend Time with Family", "Get Organized", "Be More Present", "Start a Side Hustle", "Meditate Daily", "Drink More Water", "Sleep Better", "Less Screen Time", "Say Yes More"] },
      { name: "Best Month of 2025", featured: true, entrants: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
      { name: "Best Movie of 2025", entrants: ["(Add your nominees!)", "Best Picture Contender 1", "Best Picture Contender 2", "Biggest Blockbuster", "Best Comedy", "Best Drama", "Best Action", "Best Animated"] },
      { name: "Best Song of 2025", entrants: ["(Add your nominees!)", "Top Billboard Hit", "Viral TikTok Song", "Best Album Track", "Best Collab", "Song of the Summer", "Best Comeback", "Best New Artist"] },
      { name: "Best NYE Drink", featured: true, entrants: ["Champagne", "Prosecco", "Mimosa", "French 75", "Espresso Martini", "Cosmopolitan", "Manhattan", "Old Fashioned", "Aperol Spritz", "Moscow Mule", "Margarita", "Sparkling Cider", "Hot Toddy", "Mulled Wine", "Mocktail Spritz", "Shirley Temple"] },
      { name: "Best NYE Food", entrants: ["Shrimp Cocktail", "Pigs in a Blanket", "Cheese Board", "Oysters", "Caviar", "Lobster", "Fondue", "Sushi", "Tacos", "Pizza", "Wings", "Sliders", "Deviled Eggs", "Crab Cakes", "Bruschetta", "Chocolate Fondue"] },
      { name: "Best Way to Spend NYE", entrants: ["House Party", "Bar/Club", "Quiet Night In", "Fancy Dinner", "Times Square", "Travel Abroad", "Beach Bonfire", "Rooftop Party", "Game Night", "Concert", "Ski Trip", "Vegas", "Cruise", "Family Gathering", "Netflix Marathon", "Sleeping Through It"] },
      { name: "Best Midnight Moment", entrants: ["The Kiss", "Champagne Pop", "Ball Drop", "Fireworks", "Group Hug", "Countdown Shout", "First Text of the Year", "Stepping Outside", "Noisemakers", "Sparklers", "Dancing", "Crying Happy Tears", "Reflection", "Making a Wish", "Calling Family", "Going to Bed"] },
    ]
  },
  olympics: {
    name: "Olympics",
    icon: "🏅",
    color: "#00a8e8",
    categories: [
      { name: "Winter Olympics Events", entrants: ["Figure Skating", "Alpine Skiing", "Snowboarding", "Ice Hockey", "Speed Skating", "Cross-Country Skiing", "Bobsled", "Ski Jumping", "Biathlon", "Curling", "Freestyle Skiing", "Luge", "Skeleton", "Nordic Combined", "Short Track Speed Skating", "Snowboard Cross"] },
      { name: "Summer Olympics Events", entrants: ["Track & Field", "Swimming", "Gymnastics", "Basketball", "Soccer", "Tennis", "Diving", "Beach Volleyball", "Rowing", "Wrestling", "Boxing", "Cycling", "Weightlifting", "Volleyball", "Water Polo", "Archery"] },
      { name: "All Olympics Events", entrants: ["Figure Skating", "Alpine Skiing", "Snowboarding", "Ice Hockey", "Speed Skating", "Bobsled", "Ski Jumping", "Curling", "Luge", "Track & Field", "Swimming", "Gymnastics", "Basketball", "Soccer", "Tennis", "Diving", "Beach Volleyball", "Rowing", "Wrestling", "Boxing", "Cycling", "Volleyball", "Water Polo", "Archery", "Fencing", "Surfing", "Skateboarding", "Breaking", "Biathlon", "Freestyle Skiing", "Triathlon", "Sailing"] },
    ]
  },
}
