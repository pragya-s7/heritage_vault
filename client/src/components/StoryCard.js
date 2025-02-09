import React, { useState, useEffect } from "react";
import { incrementHeart, postComment } from "../api";
import { useAuth0 } from "@auth0/auth0-react";

// Fake transcript data for demo
const fakeTranscripts = {
  "/audio/train_story.webm": "This is the transcription of the train story describing the journey to London.",
  "/audio/philadelphia_story.webm": "This is the transcription of the Philadelphia story covering the first son’s education.",
  "/audio/london_story.webm": "This transcript discusses the family’s bakery establishment in London.",
};

const StoryCard = ({ story }) => {
  const [comment, setComment] = useState("");
  const { user, isAuthenticated } = useAuth0();
  const [hearts, setHearts] = useState(story.hearts); // Track likes
  const [comments, setComments] = useState(story.comments); // Track comments
  const [showTranscript, setShowTranscript] = useState({}); // Toggle visibility

  // Handle heart clicks
  const handleHeartClick = async () => {
    try {
      await incrementHeart(story._id);
      setHearts((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to increment heart:", error);
    }
  };

  // Handle comments
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;
    const commentAuthor = isAuthenticated && user?.name ? user.name : "Anonymous";

    try {
      const newComment = { user: commentAuthor, content: comment };
      await postComment(story._id, newComment);
      setComments((prev) => [...prev, newComment]);
      setComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  // Toggle showing transcript
  const handleToggleTranscript = (index, link) => {
    setShowTranscript((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="card p-8 mb-8">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">{story.title}</h2>
        <span className="px-3 py-1 rounded-full bg-gray-200">
          {story.metadata.sentiment || "neutral"}
        </span>
      </div>

      <div 
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: story.content }}
      />

      {/* Audio Section */}
      {story.mediaLinks && (
        <div className="mt-6">
          <h3 className="font-bold">Audio Recordings</h3>
          {story.mediaLinks.map((link, index) => (
            <div key={index} className="mb-4">
              <audio controls>
                <source src={`http://localhost:3001${link}`} type="audio/webm" />
              </audio>
              <button onClick={() => handleToggleTranscript(index, link)}>
                {showTranscript[index] ? "Hide Transcript" : "Show Transcript"}
              </button>
              {showTranscript[index] && (
                <p>{fakeTranscripts[link] || "Transcript not available"}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Heart Count */}
      <div className="mt-4">
        <button onClick={handleHeartClick} className="bg-red-500 text-white p-2 rounded">
          ❤️ {hearts}
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <h3 className="font-bold">Comments</h3>
        {comments.map((comment, index) => (
          <p key={index}>
            <strong>{comment.user}:</strong> {comment.content}
          </p>
        ))}

        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="border p-2 rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 mt-2">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoryCard;
