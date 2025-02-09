const mongoose = require('mongoose');
const Story = require('./models/Story');  // Ensure the path to the Story model is correct

require('dotenv').config();  // Load environment variables from .env

// Array of story objects
const stories = [
  {
    title: 'The Train Ride to Tomorrow',
    content: `In the early 1950s, a young woman from a small village in Punjab made the courageous decision to leave her homeland. Boarding a train bound for Bombay, she carried with her memories of her ancestral home as she embarked on a journey to London. The bustling streets of her village, the aroma of home-cooked meals, and the vibrant festivals were etched in her heart as she navigated a new life in a foreign land.`,
    tags: ['Immigration', 'New Beginnings', 'Courage', 'Cultural Pride'],
    metadata: {
      sentiment: 'hopeful',
      keywords: ['Immigration', 'Courage', 'Cultural Pride'],
      dateReference: new Date('1950-05-15'),
    },
    summary: 'A young Punjabi woman’s journey from her village to London in the 1950s, carrying her cultural heritage into a new world.',
    highlights: [
      { content: 'Leaving her family at the train station, tears mixed with hope.', sentiment: 'nostalgic', timestamp: 0 },
      { content: 'Writing letters back home, sharing her experiences and longing.', sentiment: 'hopeful', timestamp: 0 },
      { content: 'Arriving in London with only her sari and a suitcase, determined to build a new life.', sentiment: 'determined', timestamp: 0 },
    ],
    mediaLinks: [
      'https://pixabay.com/photos/indian-railway-train-railway-tracks-1683481/', // Public domain image
      'https://www.youtube.com/watch?v=XEhOnOF7zOg'  // Example YouTube video for nostalgic Indian songs
    ],
  },
  {
    title: 'From London to Liberty Bell',
    content: `In the 1970s, her eldest son earned a scholarship to study engineering at the University of Pennsylvania. The transition was challenging, with homesickness and cultural adjustments. However, he found solace in South Asian student organizations and weekend calls home, bridging the gap between his roots and his aspirations.`,
    tags: ['Education', 'Family Sacrifice', 'Immigration', 'Dreams Fulfilled'],
    metadata: {
      sentiment: 'reflective',
      keywords: ['Education', 'Family Sacrifice', 'Dreams'],
      dateReference: new Date('1975-09-01'),
    },
    summary: 'The eldest son’s academic journey from London to Philadelphia, balancing ambition with cultural heritage.',
    highlights: [
      { content: 'Receiving the acceptance letter, a moment of pride and anticipation.', sentiment: 'joyful', timestamp: 0 },
      { content: 'Making chai in his dorm, the aroma bringing back memories of home.', sentiment: 'nostalgic', timestamp: 0 },
      { content: 'Graduation day, stepping into a new chapter with a blend of cultures.', sentiment: 'proud', timestamp: 0 },
    ],
    mediaLinks: [
      'https://archives.upenn.edu/digitized-resources/photos/1970s-campus-life/', // University of Pennsylvania campus
      'https://www.youtube.com/watch?v=1J_wObZqFg4' // Example link to Indian instrumental music
    ],
  },
  {
    title: 'The Baker’s Table',
    content: `Following his mother's footsteps, the second son established a bakery in Southall, London’s "Little India." The bakery became a cultural hub, offering traditional sweets that connected the diaspora to their roots. His two daughters embraced the family legacy, learning and preserving recipes passed down through generations.`,
    tags: ['Tradition', 'Food', 'Family Bonds', 'Intergenerational'],
    metadata: {
      sentiment: 'heartwarming',
      keywords: ['Tradition', 'Family', 'Cuisine'],
      dateReference: new Date('1985-08-20'),
    },
    summary: 'The second son’s journey in London, using culinary traditions to keep cultural connections alive.',
    highlights: [
      { content: 'The first batch of samosas, flavors reminiscent of his mother’s kitchen.', sentiment: 'nostalgic', timestamp: 0 },
      { content: 'Teaching his daughters the art of making parathas, passing on the legacy.', sentiment: 'sentimental', timestamp: 0 },
      { content: 'Hosting Diwali celebrations at the bakery, a fusion of community and tradition.', sentiment: 'joyful', timestamp: 0 },
    ],
    mediaLinks: [
      'https://www.youtube.com/watch?v=XEhOnOF7zOg',  // Indian classical background music
      'https://www.pexels.com/photo/flat-lay-photography-of-pita-bread-5088021/'  // Free image of South Asian bread
    ],
  },
  {
    title: 'Bridging Two Worlds',
    content: `Growing up in Philadelphia, the eldest son’s children navigated the complexities of dual identities. Embracing both American and South Asian cultures, they participated in cultural shows, family trips to London and India, and cherished stories from their grandmother, ensuring that their rich heritage remained a vital part of their lives.`,
    tags: ['Identity', 'Dual Culture', 'Family Legacy', 'Modern South Asians'],
    metadata: {
      sentiment: 'reflective',
      keywords: ['Identity', 'Culture', 'Heritage'],
      dateReference: new Date('2000-11-10'),
    },
    summary: 'The next generation’s journey in balancing and embracing dual cultural identities in America.',
    highlights: [
      { content: 'Performing traditional dances at cultural shows, a blend of old and new.', sentiment: 'proud', timestamp: 0 },
      { content: 'Family trips to ancestral lands, connecting with their roots.', sentiment: 'nostalgic', timestamp: 0 },
      { content: 'Reading grandmother’s letters, a window into the past.', sentiment: 'inspiring', timestamp: 0 },
    ],
    mediaLinks: [
      'https://www.youtube.com/watch?v=ZGRN7l1XV2A',  // Traditional South Asian cultural performances
      'https://commons.wikimedia.org/wiki/File:Diwali_festival_in_India.jpg'  // Free Diwali festival image
    ],
  },
];

// Connect to MongoDB and insert stories
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB.');

    // Insert stories
    const result = await Story.insertMany(stories);
    console.log(`${result.length} stories inserted successfully.`);

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('Error seeding the database:', err);
  }
}

// Run the seed function
seedDatabase();