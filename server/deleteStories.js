const mongoose = require('mongoose');
const Story = require('./models/Story');  // Adjust the path if needed

require('dotenv').config();  // To load environment variables from a .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connected to MongoDB');

    // Delete all stories
    const result = await Story.deleteMany({});
    console.log(`Deleted ${result.deletedCount} stories.`);

    // Close the connection
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });