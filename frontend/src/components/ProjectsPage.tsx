import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ProjectsPage.css';

const ProjectsPage: React.FC = () => {
  const { translations } = useLanguage();

  return (
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
  );
};

export default ProjectsPage;
