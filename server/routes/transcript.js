const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { VertexAI } = require("@google-cloud/vertexai");
const Story = require("../models/Story");

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID; // Ensure this is set in your environment

// Initialize Vertex AI Client
const vertexAI = new VertexAI({ project: process.env.GOOGLE_CLOUD_PROJECT_ID, location: "us-central1" });

router.post("/", async (req, res) => {
  const { audioPath, storyId } = req.body;
  const audioFilePath = path.join(__dirname, "..", audioPath);

  console.log("Resolved audio file path:", audioFilePath);

  if (!fs.existsSync(audioFilePath)) {
    return res.status(404).json({ error: "Audio file not found." });
  }

  try {
    // Upload the audio to Google Cloud Storage if needed, or directly provide file URI
    const fileUri = `gs://${process.env.YOUR_BUCKET_NAME}/audio/${path.basename(audioFilePath)}`;

    const filePart = {
      file_data: {
        file_uri: fileUri,
        mime_type: "audio/mpeg", // Adjust based on the file format
      },
    };

    const textPart = {
      text: `
      Can you transcribe this audio in the format of timecode, speaker, and caption?
      Use speaker A, speaker B, etc., to identify speakers.`,
    };

    const generativeModel = vertexAI.getGenerativeModel({
      model: "gemini-1.5-flash-001",
    });

    const request = {
      contents: [{ role: "user", parts: [filePart, textPart] }],
    };

    const resp = await generativeModel.generateContent(request);
    const contentResponse = await resp.response;

    console.log("Transcript generated:", contentResponse);

    // Save the transcription to the story
    if (storyId) {
      await Story.findByIdAndUpdate(storyId, { transcription: contentResponse });
    }

    res.json({ transcript: contentResponse });
  } catch (error) {
    console.error("Error generating transcript:", error);
    res.status(500).json({ error: "Failed to generate transcript." });
  }
});

module.exports = router;