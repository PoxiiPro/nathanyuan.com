import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ContactPage.css';

const ContactPage: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <section id="contact" className="contact-page">
      <div className="container">
        <div className="page-content">
          <h1>{translations.nav.contact}</h1>
          <div className="content-placeholder">
            <p>{translations.common.underConstruction}</p>
            <p>{translations.common.comingSoon}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
