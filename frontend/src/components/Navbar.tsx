import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import Modal from './Modal';
import BugReport from './BugReport';
import '../assets/styles/Navbar.css';

const Navbar: React.FC = () => {
  const { translations } = useLanguage();
  const location = useLocation();
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/">{translations.landing.name}</Link>
          </div>
          <ul className="navbar-nav">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>{translations.nav.home}</Link></li>
            <li><Link to="/experience" className={location.pathname === '/experience' ? 'active' : ''}>{translations.nav.about}</Link></li>
            <li><Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>{translations.nav.projects}</Link></li>
            <li><Link to="/demo" className={location.pathname === '/demo' ? 'active' : ''}>{translations.nav.demo}</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>{translations.nav.contact}</Link></li>
            <li><Link to="/readme" className={location.pathname === '/readme' ? 'active' : ''}>{translations.nav.readme}</Link></li>
          </ul>
          <div className="navbar-actions">
            <ThemeToggle />
            <LanguageSelector />
            <button 
              className="bug-report-button"
              onClick={() => setIsBugReportOpen(true)}
              aria-label={translations.bugReport.button}
              title={translations.bugReport.button}
            >
              <i className="fas fa-bug"></i>
              <span className="bug-report-text">{translations.bugReport.button}</span>
            </button>
          </div>
          <div className="navbar-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isBugReportOpen}
        onClose={() => setIsBugReportOpen(false)}
        title={translations.bugReport.title}
        maxWidth="600px"
      >
        <BugReport onClose={() => setIsBugReportOpen(false)} />
      </Modal>
    </nav>
  );
};

export default Navbar;
