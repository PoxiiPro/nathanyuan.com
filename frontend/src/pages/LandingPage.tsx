import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  const profilePictureUrl = 'profile_picture.jpeg';

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
    <>
      <Helmet>
        <title>Nathan Yuan - Portfolio</title>
        <meta name="description" content="Nathan Yuan - Cleared AI Full-Stack Software Engineer. Portfolio showcasing modern web applications with machine learning and AI integrations." />
        <meta name="keywords" content="Nathan Yuan, software engineer, full-stack developer, AI engineer, React, Python, TypeScript, portfolio, machine learning, web development" />
        <meta property="og:title" content="Nathan Yuan - Portfolio" />
        <meta property="og:description" content="Cleared AI Full-Stack Software Engineer. Building modern web applications with AI and ML integrations." />
        <meta property="og:image" content="https://nathanyuan.com/og-image.jpg" />
        <meta property="og:url" content="https://nathanyuan.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nathan Yuan - Portfolio" />
        <meta name="twitter:description" content="Cleared AI Full-Stack Software Engineer. Building modern web applications with AI and ML integrations." />
        <meta name="twitter:image" content="https://nathanyuan.com/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Nathan Yuan",
            "jobTitle": "Cleared AI Full-Stack Software Engineer",
            "description": "I build modern web applications with machine learning and artificial intelligence integrations while collaborating with clients to deliver impactful solutions.",
            "url": "https://nathanyuan.com",
            "sameAs": [
              "https://github.com/nathanyuan", // Replace with actual if available
              "https://linkedin.com/in/nathanyuan" // Replace with actual
            ],
            "knowsAbout": ["React", "Python", "AI/ML", "TypeScript", "JavaScript", "PostgreSQL", "Cassandra"],
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Software Engineer",
              "occupationLocation": {
                "@type": "Country",
                "name": "United States"
              }
            }
          })}
        </script>
      </Helmet>
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
                <a href="/experience" className="btn btn-primary">{translations.landing.cta.learnMore}</a>
                <a href="/Nathan_Yuan_Resume.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">{translations.landing.cta.resume}</a>
              </div>
            </div>
            <div className="landing-visual fade-in-up">
              <div className="profile-card">
                <img
                  src={profilePictureUrl}
                  alt="Profile Picture"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                  className="profile-picture"
                />
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
    </>
  );
};

export default LandingPage;
