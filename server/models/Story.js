const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  mediaLinks: [String],  // Store links to uploaded files
  transcription: { type: String },  // Store speech-to-text content
  tags: [String],  // Topics and keywords
  metadata: {
    sentiment: { 
      type: String, 
      enum: ['positive', 'neutral', 'negative', 'hopeful', 'nostalgic', 'proud', 'sentimental', 'determined', 'joyful', 'heartwarming', 'reflective'] 
    },
    keywords: [String],
    dateReference: { type: Date }  // For timeline organization
  },
  summary: { type: String },  // AI-generated summary
  highlights: [{
    content: { type: String },
    sentiment: { type: String },
    timestamp: { type: Number }  // Position in audio/video
  }],
  hearts: { type: Number, default: 0 },
  comments: [
    {
      user: { type: String, required: true },
      content: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Story', StorySchema);
