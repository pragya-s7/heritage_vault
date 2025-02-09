const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Story = require('../models/Story');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/process-story', async (req, res) => {
  const { content, storyId } = req.body;

  if (!storyId) {
    return res.status(400).json({ error: 'Story ID is required' });
  }

  try {
    // Use Gemini 1.5 Pro for text analysis
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Build the AI prompt
    const prompt = `Analyze the following story and provide:
1) Key topics/tags (comma-separated)
2) Sentiment (Positive/Negative/Neutral)
3) Brief summary
4) Key dates mentioned (YYYY-MM-DD format)
5) Important highlights (3-4 key moments with their sentiment)

Story: ${content}

Format your response exactly as:
Topics: [topics]
Sentiment: [sentiment]
Summary: [summary]
Dates: [dates]
Highlights:
- [highlight 1] [sentiment1]
- [highlight 2] [sentiment2]
- [highlight 3] [sentiment3]`;

    // Send the prompt to Gemini AI
    const result = await model.generateContent({ text: prompt });

    // Parse AI response safely
    const analysis = result.response.text();
    if (!analysis) {
      throw new Error('No response text received from Gemini AI.');
    }

    const sections = analysis.split('\n\n');

    // Safely extract sections with default fallback values
    const tags = sections[0]?.split(':')[1]?.trim()?.split(',').map(tag => tag.trim()) || [];
    const sentiment = sections[1]?.split(':')[1]?.trim() || 'neutral';
    const summary = sections[2]?.split(':')[1]?.trim() || 'No summary provided';
    const dates = sections[3]?.split(':')[1]?.trim()?.split(',').map(date => date.trim()) || [];
    const highlightsRaw = sections[4]?.split(':')[1]?.trim()?.split('\n') || [];

    const highlights = highlightsRaw.map(highlight => {
      const [content, sentiment] = highlight.split(' [');
      return {
        content: content?.trim() || 'No highlight provided',
        sentiment: sentiment ? sentiment.replace(']', '').trim() : 'neutral',
        timestamp: 0 // Default timestamp since we can't determine position in audio
      };
    });

    // Update the story with extracted information
    await Story.findByIdAndUpdate(storyId, {
      tags,
      metadata: {
        sentiment,
        keywords: tags,
        dateReference: dates[0] || null, // Use first mentioned date as reference, if available
      },
      summary,
      highlights,
    });

    res.status(200).json({ tags, sentiment, summary, dates, highlights });
  } catch (error) {
    console.error("Error processing story with AI:", error.message || error);
    res.status(500).json({ error: 'Failed to process story content.' });
  }
});

module.exports = router;