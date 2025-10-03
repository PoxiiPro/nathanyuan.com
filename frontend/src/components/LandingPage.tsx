import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReact, 
  faPython, 
  faJs
} from '@fortawesome/free-brands-svg-icons';
import { 
  faBrain, 
  faCode,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/LandingPage.css';

const LandingPage: React.FC = () => {
  const { translations } = useLanguage();

  // Function to get the appropriate icon for each technology
  const getTechIcon = (tech: string) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return faReact;
    if (techLower.includes('python')) return faPython;
    if (techLower.includes('javascript')) return faJs;
    if (techLower.includes('typescript')) return faCode;
    if (techLower.includes('postgresql') || techLower.includes('cassandra')) return faDatabase;
    if (techLower.includes('ai') || techLower.includes('ml')) return faBrain;
    return faCode; // Default icon
  };

  return (
    <section id="home" className="landing-page">
      <div className="container">
        <div className="landing-content">
          <div className="landing-text fade-in-up">
            <h1>{translations.landing.greeting} <span className="highlight">{translations.landing.name}</span></h1>
            <h2 className="subtitle">{translations.landing.subtitle}</h2>
            <p className="description">
              {translations.landing.description}
            </p>
            <div className="cta-buttons">
              <a href="/experience" className="btn btn-primary">Learn More</a>
              <a href="/public/Nathan_Yuan_Resume.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Resume</a>
            </div>
          </div>
          <div className="landing-visual fade-in-up">
            <div className="profile-card">
              <div className="profile-image">
                <div className="placeholder-avatar">NY</div>
              </div>
              <div className="profile-info">
                <h3>{translations.landing.name}</h3>
                <p>{translations.landing.profile.title}</p>
                <div className="tech-stack">
                  {translations.landing.profile.techStack.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      <FontAwesomeIcon icon={getTechIcon(tech)} className="tech-icon" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
