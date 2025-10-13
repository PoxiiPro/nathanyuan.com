import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useLanguage } from '../hooks/useLanguage';
import Modal from '../components/Modal';
import '../assets/styles/UGCPage.css';

const UGCPage: React.FC = () => {
  const { translations } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Sample YouTube video IDs for each niche (you can replace these with your actual unlisted video IDs)
  const videoPlaceholders = {
    lifestyle: Array(5).fill('dQw4w9WgXcQ'), // Replace with actual video IDs
    fitness: Array(5).fill('dQw4w9WgXcQ'),
    food: Array(5).fill('dQw4w9WgXcQ'),
    tech: Array(5).fill('dQw4w9WgXcQ'),
    fashion: Array(5).fill('dQw4w9WgXcQ'),
    skincare: Array(5).fill('dQw4w9WgXcQ')
  };

  // Profile picture placeholder - replace with your actual image
  const profilePictureUrl = '/images/nathan-profile.jpg';

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="ugc-page">
      {/* Hero Section */}
      <section className="ugc-hero">
        <div className="ugc-hero-content">
          <div className="hero-profile">
            <div className="profile-image-container">
              <img 
                src={profilePictureUrl} 
                alt="Nathan Yuan - UGC Creator" 
                className="profile-image"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiMzQjgyRjYiLz4KPHN2ZyB4PSIzMCIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                }}
              />
              <div className="profile-status">
                <span className="status-dot"></span>
                <span className="status-text">Available for collaborations</span>
              </div>
            </div>
          </div>
          
          <div className="hero-text">
            <h1 className="ugc-title">{translations.ugc.title}</h1>
            <p className="ugc-tagline">{translations.ugc.tagline}</p>
            
            <div className="hero-cta">
              <button 
                className="cta-button cta-primary"
                onClick={scrollToContact}
              >
                <span>{translations.ugc.cta.getQuote}</span>
                <span>→</span>
              </button>
              <a 
                href="#niches" 
                className="cta-button cta-secondary"
              >
                <span>{translations.ugc.cta.viewDemo}</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="ugc-about">
        <h2 className="section-title">{translations.ugc.about.title}</h2>
        <p className="section-description">{translations.ugc.about.description}</p>
      </section>

      {/* Niches Section */}
      <section id="niches" className="ugc-niches">
        <div className="niches-container">
          <h2 className="section-title">{translations.ugc.niches.title}</h2>
          
          <div className="niches-grid">
            {/* Lifestyle */}
            <div className="niche-card">
              <h3 className="niche-title">{translations.ugc.niches.lifestyle.title}</h3>
              <p className="niche-description">{translations.ugc.niches.lifestyle.description}</p>
              <div className="demo-videos">
                {videoPlaceholders.lifestyle.map((videoId, index) => (
                  <div 
                    key={index}
                    className="video-placeholder"
                    onClick={() => handleVideoClick(videoId)}
                    title={`Lifestyle Demo ${index + 1}`}
                    data-video-number={index + 1}
                  />
                ))}
              </div>
            </div>

            {/* Fitness */}
            <div className="niche-card">
              <h3 className="niche-title">{translations.ugc.niches.fitness.title}</h3>
              <p className="niche-description">{translations.ugc.niches.fitness.description}</p>
              <div className="demo-videos">
                {videoPlaceholders.fitness.map((videoId, index) => (
                  <div 
                    key={index}
                    className="video-placeholder"
                    onClick={() => handleVideoClick(videoId)}
                    title={`Fitness Demo ${index + 1}`}
                    data-video-number={index + 1}
                  />
                ))}
              </div>
            </div>

            {/* Food */}
            <div className="niche-card">
              <h3 className="niche-title">{translations.ugc.niches.food.title}</h3>
              <p className="niche-description">{translations.ugc.niches.food.description}</p>
              <div className="demo-videos">
                {videoPlaceholders.food.map((videoId, index) => (
                  <div 
                    key={index}
                    className="video-placeholder"
                    onClick={() => handleVideoClick(videoId)}
                    title={`Food Demo ${index + 1}`}
                    data-video-number={index + 1}
                  />
                ))}
              </div>
            </div>

            {/* Tech */}
            <div className="niche-card">
              <h3 className="niche-title">{translations.ugc.niches.tech.title}</h3>
              <p className="niche-description">{translations.ugc.niches.tech.description}</p>
              <div className="demo-videos">
                {videoPlaceholders.tech.map((videoId, index) => (
                  <div 
                    key={index}
                    className="video-placeholder"
                    onClick={() => handleVideoClick(videoId)}
                    title={`Tech Demo ${index + 1}`}
                    data-video-number={index + 1}
                  />
                ))}
              </div>
            </div>

            {/* Fashion */}
            <div className="niche-card">
              <h3 className="niche-title">{translations.ugc.niches.fashion.title}</h3>
              <p className="niche-description">{translations.ugc.niches.fashion.description}</p>
              <div className="demo-videos">
                {videoPlaceholders.fashion.map((videoId, index) => (
                  <div 
                    key={index}
                    className="video-placeholder"
                    onClick={() => handleVideoClick(videoId)}
                    title={`Fashion Demo ${index + 1}`}
                    data-video-number={index + 1}
                  />
                ))}
              </div>
            </div>

            {/* Skincare */}
            <div className="niche-card">
              <h3 className="niche-title">{translations.ugc.niches.skincare.title}</h3>
              <p className="niche-description">{translations.ugc.niches.skincare.description}</p>
              <div className="demo-videos">
                {videoPlaceholders.skincare.map((videoId, index) => (
                  <div 
                    key={index}
                    className="video-placeholder"
                    onClick={() => handleVideoClick(videoId)}
                    title={`Skincare Demo ${index + 1}`}
                    data-video-number={index + 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="ugc-contact">
        <div className="contact-container">
          <h2 className="section-title">{translations.ugc.contact.title}</h2>
          <p className="section-description">{translations.ugc.contact.description}</p>
          
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-label">Email</div>
              <div className="contact-value">
                <a href={`mailto:${translations.ugc.contact.email}`} className="contact-email">
                  {translations.ugc.contact.email}
                </a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-label">Starting Rate</div>
              <div className="contact-value">{translations.ugc.contact.rates}</div>
            </div>
            
            <div className="contact-item">
              <div className="contact-label">Turnaround</div>
              <div className="contact-value">{translations.ugc.contact.turnaround}</div>
            </div>
          </div>

          <h3 className="section-title social-title">
            {translations.ugc.social.title}
          </h3>
          
          <div className="social-links">
            <a 
              href={`https://instagram.com/${translations.ugc.social.instagram.replace('@', '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
              <span>{translations.ugc.social.instagram}</span>
            </a>
            
            <a 
              href={`https://tiktok.com/${translations.ugc.social.tiktok.replace('@', '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link tiktok"
            >
              <FontAwesomeIcon icon={faTiktok} className="social-icon" />
              <span>{translations.ugc.social.tiktok}</span>
            </a>
            
            <a 
              href={`https://youtube.com/${translations.ugc.social.youtube.replace('@', '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link youtube"
            >
              <FontAwesomeIcon icon={faYoutube} className="social-icon" />
              <span>{translations.ugc.social.youtube}</span>
            </a>
          </div>

          <div className="final-cta">
            <button 
              className="cta-button cta-primary"
              onClick={() => window.location.href = `mailto:${translations.ugc.contact.email}?subject=UGC Collaboration Inquiry`}
            >
              <span>{translations.ugc.cta.contact}</span>
              <span>✉</span>
            </button>
          </div>
        </div>
      </section>

      {/* Demographics Section */}
      <section className="ugc-demographics">
        <div className="demographics-container">
          <h2 className="section-title">{translations.ugc.demographics.title}</h2>
          <p className="section-description">{translations.ugc.demographics.description}</p>
          
          <div className="demographics-placeholder">
            <div className="graph-placeholder">
              <div className="placeholder-icon">📊</div>
              <p>Demographic Outreach Graph</p>
              <small>Coming soon with real data</small>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        title={translations.ugc.video.modalTitle}
        maxWidth="800px"
      >
        {selectedVideo && (
          <div className="video-modal-content">
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                title="UGC Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-footer">
              <p>{translations.ugc.video.modalDescription}</p>
              <button 
                className="cta-button cta-primary"
                onClick={() => {
                  closeVideoModal();
                  scrollToContact();
                }}
              >
                <span>{translations.ugc.cta.contact}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UGCPage;