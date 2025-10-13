import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './hooks/useTheme';
import { LanguageProvider } from './hooks/useLanguage';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import DemoPage from './pages/DemoPage';
import ContactPage from './pages/ContactPage';
import ReadmePage from './pages/ReadmePage';
import UGCPage from './pages/UGCPage';
import ChatButton from './components/ChatButton';
import ChatPanel from './components/ChatPanel';
import UGCNavbar from './components/UGCNavbar';
import './assets/styles/globals.css';

const AppContent: React.FC<{ isChatOpen: boolean; toggleChat: () => void; closeChat: () => void }> = ({ 
  isChatOpen, 
  toggleChat, 
  closeChat 
}) => {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === '/ugc' ? <UGCNavbar /> : <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/readme" element={<ReadmePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ugc" element={<UGCPage />} />
        </Routes>
      </main>
      
      {location.pathname !== '/ugc' && (
        <>
          {/* Chat Components */}
          <ChatButton onClick={toggleChat} />
          <ChatPanel isOpen={isChatOpen} onClose={closeChat} />
        </>
      )}
    </div>
  );
};

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
        <HelmetProvider>
          <Router>
            <AppContent 
              isChatOpen={isChatOpen} 
              toggleChat={toggleChat} 
              closeChat={closeChat} 
            />
          </Router>
        </HelmetProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
