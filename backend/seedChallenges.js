// seedChallenges.js
const mongoose = require("mongoose");
const Challenge = require("./models/Challenges"); // adjust path if needed
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const challenges = [
  // ==== Original 60 challenges ====
  // Easy (10 points)
  { title: "Give a Compliment", description: "Say something kind to a stranger or a friend today.", difficulty: "Easy", points: 10 },
  { title: "10 Push-ups", description: "Do 10 push-ups to boost your energy.", difficulty: "Easy", points: 10 },
  { title: "Drink Water", description: "Drink 8 glasses of water today.", difficulty: "Easy", points: 10 },
  { title: "Smile at Someone", description: "Smile at 3 people you meet today.", difficulty: "Easy", points: 10 },
  { title: "Morning Stretch", description: "Do a 5-minute stretch routine in the morning.", difficulty: "Easy", points: 10 },
  { title: "Read a Quote", description: "Read an inspirational quote and reflect on it.", difficulty: "Easy", points: 10 },
  { title: "Declutter Desk", description: "Tidy up your workspace or study area.", difficulty: "Easy", points: 10 },
  { title: "Mindful Breathing", description: "Take 5 minutes to focus on your breath.", difficulty: "Easy", points: 10 },
  { title: "Thank Someone", description: "Send a thank-you message to someone today.", difficulty: "Easy", points: 10 },
  { title: "Take a Walk", description: "Go for a 10-minute walk outside.", difficulty: "Easy", points: 10 },
  // Medium (15–20 points)
  { title: "Gratitude Journal", description: "Write down 3 things you are grateful for today.", difficulty: "Medium", points: 15 },
  { title: "Digital Detox", description: "Stay away from social media for 2 hours straight.", difficulty: "Medium", points: 20 },
  { title: "Cook a Meal", description: "Prepare a healthy meal for yourself or someone else.", difficulty: "Medium", points: 15 },
  { title: "No Sugar", description: "Avoid sugary snacks for the whole day.", difficulty: "Medium", points: 15 },
  { title: "Meditation", description: "Meditate for 10 minutes focusing on your breath.", difficulty: "Medium", points: 15 },
  { title: "Read a Chapter", description: "Read one chapter of a book today.", difficulty: "Medium", points: 15 },
  { title: "Try a New Hobby", description: "Spend 20 minutes trying something you’ve never done before.", difficulty: "Medium", points: 15 },
  { title: "Compliment 3 People", description: "Give genuine compliments to 3 people.", difficulty: "Medium", points: 20 },
  { title: "Stretch & Move", description: "Do 15 minutes of yoga or exercise.", difficulty: "Medium", points: 15 },
  { title: "Plan Your Day", description: "Write a schedule for your day to stay productive.", difficulty: "Medium", points: 15 },
  // Hard (25–30 points)
  { title: "Public Speaking Practice", description: "Record yourself speaking for 2 minutes about a random topic.", difficulty: "Hard", points: 30 },
  { title: "Cold Shower", description: "Take a cold shower to challenge yourself.", difficulty: "Hard", points: 25 },
  { title: "30-Minute Workout", description: "Complete a 30-minute workout session.", difficulty: "Hard", points: 30 },
  { title: "No Complaining", description: "Go a full day without complaining.", difficulty: "Hard", points: 25 },
  { title: "Learn Something New", description: "Spend 30 minutes learning a new skill or concept.", difficulty: "Hard", points: 30 },
  { title: "Random Act of Kindness", description: "Do something kind for a stranger without expecting anything in return.", difficulty: "Hard", points: 30 },
  { title: "Digital Fast", description: "Avoid all screens for 4 hours.", difficulty: "Hard", points: 30 },
  { title: "Write a Letter", description: "Write a thoughtful letter to someone important in your life.", difficulty: "Hard", points: 30 },
  { title: "Early Wake-Up", description: "Wake up 2 hours earlier than usual and plan your morning.", difficulty: "Hard", points: 25 },
  { title: "Declutter a Room", description: "Completely clean and organize one room in your house.", difficulty: "Hard", points: 25 },
  // Bonus / Mixed
  { title: "1km Run", description: "Go for a 1km run to challenge your stamina.", difficulty: "Medium", points: 15 },
  { title: "Social Challenge", description: "Talk to someone you haven’t met before.", difficulty: "Hard", points: 30 },
  { title: "Photography Challenge", description: "Take 5 creative photos around your home or neighborhood.", difficulty: "Medium", points: 15 },
  { title: "No Caffeine", description: "Avoid coffee or tea for the entire day.", difficulty: "Medium", points: 15 },
  { title: "Learn a Tongue Twister", description: "Practice and record yourself saying a difficult tongue twister.", difficulty: "Medium", points: 15 },
  { title: "Compliment Yourself", description: "Write down 5 things you like about yourself.", difficulty: "Easy", points: 10 },
  { title: "Stretch Challenge", description: "Hold a plank for 2 minutes straight.", difficulty: "Hard", points: 30 },
  { title: "Volunteer Task", description: "Help someone in need or volunteer for 30 minutes.", difficulty: "Hard", points: 30 },
  { title: "Mindful Eating", description: "Eat one meal mindfully without distractions.", difficulty: "Medium", points: 15 },
  { title: "No Phone Before Bed", description: "Avoid using your phone 1 hour before sleep.", difficulty: "Medium", points: 15 },

  // ==== Additional 60 new challenges ====
  // Easy
  { title: "Compliment Your Colleague", description: "Say something kind to a coworker today.", difficulty: "Easy", points: 10 },
  { title: "Organize Your Bag", description: "Clean and organize your backpack or purse.", difficulty: "Easy", points: 10 },
  { title: "Drink Herbal Tea", description: "Have a cup of herbal tea to relax.", difficulty: "Easy", points: 10 },
  { title: "Send a Happy Message", description: "Send a positive message to a friend.", difficulty: "Easy", points: 10 },
  { title: "Walk Your Pet", description: "Take your pet for a 10-minute walk.", difficulty: "Easy", points: 10 },
  { title: "Listen to Music", description: "Listen to a song that makes you happy.", difficulty: "Easy", points: 10 },
  { title: "Organize a Drawer", description: "Pick one drawer and tidy it up.", difficulty: "Easy", points: 10 },
  { title: "Say Hello to a Stranger", description: "Greet someone new today.", difficulty: "Easy", points: 10 },
  { title: "Postive Affirmations", description: "Write down 3 positive affirmations.", difficulty: "Easy", points: 10 },
  { title: "Drink a Glass of Lemon Water", description: "Start your day with lemon water.", difficulty: "Easy", points: 10 },
  { title: "Take Deep Breaths", description: "Practice 5 deep breathing cycles.", difficulty: "Easy", points: 10 },
  { title: "Compliment a Family Member", description: "Say something nice to a family member.", difficulty: "Easy", points: 10 },
  { title: "Make Your Bed", description: "Neatly make your bed in the morning.", difficulty: "Easy", points: 10 },
  { title: "Stretch Your Neck", description: "Do a 2-minute neck stretch.", difficulty: "Easy", points: 10 },
  { title: "Drink a Glass of Water Before Meal", description: "Hydrate before eating.", difficulty: "Easy", points: 10 },
  { title: "Smile at Yourself", description: "Smile at yourself in the mirror.", difficulty: "Easy", points: 10 },
  { title: "Send a Thank You Note", description: "Thank someone for their help today.", difficulty: "Easy", points: 10 },
  { title: "Clean Your Desk", description: "Spend 5 minutes cleaning your desk.", difficulty: "Easy", points: 10 },
  { title: "Hydrate Regularly", description: "Drink water every hour.", difficulty: "Easy", points: 10 },
  { title: "Organize Your Phone", description: "Clean up apps and notifications.", difficulty: "Easy", points: 10 },

  // Medium
  { title: "30-Minute Walk", description: "Take a brisk 30-minute walk.", difficulty: "Medium", points: 15 },
  { title: "Cook a New Recipe", description: "Try cooking a recipe you've never made before.", difficulty: "Medium", points: 15 },
  { title: "Read a News Article", description: "Read a news article and summarize it.", difficulty: "Medium", points: 15 },
  { title: "No Social Media 3 Hours", description: "Avoid social media for 3 hours.", difficulty: "Medium", points: 20 },
  { title: "Plan Tomorrow", description: "Write down your plan for tomorrow.", difficulty: "Medium", points: 15 },
  { title: "Journal Your Thoughts", description: "Write your thoughts for 10 minutes.", difficulty: "Medium", points: 15 },
  { title: "Try Meditation App", description: "Meditate using a meditation app.", difficulty: "Medium", points: 15 },
  { title: "Do a Random Act of Kindness", description: "Help someone without them knowing.", difficulty: "Medium", points: 20 },
  { title: "Learn 5 New Words", description: "Expand your vocabulary today.", difficulty: "Medium", points: 15 },
  { title: "Write a Short Poem", description: "Create a 4-line poem.", difficulty: "Medium", points: 15 },
  // Hard
  { title: "1 Hour Cold Shower", description: "Take a cold shower for 1 hour.", difficulty: "Hard", points: 30 },
  { title: "Fast for 12 Hours", description: "Do a 12-hour intermittent fast.", difficulty: "Hard", points: 25 },
  { title: "Run 5km", description: "Go for a 5km run.", difficulty: "Hard", points: 30 },
  { title: "Write an Essay", description: "Write a 500-word essay on a topic of choice.", difficulty: "Hard", points: 30 },
  { title: "Speak to Stranger for 10 mins", description: "Talk to someone new for 10 minutes.", difficulty: "Hard", points: 30 },
  { title: "Do a 50-Minute Workout", description: "Complete an intense 50-minute workout.", difficulty: "Hard", points: 30 },
  { title: "Declutter Entire Room", description: "Completely clean a room.", difficulty: "Hard", points: 25 },
  { title: "Digital Detox Full Day", description: "Avoid all screens for a full day.", difficulty: "Hard", points: 30 },
  { title: "Create a Painting", description: "Paint something creative.", difficulty: "Hard", points: 30 },
];

async function seedChallenges() {
  try {
    await Challenge.deleteMany(); // clear existing
    await Challenge.insertMany(challenges);
    console.log("Challenges seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

seedChallenges();
