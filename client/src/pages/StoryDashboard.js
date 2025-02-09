import React, { useEffect, useState } from "react";
import { fetchStories } from "../api";
import StoryCard from "../components/StoryCard";

function StoryDashboard() {
  const [stories, setStories] = useState([]);
  const [sortedStories, setSortedStories] = useState([]);
  const [sortType, setSortType] = useState("latest");
  const [sentimentFilter, setSentimentFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch stories with optional sentiment filter
        const data = await fetchStories({
          sentiment: sentimentFilter === "all" ? undefined : sentimentFilter,
        });
        setStories(data);
        setSortedStories(sortStories(data, sortType));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, [sortType, sentimentFilter]);

  const sortStories = (stories, type) => {
    switch (type) {
      case "latest":
        return [...stories].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return [...stories].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "mostLiked":
        return [...stories].sort((a, b) => b.hearts - a.hearts);
      case "trending":
        return [...stories].sort((a, b) => {
          const scoreA = a.hearts + 1 / (Date.now() - new Date(a.createdAt));
          const scoreB = b.hearts + 1 / (Date.now() - new Date(b.createdAt));
          return scoreB - scoreA;
        });
      case "random":
        return [...stories].sort(() => Math.random() - 0.5);
      default:
        return stories;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-[var(--color-primary)] mb-6">Story Dashboard</h1>

      {/* Sorting and Sentiment Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={sentimentFilter}
          onChange={(e) => setSentimentFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Sentiments</option>
          <option value="positive">Positive</option>
          <option value="neutral">Neutral</option>
          <option value="negative">Negative</option>
          <option value="hopeful">Hopeful</option>
          <option value="nostalgic">Nostalgic</option>
          <option value="heartwarming">Heartwarming</option>
          <option value="reflective">Reflective</option>
          <option value="proud">Proud</option>
          <option value="sentimental">Sentimental</option>
          <option value="determined">Determined</option>
          <option value="joyful">Joyful</option>
        </select>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="latest">Latest Posts</option>
          <option value="oldest">Oldest Posts</option>
          <option value="mostLiked">Most Liked Posts</option>
          <option value="trending">Trending Posts</option>
          <option value="random">Random Order</option>
        </select>
      </div>

      {/* Story List */}
      <div>
        {sortedStories.length > 0 ? (
          sortedStories.map((story) => <StoryCard key={story._id} story={story} />)
        ) : (
          <p className="text-lg text-gray-600">No stories available.</p>
        )}
      </div>
    </div>
  );
}

export default StoryDashboard;