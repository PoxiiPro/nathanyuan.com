import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ReadmePage.css';

const ReadmePage: React.FC = () => {
  const { translations } = useLanguage();
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        // Fetch the README.md from the public directory
        const response = await fetch('/README.md');
        if (!response.ok) {
          throw new Error('Failed to load README.md');
        }
        const content = await response.text();
        setReadmeContent(content);
      } catch (err) {
        setError('Failed to load README.md. Please check if the file exists.');
        console.error('Error fetching README:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, []);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Nathan Yuan - README | Project Documentation</title>
          <meta name="description" content="Read Nathan Yuan's project README and documentation. Learn about his software development projects and technical implementations." />
          <meta name="keywords" content="Nathan Yuan, README, documentation, project details, software development, technical specs" />
          <meta property="og:title" content="Nathan Yuan - README" />
          <meta property="og:description" content="Project documentation and README for Nathan Yuan's portfolio." />
          <meta property="og:url" content="https://nathanyuan.com/readme" />
          <link rel="canonical" href="https://nathanyuan.com/readme" />
        </Helmet>
        <div className="readme-page">
          <div className="container">
            <h1>{translations.nav.readme}</h1>
            <div className="loading">
              <p>{translations.common.loading}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Nathan Yuan - README | Project Documentation</title>
          <meta name="description" content="Read Nathan Yuan's project README and documentation. Learn about his software development projects and technical implementations." />
          <meta name="keywords" content="Nathan Yuan, README, documentation, project details, software development, technical specs" />
          <meta property="og:title" content="Nathan Yuan - README" />
          <meta property="og:description" content="Project documentation and README for Nathan Yuan's portfolio." />
          <meta property="og:url" content="https://nathanyuan.com/readme" />
          <link rel="canonical" href="https://nathanyuan.com/readme" />
        </Helmet>
        <div className="readme-page">
          <div className="container">
            <h1>{translations.nav.readme}</h1>
            <div className="error">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Nathan Yuan - README | Project Documentation</title>
        <meta name="description" content="Read Nathan Yuan's project README and documentation. Learn about his software development projects and technical implementations." />
        <meta name="keywords" content="Nathan Yuan, README, documentation, project details, software development, technical specs" />
        <meta property="og:title" content="Nathan Yuan - README" />
        <meta property="og:description" content="Project documentation and README for Nathan Yuan's portfolio." />
        <meta property="og:url" content="https://nathanyuan.com/readme" />
        <link rel="canonical" href="https://nathanyuan.com/readme" />
      </Helmet>
      <div className="readme-page">
        <div className="container">
          <h1>{translations.nav.readme}</h1>
          <div className="readme-content">
            <ReactMarkdown>{readmeContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadmePage;
