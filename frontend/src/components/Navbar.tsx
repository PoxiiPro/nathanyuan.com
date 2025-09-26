import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import '../assets/styles/Navbar.css';

const Navbar: React.FC = () => {
  const { translations } = useLanguage();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/">{translations.landing.name}</Link>
          </div>
          <ul className="navbar-nav">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>{translations.nav.home}</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>{translations.nav.about}</Link></li>
            <li><Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>{translations.nav.projects}</Link></li>
            <li><Link to="/demo" className={location.pathname === '/demo' ? 'active' : ''}>{translations.nav.demo}</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>{translations.nav.contact}</Link></li>
          </ul>
          <div className="navbar-actions">
            <ThemeToggle />
            <LanguageSelector />
          </div>
          <div className="navbar-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
