const mongoose = require('mongoose');
require('dotenv').config();
const Story = require('./models/Story');  // Adjust path if needed

// Sample comments data
const commentsData = {
  "The Train Ride to Tomorrow": [
    { user: "Raj", content: "I can feel the emotions through this story. It reminds me of my grandparents' stories about partition." },
    { user: "Aisha", content: "What a beautifully told story. Leaving everything behind must have taken so much courage." }
  ],
  "From London to Liberty Bell": [
    { user: "Priya", content: "Your description of making chai to deal with homesickness hit me so hard. I’ve been there." },
    { user: "Arjun", content: "I admire how you carried your mom’s dreams along with your own. Truly inspiring!" }
  ],
  "The Baker’s Table": [
    { user: "Suman", content: "Nothing brings back memories like the smell of home-cooked food. What a lovely story!" },
    { user: "Kavita", content: "I can’t wait to visit your bakery someday! It sounds like it’s filled with love and history." }
  ],
  "Bridging Two Worlds": [
    { user: "Anjali", content: "I’ve always felt this balance between two cultures too. You described it perfectly." },
    { user: "Ravi", content: "Visiting the ancestral home is such a profound experience. Thanks for sharing this!" }
  ],
  "The Dance of Two Cultures": [
    { user: "Meera", content: "What a magical wedding day! The part about the bhangra dancing is my favorite." },
    { user: "John", content: "As someone married into a South Asian family, I can relate to this on every level!" }
  ],
  "A Summer at Nani’s House": [
    { user: "Neha", content: "I had a similar summer with my grandmother, and this story brought back so many memories." },
    { user: "Samir", content: "There’s something about those childhood summers in India that’s unforgettable." }
  ],
  "The Call That Changed Everything": [
    { user: "Vikram", content: "What a heartwarming story of family support. It’s beautiful how success is shared in the family." },
    { user: "Anita", content: "This story shows how every small step contributes to the bigger journey. Truly inspiring!" }
  ]
};

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const addFakeComments = async () => {
  try {
    // Loop through each story and add corresponding comments
    for (const [storyTitle, comments] of Object.entries(commentsData)) {
      // Find the story by title
      const story = await Story.findOne({ title: storyTitle });
      if (story) {
        // Append the new comments to the existing comments
        story.comments = [...story.comments, ...comments];
        await story.save();
        console.log(`Added comments to story: ${story.title}`);
      } else {
        console.log(`Story not found: ${storyTitle}`);
      }
    }

    console.log('All comments added successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding comments:', error);
    mongoose.connection.close();
  }
};

// Execute the function
addFakeComments();