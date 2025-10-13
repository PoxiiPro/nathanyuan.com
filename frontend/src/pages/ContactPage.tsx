import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ContactPage.css';

const ContactPage: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Nathan Yuan - Contact | Get In Touch</title>
        <meta name="description" content="Contact Nathan Yuan, Cleared AI Full-Stack Software Engineer. Reach out for collaboration, job opportunities, or project inquiries." />
        <meta name="keywords" content="Nathan Yuan, contact, software engineer, hire, collaboration, LinkedIn, email" />
        <meta property="og:title" content="Nathan Yuan - Contact" />
        <meta property="og:description" content="Get in touch with Nathan Yuan for software development opportunities." />
        <meta property="og:url" content="https://nathanyuan.com/contact" />
        <link rel="canonical" href="https://nathanyuan.com/contact" />
      </Helmet>
      <section id="contact" className="contact-page">
        <div className="container">
          <div className="contact-hero fade-in-up">
            <h1>{translations.nav.contact}</h1>
            <p className="contact-subtitle">{translations.contact.subtitle}</p>
          </div>
          <div className="contact-columns">
            <div className="contact-info">
              <h2><i className="fas fa-envelope"></i> {translations.contact.emailLabel}</h2>
              <a href="mailto:contact@NathanYuan.com" className="contact-email">contact@NathanYuan.com</a>
              <h2><i className="fas fa-location-dot"></i> {translations.contact.locationLabel}</h2>
              <p className="contact-location">{translations.contact.location}</p>
              <h2><i className="fab fa-linkedin"></i> {translations.contact.linkedinLabel}</h2>
              <a href="https://www.linkedin.com/in/nathanyuan00/" className="contact-linkedin" target="_blank" rel="noopener noreferrer">{translations.contact.linkedinUrl}</a>
            </div>
            <div className="contact-work">
              <h2><i className="fas fa-briefcase"></i> {translations.contact.workLabel}</h2>
              <ul>
                <li>{translations.contact.fullTime}</li>
                <li>{translations.contact.based}</li>
                <li>{translations.contact.relocate}</li>
                <li><strong>{translations.contact.citizen}</strong> {translations.contact.clearance}</li>
              </ul>
            </div>
          </div>
          <div className="contact-disclaimer">
            <p><em>{translations.contact.disclaimer}</em></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
