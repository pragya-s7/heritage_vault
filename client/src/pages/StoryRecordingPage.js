import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createStory } from '../api';

// Custom toolbar options with multimedia support
const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image', 'video'],
  ['clean']
];



function StoryRecordingPage() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [quillContent, setQuillContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!mediaRecorder) return;

    const handleDataAvailable = (e) => {
      if (e.data.size > 0) {
        setAudioBlob(e.data);
        const audioUrl = URL.createObjectURL(e.data);
        setAudioUrl(audioUrl);
      }
    };

    mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
    return () => {
      mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
    };
  }, [mediaRecorder]);

  const handleStorySubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', quillContent || '');
      formData.append('tags', tags || '');
      if (audioBlob) {
        formData.append('audio', audioBlob, 'story-audio.webm');
      }

      await createStory(formData);
      alert('Story saved successfully!');
      resetForm();
    } catch (err) {
      console.error('Error saving story:', err);
      alert('An error occurred while submitting the story.');
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setTags('');
    setQuillContent('');
    setAudioBlob(null);
    setAudioUrl('');
    setIsRecording(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Microphone access is required to record audio.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold text-[var(--color-primary)]">Share Your Story</h1>
      <p className="text-lg text-gray-700">Record your memories through text or audio.</p>

      <form onSubmit={handleStorySubmit} className="space-y-8">
        <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-[var(--color-primary)] mb-2">
              Story Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Give your story a memorable title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-lg font-semibold text-[var(--color-primary)] mb-2">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              placeholder="family, vacation, childhood"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <label className="block text-lg font-semibold text-[var(--color-primary)] mb-2">
            Story Content
          </label>
          <ReactQuill
            theme="snow"
            value={quillContent}
            onChange={setQuillContent}
            modules={{ toolbar: toolbarOptions }}
            placeholder="Share your story here..."
            className="min-h-[200px]"
          />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Audio Recording</h3>
          <p className="text-sm text-gray-600">Add a personal touch with your voice.</p>

          <div className="flex gap-4 mt-4">
            {isRecording ? (
              <button
                type="button"
                onClick={stopRecording}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Stop Recording
              </button>
            ) : (
              <button
                type="button"
                onClick={startRecording}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Start Recording
              </button>
            )}
          </div>

          {audioUrl && (
            <div className="mt-4">
              <audio controls src={audioUrl} className="w-full"></audio>
            </div>
          )}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={processing}
            className={`w-full py-3 text-lg font-semibold rounded-lg ${
              processing ? 'bg-gray-400' : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)]'
            }`}
          >
            {processing ? 'Processing...' : 'Share Your Story'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoryRecordingPage;
