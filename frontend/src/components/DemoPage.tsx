import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/DemoPage.css';

const DemoPage: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <section id="demo" className="demo-page">
      <div className="container">
        <div className="page-content">
          <h1>{translations.nav.demo}</h1>
          <div className="content-placeholder">
            <p>{translations.common.underConstruction}</p>
            <p>{translations.common.comingSoon}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoPage;
