/*
  OUR MUSHMALLOW FOREST — THE ONE FILE YOU'LL EDIT MOST OFTEN 💌
  HOW TO ADD A PHOTO:
    1. Upload your photo to the /images folder in this GitHub repository.
    2. Change image: "" to image: "images/my-photo.jpg" below.
    3. Commit your changes. GitHub Pages will republish the site.

  Dates: YYYY-MM-DD (for timeline and travel) or MM-DD (for yearly special days).
  Text marked 'Your...' is a placeholder. Replace it with your own memories.
  For local browser checkboxes, see README — they do NOT sync across devices.
*/

window.SITE_DATA = {
  relationship: {
    websiteTitle: "Our Mushmallow Forest",
    nicknameOne: "Little Pig",
    nicknameTwo: "Little Lion",
    startDate: "2025-10-12T00:00:00", // Local time. Change time if you know it.
    heroLine: "A little forest for the two of us, and all the days still to come.",
    secretMessage: "Psst... I would find you in every universe. ♡",
    closingNote: "To all the places we'll go, the memories we'll make, and the ordinary little days we'll share."
  },

  timeline: [
    { id: "beginning", date: "2025-10-12", title: "The beginning of us", category: "Our first chapter", description: "Our story began on this day. Add your favourite memory of how it all started.", image: "", location: "", emoji: "♡", theme: "peach" },
    { id: "first-date", date: "", title: "A day to remember", category: "Your special memory", description: "Write about one of the first beautiful days you spent together.", image: "", location: "", emoji: "✿", theme: "lavender" },
    { id: "adventure", date: "", title: "Our first adventure", category: "Little adventures", description: "Where did your story take you? Add a photo, date, and the best little details.", image: "", location: "", emoji: "✧", theme: "mint" },
    { id: "birthday", date: "", title: "A special celebration", category: "A day worth keeping", description: "A birthday, a surprise, a laugh — tell the story in your own words.", image: "", location: "", emoji: "★", theme: "butter" },
    { id: "anniversary", date: "2026-10-12", title: "Our first anniversary", category: "One whole year", description: "One year since our story began. Replace this with how you celebrated together.", image: "", location: "", emoji: "♥", theme: "blue" }
  ],

  gallery: [
    { id: "g1", image: "", caption: "The sweetest beginning", date: "2025-10-12", category: "Special occasions", theme: "peach" },
    { id: "g2", image: "", caption: "A little everyday magic", date: "", category: "Everyday happiness", theme: "blue" },
    { id: "g3", image: "", caption: "Our favourite food adventure", date: "", category: "Food adventures", theme: "butter" },
    { id: "g4", image: "", caption: "Somewhere beautiful together", date: "", category: "Travel adventures", theme: "mint" },
    { id: "g5", image: "", caption: "A date worth remembering", date: "", category: "Dates", theme: "lavender" },
    { id: "g6", image: "", caption: "Just you and me", date: "", category: "Everyday happiness", theme: "rose" },
    { id: "g7", image: "", caption: "A little celebration", date: "", category: "Special occasions", theme: "mint" },
    { id: "g8", image: "", caption: "More memories to come", date: "", category: "Travel adventures", theme: "blue" }
  ],

  adventures: [
    { id: "trip1", destination: "Our first getaway", dates: "Add the dates", description: "Write a little postcard about where you went and what made it special.", image: "", theme: "mint", stamp: "01" },
    { id: "trip2", destination: "Somewhere by the sea", dates: "Add the dates", description: "A favourite view, a spontaneous adventure, or a place you'll never forget.", image: "", theme: "blue", stamp: "02" },
    { id: "trip3", destination: "The next adventure", dates: "Whenever we're ready", description: "So many places left to discover — and the best part is going together.", image: "", theme: "peach", stamp: "03" }
  ],

  reasons: [
    "The way you make ordinary days feel special.",
    "How we can laugh about the smallest things.",
    "Every adventure feels better with you.",
    "You're my favourite person to make memories with.",
    "The comfort of simply being next to you.",
    "Every little inside joke that belongs only to us.",
    "The way you listen to my stories.",
    "How even a quiet day feels like an adventure.",
    "The warmth of your hugs after a long day.",
    "How we always have something to look forward to.",
    "All the silly moments that make me smile.",
    "Because my favourite place is wherever we are together."
  ],

  letters: [
    { id: "letter1", date: "12 October 2025", title: "To the beginning of us", preview: "Every beautiful story starts somewhere...", body: "My favourite person,\n\nEvery beautiful story starts somewhere, and ours began on 12 October 2025.\n\nThis is a sample letter. Replace these words with what you truly want to tell each other.\n\nWith all my love,\nMe ♡" },
    { id: "letter2", date: "A letter for someday", title: "For a rainy afternoon", preview: "A little note to make you smile...", body: "To my favourite human,\n\nIf you're reading this on a rainy afternoon, I hope it makes you smile.\n\nThis is a sample letter. Write something that feels exactly like the two of you.\n\nAlways yours ♡" },
    { id: "letter3", date: "Open whenever", title: "For all our tomorrows", preview: "There are still so many adventures ahead...", body: "Dear you,\n\nThere are so many wonderful ordinary days and big adventures ahead of us.\n\nReplace this example with your own letter whenever you're ready.\n\nLove, me ♡" }
  ],

  bucketList: [
    { id: "sunset", text: "Watch a beautiful sunset together" },
    { id: "aurora", text: "See the northern lights" },
    { id: "stargaze", text: "Stargaze under a sky full of stars" },
    { id: "new-country", text: "Visit a new country together" },
    { id: "roadtrip", text: "Go on a spontaneous road trip" },
    { id: "cooking", text: "Cook something completely new together" },
    { id: "christmas", text: "Create our own Christmas traditions" },
    { id: "scrapbook", text: "Fill this little forest with memories" }
  ],

  specialDays: [
    { id: "anniversary", name: "Our anniversary", monthDay: "10-12", emoji: "♥", note: "The day our story began" },
    // Add dates below. Example:
    // { id: "birthday-pig", name: "Little Pig's birthday", monthDay: "08-24", emoji: "✿", note: "Make a wish!" },
    // { id: "birthday-lion", name: "Little Lion's birthday", monthDay: "04-08", emoji: "★", note: "Cake day!" }
  ]
};
