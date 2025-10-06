import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { LanguageProvider } from './hooks/useLanguage';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ExperiencePage from './components/ExperiencePage';
import ProjectsPage from './components/ProjectsPage';
import DemoPage from './components/DemoPage';
import ContactPage from './components/ContactPage';
import ReadmePage from './components/ReadmePage';
import ChatButton from './components/ChatButton';
import ChatPanel from './components/ChatPanel';
import './assets/styles/globals.css';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/readme" element={<ReadmePage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            
            {/* Chat Components */}
            <ChatButton onClick={toggleChat} />
            <ChatPanel isOpen={isChatOpen} onClose={closeChat} />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
