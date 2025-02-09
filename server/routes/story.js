const express = require('express');
const multer = require('multer');
const path = require('path');
const Story = require('../models/Story');

const router = express.Router();

// Helper function to validate date format
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/audio');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// GET all stories with optional timeline filtering
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, sentiment } = req.query;
    
    let query = {};
    
    // Add date range filter if provided
    if (startDate || endDate) {
      if (startDate && !isValidDate(startDate)) {
        return res.status(400).json({ error: 'Invalid start date format' });
      }
      if (endDate && !isValidDate(endDate)) {
        return res.status(400).json({ error: 'Invalid end date format' });
      }
      
      query['metadata.dateReference'] = {};
      if (startDate) query['metadata.dateReference'].$gte = new Date(startDate);
      if (endDate) query['metadata.dateReference'].$lte = new Date(endDate);
    }
    
    // Add sentiment filter if provided
    if (sentiment) {
      query['metadata.sentiment'] = sentiment;
    }
    
    const stories = await Story.find(query).sort({ 'metadata.dateReference': 1 });
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve stories.' });
  }
});

// GET stories grouped by year for timeline
router.get('/timeline', async (req, res) => {
  try {
    const stories = await Story.find({ 'metadata.dateReference': { $exists: true } })
      .sort({ 'metadata.dateReference': 1 });
    
    // Group stories by year
    const timeline = stories.reduce((acc, story) => {
      if (story.metadata?.dateReference) {
        const year = new Date(story.metadata.dateReference).getFullYear();
        if (!acc[year]) {
          acc[year] = {
            year,
            events: []
          };
        }
        acc[year].events.push({
          title: story.title,
          description: story.summary || story.content,
          media: story.mediaLinks,
          date: story.metadata.dateReference,
          sentiment: story.metadata.sentiment
        });
      }
      return acc;
    }, {});
    
    res.status(200).json(Object.values(timeline));
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate timeline.' });
  }
});

// GET story highlights
router.get('/:id/highlights', async (req, res) => {
  try {
    const story = await Story.findById(req.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story.highlights || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve highlights.' });
  }
});

// Handle story creation with audio upload and form fields
router.post('/create', upload.fields([{ name: 'audio', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, content, tags, dateReference } = req.body;
    const audioPath = req.files.audio ? `/uploads/audio/${req.files.audio[0].filename}` : null;

    // Validate date if provided
    if (dateReference && !isValidDate(dateReference)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const newStory = new Story({
      title,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      mediaLinks: audioPath ? [audioPath] : [],
      metadata: {
        dateReference: dateReference ? new Date(dateReference) : null
      }
    });

    const savedStory = await newStory.save();

    // If there's audio, process it for transcription and NLP analysis
    if (audioPath) {
      // We'll let the client handle these calls asynchronously
      res.status(201).json({
        story: savedStory,
        message: 'Story created. Processing audio for transcription and analysis.'
      });
    } else {
      res.status(201).json({ story: savedStory });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Increment heart count
router.patch('/:id/heart', async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { $inc: { hearts: 1 } },
      { new: true }
    );
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: 'Failed to increment heart count.' });
  }
});

module.exports = router;
