import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ExperiencePage.css';

const ExperiencePage: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Nathan Yuan - Experience | Software Engineer Portfolio</title>
        <meta name="description" content="Explore Nathan Yuan's professional experience as a Cleared AI Full-Stack Software Engineer. Technical expertise in React, Python, AI/ML, and modern web development." />
        <meta name="keywords" content="Nathan Yuan, experience, software engineer, AI engineer, React, Python, TypeScript, professional background" />
        <meta property="og:title" content="Nathan Yuan - Experience" />
        <meta property="og:description" content="Professional experience and technical skills of Nathan Yuan, AI Full-Stack Software Engineer." />
        <meta property="og:url" content="https://nathanyuan.com/experience" />
        <link rel="canonical" href="https://nathanyuan.com/experience" />
      </Helmet>
      <div className="experience-page">
        <div className="experience-content">
          <h1 className="experience-title">{translations.experiencePage.title}</h1>
          
          <section className="experience-section">
            <div className="experience-card">
              <h2 className="experience-section-title">{translations.experiencePage.technicalExperience.title}</h2>
              <ul>
                {translations.experiencePage.technicalExperience.jobs.map((job, index) => (
                  <li key={index} className="experience-list-item">
                    <strong>{job.title}</strong><br />
                    <span>{job.company} • {job.period}</span>
                    {job.description && <em dangerouslySetInnerHTML={{ __html: job.description }} />}
                    <ul>
                      {job.bullets.map((bullet, bIndex) => (
                        <li key={bIndex}>{bullet}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="experience-section">
            <div className="experience-card">
              <h2 className="experience-section-title">{translations.experiencePage.leadershipManagement.title}</h2>
              <ul>
                {translations.experiencePage.leadershipManagement.jobs.map((job, index) => (
                  <li key={index} className="experience-list-item">
                    <strong>{job.title}</strong><br />
                    <span>{job.company} • {job.period}</span>
                    <ul>
                      {job.bullets.map((bullet, bIndex) => (
                        <li key={bIndex}>{bullet}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="experience-section">
            <div className="experience-card">
              <h2 className="experience-section-title">{translations.experiencePage.educationCertifications.title}</h2>
              <ul>
                {translations.experiencePage.educationCertifications.items.map((item, index) => (
                  <li key={index} className="experience-list-item">
                    <strong>{item.title}</strong><br />
                    <span>{item.subtitle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="experience-section">
            <div className="experience-card">
              <h2 className="experience-section-title">{translations.experiencePage.technicalSkills.title}</h2>
              <ul>
                {translations.experiencePage.technicalSkills.skills.map((skill, index) => (
                  <li key={index} className="experience-list-item">
                    <strong>{skill.category}:</strong> {skill.items}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ExperiencePage;
