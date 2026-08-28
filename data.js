// Owais's Bucks Weekend — Fri 4 Sept to Sun 6 Sept
// Edit this file directly to change attendees, itinerary or task assignments.

const attendees = [
  { name: "Owais",  nights: 2, note: "The Bucks!" },
  { name: "Kash",   nights: 2 },
  { name: "Khurram", nights: 2 },
  { name: "Ali",    nights: 2 },
  { name: "Sulai",  nights: 2 },
  { name: "Immi",   nights: 2 },
  { name: "Harris", nights: 2 },
  { name: "Jamal",  nights: 2 },
  { name: "Usamah", nights: 2 },
  { name: "Omair",  nights: 2 },
  { name: "Omar",   nights: 1 },
  { name: "Haseeb", nights: 1, note: "Arriving Saturday" },
  { name: "Fahad",  nights: 1, note: "Driving back Saturday night" },
];

const itinerary = [
  {
    day: "Friday 4th September",
    items: [
      { time: "After Jummah", title: "Lunch", detail: "Everyone on their own" },
      { time: "Evening", title: "Arrive & settle in", detail: "Get to the house, set up rooms" },
      { time: "Dinner", title: "Group Dinner", detail: "Biryani" },
      { time: "Night", title: "Games night", detail: "Board games, Xbox, projector" },
    ],
  },
  {
    day: "Saturday 5th September",
    items: [
      { time: "Morning", title: "Breakfast", detail: "Eggs, croissants, coffee runs" },
      { time: "Midday", title: "Activities", detail: "Cricket, footy/soccer, pool" },
      { time: "Lunch", title: "Group Lunch", detail: "Might just be Friday night's leftovers — Sulai & Haseeb to have a backup plan" },
      { time: "Afternoon", title: "Haseeb arrives", detail: "" },
      { time: "Evening", title: "Fahad heads off", detail: "Driving back Saturday night" },
      { time: "Dinner", title: "Group Dinner", detail: "Pizza 🍕" },
      { time: "Night", title: "Firepit & shisha", detail: "" },
    ],
  },
  {
    day: "Sunday 6th September",
    items: [
      { time: "Morning", title: "Breakfast", detail: "Group breakfast" },
      { time: "Late morning", title: "Pack up & depart", detail: "Clean up the house before leaving" },
    ],
  },
];

