import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ProjectsPage.css';

const ProjectsPage: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Nathan Yuan - Projects | Software Development Portfolio</title>
        <meta name="description" content="View Nathan Yuan's software development projects. Showcasing web applications, AI integrations, and full-stack development work." />
        <meta name="keywords" content="Nathan Yuan, projects, portfolio, software development, React, Python, AI projects, web applications" />
        <meta property="og:title" content="Nathan Yuan - Projects" />
        <meta property="og:description" content="Explore Nathan Yuan's software development projects and portfolio." />
        <meta property="og:url" content="https://nathanyuan.com/projects" />
        <link rel="canonical" href="https://nathanyuan.com/projects" />
      </Helmet>
      <section id="projects" className="projects-page">
        <div className="container">
          <div className="page-content">
            <h1>{translations.nav.projects}</h1>
            <div className="content-placeholder">
              <p>{translations.common.underConstruction}</p>
              <p>{translations.common.comingSoon}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
