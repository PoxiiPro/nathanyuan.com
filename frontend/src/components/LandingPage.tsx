import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/LandingPage.css';

const LandingPage: React.FC = () => {
  const { translations } = useLanguage();

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
              <a href="#projects" className="btn btn-primary">{translations.landing.cta.viewWork}</a>
              <a href="#ai-assistant" className="btn btn-secondary">{translations.landing.cta.tryAI}</a>
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
                    <span key={index} className="tech-tag">{tech}</span>
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
