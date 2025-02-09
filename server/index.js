const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  // Import path module
require('dotenv').config();

const userRoutes = require('./routes/user');
const storyRoutes = require('./routes/story');
const transcriptRoutes = require('./routes/transcript');
const nlpRoutes = require('./routes/nlp');  // Import NLP route

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/transcripts', transcriptRoutes);
app.use('/api/nlp', nlpRoutes);  // Register NLP route

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Static path for uploads

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
