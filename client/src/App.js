import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import StoryDashboard from './pages/StoryDashboard';
import StoryRecordingPage from './pages/StoryRecordingPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './app/globals.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSidebarCollapsed(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-background)] flex">
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1">
          <Header isCollapsed={isSidebarCollapsed} />
          <main className="py-6 px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<StoryDashboard />} />
              <Route path="/record" element={<StoryRecordingPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;