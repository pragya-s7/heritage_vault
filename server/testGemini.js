const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();  // Load environment variables from .env file

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

async function testGemini() {
  try {
    console.log("Testing Gemini API connection...");

    // Correct model and method for version 0.21.0
    const response = await genAI.generateText({
      model: "models/text-bison-001",
      prompt: "Hello, how are you?",
    });

    console.log("Response from Gemini AI:", response.candidates[0].output);
  } catch (error) {
    console.error("Error connecting to Gemini API:", error);
  }
}

testGemini();