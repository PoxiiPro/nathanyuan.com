import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/DemoPage.css';

const DemoPage: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Nathan Yuan - Live Demo | Interactive Portfolio</title>
        <meta name="description" content="Experience Nathan Yuan's live project demos. Interactive demonstrations of web applications and AI integrations." />
        <meta name="keywords" content="Nathan Yuan, demo, live project, interactive, portfolio, AI demo, web app demo" />
        <meta property="og:title" content="Nathan Yuan - Live Demo" />
        <meta property="og:description" content="Try out Nathan Yuan's live project demonstrations." />
        <meta property="og:url" content="https://nathanyuan.com/demo" />
        <link rel="canonical" href="https://nathanyuan.com/demo" />
      </Helmet>
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
    </>
  );
};

export default DemoPage;
