import React from 'react';
import { useTheme } from '../hooks/useTheme';
import '../assets/styles/ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
