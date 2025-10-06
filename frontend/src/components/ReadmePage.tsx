import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
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
      <div className="readme-page">
        <div className="container">
          <h1>{translations.nav.readme}</h1>
          <div className="loading">
            <p>{translations.common.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="readme-page">
        <div className="container">
          <h1>{translations.nav.readme}</h1>
          <div className="error">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="readme-page">
      <div className="container">
        <h1>{translations.nav.readme}</h1>
        <div className="readme-content">
          <ReactMarkdown>{readmeContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ReadmePage;
