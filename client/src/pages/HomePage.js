import React, { useEffect, useState } from "react";
import { fetchStories } from "../api";
import StoryCard from "../components/StoryCard";

const HomePage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const data = await fetchStories();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    loadStories();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-[var(--color-primary)] mb-6">Family Stories</h1>
      <div>
        {stories.length > 0 ? (
          stories.map((story) => <StoryCard key={story._id} story={story} />)
        ) : (
          <p className="text-lg text-gray-600">No stories available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;