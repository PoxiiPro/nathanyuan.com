import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faChevronUp, faChevronDown, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import '../assets/styles/UGCPage.css';

const FALLBACK_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiMzQjgyRjYiLz4KPHN2ZyB4PSIzMCIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=';

const PLACEHOLDER_ID = 'dQw4w9WgXcQ';

const VIDEO_PLACEHOLDERS = {
  tech:      ['9h1Z6i0ZMlY', ...Array(2).fill(PLACEHOLDER_ID)],
  grooming:  Array(3).fill(PLACEHOLDER_ID),
  style:     Array(3).fill(PLACEHOLDER_ID),
  lifestyle: ['e6AqYYMOJ3k', ...Array(2).fill(PLACEHOLDER_ID)],
};

// Flat ordered list of real video IDs for the swipe feed
const ALL_VIDEOS = [
  ...VIDEO_PLACEHOLDERS.tech,
  ...VIDEO_PLACEHOLDERS.grooming,
  ...VIDEO_PLACEHOLDERS.style,
  ...VIDEO_PLACEHOLDERS.lifestyle,
].filter(id => id !== PLACEHOLDER_ID);


const UGCPage: React.FC = () => {
  const { translations } = useLanguage();
  const { isDarkMode, setDarkMode } = useTheme();

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<'up' | 'down' | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const slidingRef = useRef(false);
  const touchStartY = useRef(0);

  const profilePictureUrl = '/images/ugc_profile_picture.jpg';

  // Force dark mode on mount, restore on unmount
  useEffect(() => {
    const prev = isDarkMode;
    setDarkMode(true);
    return () => { setDarkMode(prev); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard navigation
  useEffect(() => {
    if (!isVideoModalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp')   goToPrev();
      if (e.key === 'ArrowDown') goToNext();
      if (e.key === 'Escape')    closeVideoModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isVideoModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = (dir: 'up' | 'down') => {
    if (slidingRef.current) return;
    slidingRef.current = true;
    setSlideDir(dir);
    setTimeout(() => {
      setCurrentVideoIndex(prev =>
        dir === 'up'
          ? Math.min(prev + 1, ALL_VIDEOS.length - 1)
          : Math.max(prev - 1, 0)
      );
      setSlideDir(null);
      slidingRef.current = false;
    }, 300);
  };

  const goToNext = () => navigate('up');
  const goToPrev = () => navigate('down');

  const openVideoAt = (videoId: string) => {
    const idx = ALL_VIDEOS.indexOf(videoId);
    if (idx < 0) return;
    setCurrentVideoIndex(idx);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSlideDir(null);
    slidingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (delta > 50)  goToNext(); // swipe up → next
    if (delta < -50) goToPrev(); // swipe down → prev
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(translations.ugc.contact.email)
      .then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      })
      .catch(() => {});
  };

  const ytThumb = (videoId: string) =>
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const renderClips = (ids: string[], label: string) =>
    ids.map((videoId, index) => {
      const isSoon = videoId === PLACEHOLDER_ID;
      return (
        <div
          key={index}
          className={`video-placeholder${isSoon ? ' video-coming-soon' : ''}`}
          onClick={isSoon ? undefined : () => openVideoAt(videoId)}
          title={isSoon ? translations.ugc.video.comingSoon : `${label} ${index + 1}`}
          data-video-number={isSoon ? undefined : index + 1}
          style={isSoon ? undefined : {
            backgroundImage: `url(${ytThumb(videoId)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      );
    });

  return (
    <div className="ugc-page">
      <div className="ugc-layout">

        {/* ── LEFT STICKY SIDEBAR ── */}
        <aside className="creator-sidebar">

          <div className="sidebar-profile">
            <img
              src={profilePictureUrl}
              alt={translations.landing.name}
              className="profile-image"
              onClick={() => setIsProfileModalOpen(true)}
              onError={(e) => { e.currentTarget.src = FALLBACK_SVG; }}
            />
            <div className="profile-status">
              <span className="status-dot"></span>
              <span className="status-text">{translations.ugc.status}</span>
            </div>
          </div>

          <div className="sidebar-identity">
            <h1 className="creator-name">{translations.landing.name}</h1>
            <p className="creator-title">{translations.ugc.creatorTitle}</p>
            <p className="creator-tagline">{translations.ugc.tagline}</p>
          </div>

          <div className="sidebar-deliverables">
            {translations.ugc.deliverables.map((d, i) => (
              <span key={i} className="deliverable-chip">{d}</span>
            ))}
          </div>

          <div className="platform-stats">
            <a href={`https://youtube.com/${translations.ugc.social.youtube}`} className="stat-row youtube" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} className="stat-icon" />
              <span className="stat-handle">{translations.ugc.social.youtube}</span>
              <span className="stat-badge">{translations.ugc.social.youtubeBadge}</span>
            </a>
            <a href={`https://instagram.com/${translations.ugc.social.instagram.replace('@', '')}`} className="stat-row instagram" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="stat-icon" />
              <span className="stat-handle">{translations.ugc.social.instagram}</span>
            </a>
            <a href={`https://tiktok.com/${translations.ugc.social.tiktok}`} className="stat-row tiktok" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} className="stat-icon" />
              <span className="stat-handle">{translations.ugc.social.tiktok}</span>
            </a>
          </div>

          <div className="sidebar-brands">
            <p className="sidebar-section-label">{translations.ugc.brands.label}</p>
            <div className="sidebar-brands-grid">
              <div className="brand-logo-wrap" data-tooltip="Match Masters">
                <img src="/images/brands/logo-match-masters.png" alt="Match Masters" className="brand-logo" />
              </div>
              <div className="brand-logo-wrap" data-tooltip="StreamElements">
                <img src="/images/brands/streamelements_320.png" alt="StreamElements" className="brand-logo" />
              </div>
            </div>
          </div>

          <p className="sidebar-about">{translations.ugc.about.description}</p>

          <div className="sidebar-cta-group">
            <a
              href={`mailto:${translations.ugc.contact.email}?subject=UGC Collaboration Inquiry`}
              className="sidebar-cta"
            >
              <span>✉</span>
              <span>{translations.ugc.contact.email}</span>
            </a>
            <button
              className={`sidebar-copy-btn${emailCopied ? ' sidebar-copy-btn--copied' : ''}`}
              onClick={handleCopyEmail}
              aria-label={translations.ugc.contact.copyEmail}
              title={emailCopied ? translations.ugc.contact.copied : translations.ugc.contact.copyEmail}
            >
              <FontAwesomeIcon icon={emailCopied ? faCheck : faCopy} />
            </button>
          </div>

          <div className="sidebar-controls">
            <ThemeToggle />
            <LanguageSelector />
          </div>

        </aside>

        {/* ── RIGHT CONTENT AREA ── */}
        <main className="content-area">
          <section id="niches" className="ugc-niches">
            <div className="niches-grid">

              <div className="niche-card">
                <h3 className="niche-title">{translations.ugc.niches.tech.title}</h3>
                <div className="demo-videos">{renderClips(VIDEO_PLACEHOLDERS.tech, 'Tech')}</div>
              </div>

              <div className="niche-card">
                <h3 className="niche-title">{translations.ugc.niches.grooming.title}</h3>
                <div className="demo-videos">{renderClips(VIDEO_PLACEHOLDERS.grooming, 'Grooming')}</div>
              </div>

              <div className="niche-card">
                <h3 className="niche-title">{translations.ugc.niches.style.title}</h3>
                <div className="demo-videos">{renderClips(VIDEO_PLACEHOLDERS.style, 'Style')}</div>
              </div>

              <div className="niche-card">
                <h3 className="niche-title">{translations.ugc.niches.lifestyle.title}</h3>
                <div className="demo-videos">{renderClips(VIDEO_PLACEHOLDERS.lifestyle, 'Lifestyle')}</div>
              </div>

            </div>
          </section>
        </main>

      </div>

      {/* Profile lightbox */}
      {isProfileModalOpen && (
        <div className="profile-lightbox" onClick={() => setIsProfileModalOpen(false)}>
          <img src={profilePictureUrl} alt={translations.landing.name} className="profile-lightbox-img"
            onError={(e) => { e.currentTarget.src = FALLBACK_SVG; }} />
        </div>
      )}

      {/* Video lightbox — swipeable short-form feed */}
      {isVideoModalOpen && (
        <div className="video-lightbox" onClick={closeVideoModal}>

          {/* Nav strip — stops propagation so clicks don't close the lightbox */}
          <div className="video-nav-strip" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-nav-btn"
              onClick={goToPrev}
              disabled={currentVideoIndex === 0}
              aria-label={translations.ugc.video.prevVideo}
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <span className="video-counter">
              {currentVideoIndex + 1}<span>/</span>{ALL_VIDEOS.length}
            </span>
            <button
              className="video-nav-btn"
              onClick={goToNext}
              disabled={currentVideoIndex === ALL_VIDEOS.length - 1}
              aria-label={translations.ugc.video.nextVideo}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>

          {/* iPhone frame */}
          <div
            className="iphone-frame"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`iphone-screen${slideDir ? ` slide-${slideDir}` : ''}`}>
              <iframe
                key={currentVideoIndex}
                src={`https://www.youtube.com/embed/${ALL_VIDEOS[currentVideoIndex]}?autoplay=1&rel=0&vq=hd1080&iv_load_policy=3`}
                title={translations.ugc.video.modalTitle}
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <img src="/images/phone_outline.png" alt="" className="iphone-mockup-img" />
          </div>

        </div>
      )}

      {/* Mobile sticky contact bar — fixed bottom, only visible on ≤768px */}
      <div className="mobile-sticky-cta">
        <a
          href={`mailto:${translations.ugc.contact.email}?subject=UGC Collaboration Inquiry`}
          className="mobile-sticky-btn"
        >
          <span>✉</span>
          <span>{translations.ugc.contact.getInTouch}</span>
        </a>
      </div>

      {/* Pre-initialize YouTube players on page load — off-screen so browser loads them,
          no autoplay so they stay paused until the modal opens. Stays mounted until refresh. */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden', pointerEvents: 'none' }}
      >
        {ALL_VIDEOS.map((videoId) => (
          <iframe
            key={`preload-${videoId}`}
            src={`https://www.youtube.com/embed/${videoId}?rel=0&vq=hd1080&iv_load_policy=3`}
            title=""
            tabIndex={-1}
            allow="accelerometer; clipboard-write; encrypted-media"
          />
        ))}
      </div>
    </div>
  );
};

export default UGCPage;