// category: "munchies" | "drinks" | "meal" | "games" | "gear" | "personal" | "other"
// day: "Friday" | "Saturday" | "Sunday" | "Any"
const tasks = [
  // Personal — everyone brings their own
  ...attendees.map(a => ({
    id: `towel-${a.name.toLowerCase()}`,
    category: "personal",
    description: "Your own towel — for swimming etc.",
    assignedTo: [a.name],
    day: "Any",
  })),

  // Munchies — everyone brings something
  { id: "m-owais",  category: "munchies", description: "Munchies — chips", assignedTo: ["Haseeb"], day: "Any" },
  { id: "m-kash",   category: "munchies", description: "Munchies — chocolate", assignedTo: ["Kash"], day: "Any" },
  { id: "m-ks",     category: "munchies", description: "Munchies — lollies/candy", assignedTo: ["Khurram"], day: "Any" },
  { id: "m-ali",    category: "munchies", description: "Munchies — chips", assignedTo: ["Ali"], day: "Any" },
  { id: "m-sulai",  category: "munchies", description: "Munchies — chocolate", assignedTo: ["Sulai"], day: "Any" },
  { id: "m-immi",   category: "munchies", description: "Munchies — lollies/candy", assignedTo: ["Immi"], day: "Any" },
  { id: "m-harris", category: "munchies", description: "Munchies — chips", assignedTo: ["Kash"], day: "Any" },
  { id: "m-jamal",  category: "munchies", description: "Munchies — chocolate", assignedTo: ["Jamal"], day: "Any" },
  { id: "m-usamah", category: "munchies", description: "Munchies — lollies/candy", assignedTo: ["Usamah"], day: "Any" },
  { id: "m-omar",   category: "munchies", description: "Munchies — chips", assignedTo: ["Omar"], day: "Any" },
  { id: "m-haseeb", category: "munchies", description: "Munchies — chocolate", assignedTo: ["Haseeb"], day: "Any" },
  { id: "m-fahad",  category: "munchies", description: "Munchies — lollies/candy", assignedTo: ["Fahad"], day: "Any" },
  { id: "m-omair",  category: "munchies", description: "Munchies — chips", assignedTo: ["Omair"], day: "Any" },

  // Drinks
  { id: "drinks-1", category: "drinks", description: "Coke cans & water bottles", assignedTo: ["Usamah"], day: "Any" },
  { id: "drinks-2", category: "drinks", description: "Extra water bottles", assignedTo: ["Omar"], day: "Any" },

  // Games / entertainment / gear
  { id: "games-1", category: "games", description: "Board games, poker set & other card games", assignedTo: ["Kash"], day: "Any" },
  { id: "games-2", category: "games", description: "Extra board games & deck of cards", assignedTo: ["Immi"], day: "Any" },
  { id: "games-3a", category: "gear", description: "Xbox #1 + 3 controllers", assignedTo: ["Harris"], day: "Any" },
  { id: "games-3b", category: "gear", description: "Xbox #2 + 3 controllers", assignedTo: ["Usamah"], day: "Any" },
  { id: "games-3c", category: "gear", description: "2 spare Xbox controllers", assignedTo: ["Ali"], day: "Any" },
  { id: "games-4", category: "gear", description: "Projector + screen (night before/Friday night)", assignedTo: ["Omair"], day: "Friday" },
  { id: "games-5", category: "gear", description: "Speakers & aux cable", assignedTo: ["Omair"], day: "Any" },
  { id: "games-6", category: "games", description: "Shortlist of highly demanded movies", assignedTo: ["Owais"], day: "Any" },
  { id: "games-7", category: "gear", description: "Backup Projector Screen Cloth", assignedTo: ["Harris"], day: "Any" },
  { id: "esky-1", category: "drinks", description: "Esky & ice, plus drinks (Holsten, Coke, etc)", assignedTo: ["Khurram"], day: "Any" },

  // Cricket / outdoor gear
  { id: "gear-1", category: "gear", description: "Cricket bat, stumps, tape", assignedTo: ["Ali", "Sulai"], day: "Any" },
  { id: "gear-2", category: "gear", description: "Tennis balls + tape", assignedTo: ["Ali", "Sulai"], day: "Any" },
  { id: "gear-3", category: "gear", description: "Footy / soccer ball", assignedTo: ["Immi"], day: "Any" },

  // Friday dinner
  { id: "friday-dinner", category: "meal", description: "Friday dinner — Biryani (order & pickup)", assignedTo: ["Harris"], day: "Friday" },

  // Saturday breakfast
  { id: "sat-brekky-1", category: "meal", description: "Saturday breakfast — eggs, milk, croissants, coffee run", assignedTo: ["Fahad", "Jamal"], day: "Saturday" },
  { id: "sat-brekky-2", category: "other", description: "Plastic cups & plates", assignedTo: ["Khurram"], day: "Saturday" },
  { id: "sat-brekky-3", category: "other", description: "Tissues & serviettes", assignedTo: ["Jamal"], day: "Saturday" },

  // Saturday lunch
  { id: "sat-lunch", category: "meal", description: "Saturday lunch — plan for a backup, might just be Friday night's leftovers", assignedTo: ["Sulai", "Haseeb"], day: "Saturday" },

  // Saturday dinner
  { id: "sat-dinner", category: "meal", description: "Saturday dinner — Pizza order", assignedTo: ["Usamah", "Immi"], day: "Saturday" },

  // Sunday breakfast
  { id: "sun-brekky", category: "meal", description: "Sunday breakfast", assignedTo: ["Omar", "Omair"], day: "Sunday" },

  // Salad
  { id: "salad-1", category: "meal", description: "Salad + Desserts for Chai", assignedTo: ["Kash", "Khurram"], day: "Any" },

  // Misc / Fahad's stuff
  { id: "fire-1", category: "other", description: "Firewood & firestarters", assignedTo: ["Fahad"], day: "Any" },
  { id: "fire-2", category: "other", description: "Shisha", assignedTo: ["Fahad"], day: "Any" },
];
