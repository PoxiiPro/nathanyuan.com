import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import '../assets/styles/Navbar.css';

const UGCNavbar: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/ugc">{translations.landing.name}</Link>
          </div>
          <ul className="navbar-nav">
            <li><a href="#niches">{translations.nav.demos}</a></li>
            <li><a href="#about-me">{translations.nav.aboutMe}</a></li>
            <li><a href="#contact" className="contact-anchor">{translations.nav.contact}</a></li>
          </ul>
          <div className="navbar-actions">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UGCNavbar;
