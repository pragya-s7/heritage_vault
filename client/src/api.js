import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:3001/api" });

// Stories
export const fetchStories = async (filters = {}) => {
  try {
    const { startDate, endDate, sentiment } = filters;
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (sentiment) params.append('sentiment', sentiment);
    
    const response = await API.get('/stories', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
};

// Timeline
export const fetchTimeline = async () => {
  try {
    const response = await API.get('/stories/timeline');
    return response.data;
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return [];
  }
};

// Story Highlights
export const fetchStoryHighlights = async (storyId) => {
  try {
    const response = await API.get(`/stories/${storyId}/highlights`);
    return response.data;
  } catch (error) {
    console.error('Error fetching highlights:', error);
    return [];
  }
};

// Create/Update Story
export const createStory = async (formData) => {
  try {
    const response = await API.post('/stories/create', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
};

export const updateStory = async (id, storyData) => {
  try {
    const response = await API.put(`/stories/update/${id}`, storyData);
    return response.data;
  } catch (error) {
    console.error('Error updating story:', error);
    throw error;
  }
};

// Transcription and Analysis
export const fetchTranscript = async (audioPath, storyId) => {
  try {
    const response = await API.post("/transcripts", { audioPath, storyId });
    return response.data.transcript;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return "Transcript unavailable";
  }
};

export const processStoryContent = async (content, storyId) => {
  try {
    const response = await API.post("/nlp/process-story", { content, storyId });
    return response.data;
  } catch (error) {
    console.error("Error processing story:", error);
    throw error;
  }
};

// Social Features
export const incrementHeart = async (id) => {
  try {
    const response = await API.patch(`/stories/${id}/heart`);
    return response.data;
  } catch (error) {
    console.error('Error incrementing heart:', error);
    throw error;
  }
};

export const postComment = async (id, commentData) => {
  try {
    const response = await API.post(`/stories/${id}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
};
