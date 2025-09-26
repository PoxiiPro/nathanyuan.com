import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/AboutPage.css';

const AboutPage: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <section id="about" className="about-page">
      <div className="container">
        <div className="page-content">
          <h1>{translations.nav.about}</h1>
          <div className="content-placeholder">
            <p>{translations.common.underConstruction}</p>
            <p>{translations.common.comingSoon}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
