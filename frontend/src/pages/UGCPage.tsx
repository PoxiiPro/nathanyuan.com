import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import '../assets/styles/UGCPage.css';

const FALLBACK_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiMzQjgyRjYiLz4KPHN2ZyB4PSIzMCIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=';

// Base URL for the Cloudflare R2 custom domain serving UGC video assets.
// Videos live at ${CDN_BASE_URL}/<id>.mp4, posters at ${CDN_BASE_URL}/<id>.jpg
const CDN_BASE_URL = import.meta.env.VITE_CDN_BASE_URL ?? 'https://cdn.nathanyuan.com';
const videoSrc = (id: string) => `${CDN_BASE_URL}/${id}.mp4`;
const videoPoster = (id: string) => `${CDN_BASE_URL}/${id}.jpg`;

interface UGCVideo {
  id: string; // used to derive both the CDN video URL and poster URL
}

const REAL_VIDEOS: UGCVideo[] = [
  { id: 'match_masters_app_sponsor' },
];

const COMING_SOON_SLOTS = 4;

type GridSlot = UGCVideo | null;
const SAMPLE_VIDEO_SLOTS: GridSlot[] = [...REAL_VIDEOS, ...Array(COMING_SOON_SLOTS).fill(null)];

// Flat ordered list of real videos for the swipe feed
const ALL_VIDEOS = REAL_VIDEOS;


const UGCPage: React.FC = () => {
  const { translations } = useLanguage();
  const { isDarkMode, setDarkMode } = useTheme();

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const reelFeedRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const profilePictureUrl = '/images/ugc_profile_picture.jpg';

  // Force dark mode on mount, restore on unmount
  useEffect(() => {
    const prev = isDarkMode;
    setDarkMode(true);
    return () => { setDarkMode(prev); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard navigation — arrow keys scroll between slides
  useEffect(() => {
    if (!isVideoModalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') slideRefs.current[Math.min(currentVideoIndex + 1, ALL_VIDEOS.length - 1)]?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === 'ArrowUp')   slideRefs.current[Math.max(currentVideoIndex - 1, 0)]?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === 'Escape')    closeVideoModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isVideoModalOpen, currentVideoIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // IntersectionObserver — update currentVideoIndex as user scrolls
  useEffect(() => {
    if (!isVideoModalOpen || !reelFeedRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting)
            setCurrentVideoIndex(Number(entry.target.getAttribute('data-index')));
        });
      },
      { threshold: 0.6, root: reelFeedRef.current }
    );
    slideRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [isVideoModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to the starting video immediately when the feed opens
  useEffect(() => {
    if (!isVideoModalOpen) return;
    requestAnimationFrame(() => {
      slideRefs.current[currentVideoIndex]?.scrollIntoView({ behavior: 'instant' });
    });
  }, [isVideoModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const openVideoAt = (id: string) => {
    const idx = ALL_VIDEOS.findIndex(v => v.id === id);
    if (idx < 0) return;
    setCurrentVideoIndex(idx);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => setIsVideoModalOpen(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(translations.ugc.contact.email)
      .then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      })
      .catch(() => {});
  };

  const renderClips = (slots: GridSlot[], label: string) =>
    slots.map((video, index) => {
      const isSoon = video === null;
      return (
        <div
          key={index}
          className={`video-placeholder${isSoon ? ' video-coming-soon' : ''}`}
          onClick={isSoon ? undefined : () => openVideoAt(video.id)}
          title={isSoon ? translations.ugc.video.comingSoon : `${label} ${index + 1}`}
          data-video-number={isSoon ? undefined : index + 1}
          style={isSoon ? undefined : {
            backgroundImage: `url(${videoPoster(video.id)})`,
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
              <div className="brand-logo-wrap" data-tooltip="InBody">
                <img src="/images/brands/inbody.png" alt="InBody" className="brand-logo" />
              </div>
              <div className="brand-logo-wrap" data-tooltip="TryNearby">
                <img src="/images/brands/trynearby.png" alt="TryNearby" className="brand-logo" />
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

          {/* ── ABOUT ME ── */}
          <section className="ugc-about-section">
            <h2 className="ugc-about-title">{translations.ugc.about.title}</h2>
            <p className="ugc-about-body">{translations.ugc.about.body}</p>
          </section>

          {/* ── SAMPLE VIDEOS ── */}
          <section id="niches" className="ugc-niches">
            <div className="niche-card niche-card--samples">
              <h3 className="niche-title">{translations.ugc.video.samplesTitle}</h3>
              <div className="demo-videos demo-videos--five">
                {renderClips(SAMPLE_VIDEO_SLOTS, 'Sample')}
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

      {/* Reel feed — TikTok-style scroll snap */}
      {isVideoModalOpen && (
        <div className="reel-feed" ref={reelFeedRef}>
          <button className="reel-close-btn" onClick={closeVideoModal} aria-label="Close">✕</button>
          <div className="reel-counter">{currentVideoIndex + 1} / {ALL_VIDEOS.length}</div>

          {ALL_VIDEOS.map((video, idx) => (
            <div
              key={video.id}
              className="reel-slide"
              data-index={String(idx)}
              ref={el => { slideRefs.current[idx] = el; }}
            >
              <div className="iphone-frame">
                <div className="iphone-screen">
                  {idx === currentVideoIndex && (
                    <video
                      key={video.id}
                      src={videoSrc(video.id)}
                      poster={videoPoster(video.id)}
                      title={translations.ugc.video.modalTitle}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    />
                  )}
                </div>
                <img src="/images/phone_outline.png" alt="" className="iphone-mockup-img" />
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default UGCPage;
