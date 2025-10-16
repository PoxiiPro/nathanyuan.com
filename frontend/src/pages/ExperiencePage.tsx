import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faUsers, faHandshake, faRobot, faMicrochip, faDatabase, faLaptopCode, faBrain, faChalkboardTeacher, faComments, faUserTie, faTasks, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap, faCertificate, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faApple, faPython, faReact, faJs, faGitAlt } from '@fortawesome/free-brands-svg-icons';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ExperiencePage.css';

type FilterType = 'all' | 'technical' | 'leadership' | 'client';

interface TimelineItem {
  id: string;
  title: string;
  company: string;
  period: string;
  duration: string;
  type: string;
  categories: string[];
  highlights: string[];
  impact: string;
}

interface Capstone {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const ExperiencePage: React.FC = () => {
  const { translations } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);

  const experienceData = translations.experiencePage as any;
  const { timeline, capstones, education, skills, filters } = experienceData;

  // Filter timeline based on active filter
  const filteredTimeline = timeline.filter((item: any) => 
    activeFilter === 'all' || item.categories.includes(activeFilter)
  );

  // Sort timeline by date (most recent first)
  const sortedTimeline = [...filteredTimeline].sort((a: any, b: any) => {
    if (a.type === 'current') return -1;
    if (b.type === 'current') return 1;
    
    // Handle single dates (like graduation)
    const getDate = (period: string) => {
      if (period.includes(' - ')) {
        return new Date(period.split(' - ')[0]);
      }
      return new Date(period);
    };
    
    return getDate(b.period).getTime() - getDate(a.period).getTime();
  });

  useEffect(() => {
    // Auto-select first experience when filter changes or on initial load
    if (sortedTimeline.length > 0 && (!selectedExperience || !sortedTimeline.some(item => item.id === selectedExperience))) {
      setSelectedExperience(sortedTimeline[0].id);
    }
  }, [activeFilter]);

  useEffect(() => {
    // Initial selection on component mount
    if (sortedTimeline.length > 0 && !selectedExperience) {
      setSelectedExperience(sortedTimeline[0].id);
    }
  }, []);

  // Helper function to extract year from period
  const getYear = (period: string) => {
    if (period.includes(' - ')) {
      return new Date(period.split(' - ')[0]).getFullYear();
    }
    return new Date(period).getFullYear();
  };

  const selectedItem = timeline.find((item: any) => item.id === selectedExperience);

  // Helper function to get Font Awesome icon
  const getIcon = (iconString?: string) => {
    switch (iconString) {
      case 'fas fa-code':
        return faCode;
      case 'fas fa-users': 
        return faUsers;
      case 'fas fa-handshake':
        return faHandshake;
      case 'fab fa-apple':
        return faApple;
      default:
        return faCode;
    }
  };

  // Company logo resolver (prefer Font Awesome icons; use microchip for Nvidia)
  type CompanyLogo = { kind: 'fa'; icon: any };
  const getCompanyLogo = (company?: string): CompanyLogo | undefined => {
    if (!company) return undefined;
    const name = company.toLowerCase();
    if (name.includes('apple')) return { kind: 'fa', icon: faApple };
    if (name.includes('nvidia')) return { kind: 'fa', icon: faMicrochip };
    return undefined;
  };

  // Helper to choose an icon for education/certification items
  const getEducationIcon = (title?: string, subtitle?: string) => {
    const text = ((title || '') + ' ' + (subtitle || '')).toLowerCase();
    if (text.includes('apple')) return faApple;
    if (text.includes('bachelor') || text.includes('degree') || text.includes('university') || text.includes('graduat')) return faGraduationCap;
    if (text.includes('clearance') || text.includes('top secret') || text.includes('secret')) return faShieldAlt;
    if (text.includes('nvidia') || text.includes('deep learning') || text.includes('generative')) return faBrain;
    if (text.includes('acit') || text.includes('certificate')) return faCertificate;
    return faCertificate;
  };

  // Load optional skill -> icon mapping from translations (keys should be normalized)
  const skillIconMap: Record<string, string> = (experienceData.skillIconMap as Record<string, string>) || {};

  // Resolve a short icon key (from translations) to an imported FontAwesome icon
  const resolveIconKey = (key?: string) => {
    if (!key) return undefined;
    const k = key.toLowerCase();
    switch (k) {
      case 'python': return faPython;
      case 'react': return faReact;
      case 'javascript':
      case 'js': return faJs;
      case 'git': return faGitAlt;
      case 'database': return faDatabase;
      case 'postgres':
      case 'postgresql': return faDatabase;
      case 'cassandra': return faDatabase;
      case 'ai':
      case 'ml': return faBrain;
      case 'api': return faLaptopCode;
      case 'robot': return faRobot;
      case 'microchip': return faMicrochip;
      case 'apple': return faApple;
      case 'users': return faUsers;
      case 'handshake': return faHandshake;
      case 'tasks': return faTasks;
      case 'mentor':
      case 'teaching': return faChalkboardTeacher;
      case 'comments': return faComments;
      case 'usertie': return faUserTie;
      default: return undefined;
    }
  };

  // Map individual skills to icons for Core Competencies
  const getSkillIcon = (skill: string) => {
    const s = (skill || '').toLowerCase();
    // Normalize skill to a lookup key (remove punctuation/spaces)
    const norm = s.replace(/[^a-z0-9]/g, '');
  
    // First try translation-driven mapping (allows localized skill keys)
    if (skillIconMap && skillIconMap[norm]) {
      const resolved = resolveIconKey(skillIconMap[norm]);
      if (resolved) return resolved;
    }
  
    // Fallback to heuristics based on English strings (backwards compatible)
    if (s.includes('python')) return faPython;
    if (s.includes('react')) return faReact;
    if (s === 'javascript' || s.includes('js')) return faJs;
    if (s.includes('typescript')) return faCode;
    if (s.includes('ai') || s.includes('ml') || s.includes('ai/ml')) return faBrain;
    if (s.includes('api')) return faLaptopCode;
    if (s.includes('postgres') || s.includes('postgresql') || s.includes('cassandra')) return faDatabase;
    if (s.includes('git')) return faGitAlt;
    if (s.includes('database')) return faDatabase;
    if (s.includes('robot') || s.includes('automation')) return faRobot;
    if (s.includes('micro')) return faMicrochip;
  
    // Leadership-focused mappings
    if (s.includes('team') || s.includes('management') || s.includes('lead') || s.includes('collaborat')) return faUsers;
    if (s.includes('mentor') || s.includes('mentorship')) return faChalkboardTeacher;
    if (s.includes('process') || s.includes('optimization') || s.includes('processes')) return faTasks;
    if (s.includes('strategic') || s.includes('planning')) return faTasks;
  
    // Client-focused mappings
    if (s.includes('client') || s.includes('relations') || s.includes('relation') || s.includes('service')) return faHandshake;
    if (s.includes('communicat') || s.includes('communication') || s.includes('problem') || s.includes('resolution')) return faComments;
    if (s.includes('stakeholder') || s.includes('stakeholders')) return faUserTie;
  
    return faCode;
  };

  return (
    <>
      <Helmet>
        <title>Nathan Yuan - Experience | Software Engineer Portfolio</title>
        <meta name="description" content="Explore Nathan Yuan's professional journey as a Cleared AI Full-Stack Software Engineer. Interactive timeline showcasing technical expertise, leadership, and customer excellence." />
        <meta name="keywords" content="Nathan Yuan, experience, software engineer, AI engineer, React, Python, TypeScript, professional background, timeline" />
        <meta property="og:title" content="Nathan Yuan - Professional Journey" />
        <meta property="og:description" content="Interactive timeline showcasing Nathan Yuan's professional experience and technical skills." />
        <meta property="og:url" content="https://nathanyuan.com/experience" />
        <link rel="canonical" href="https://nathanyuan.com/experience" />
      </Helmet>
      
      <div className="experience-page">
        <div className="experience-content">
          {/* Header Section */}
          <div className="experience-header">
            <h1 className="experience-title">{experienceData.title}</h1>
            <p className="experience-subtitle">{experienceData.subtitle}</p>
          </div>

          {/* Capstones Overview */}
          <div className="capstones-section">
            <div className="capstones-grid">
              {Object.entries(capstones).map(([key, capstone]: [string, any]) => (
                <div 
                  key={key}
                  className={`capstone-card ${activeFilter === key ? 'active' : ''} capstone-${key}`}
                  onClick={() => setActiveFilter(key as FilterType)}
                >
                  <div className="capstone-icon">
                    <FontAwesomeIcon icon={getIcon(capstone.icon)} />
                  </div>
                  <h3 className="capstone-title">{capstone.title}</h3>
                  <p className="capstone-description">{capstone.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="filter-controls">
            {Object.entries(filters).map(([key, label]: [string, any]) => (
              <button
                key={key}
                className={`filter-btn ${activeFilter === key ? 'active' : ''}`}
                onClick={() => setActiveFilter(key as FilterType)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Main Timeline Interface */}
          <div className="timeline-interface">
            {/* Timeline Navigation */}
            <div className="timeline-nav">
              <div className="timeline-container">
                {sortedTimeline.map((item: any, index: number) => {
                  const currentYear = getYear(item.period);
                  const previousYear = index > 0 ? getYear(sortedTimeline[index - 1].period) : null;
                  const showYearMarker = previousYear !== currentYear;
                  const companyLogo = getCompanyLogo(item.company);
                  
                  return (
                    <div key={item.id} className={`timeline-item ${selectedExperience === item.id ? 'active' : ''}`}>
                      {showYearMarker && (
                        <div className="year-marker">
                          <span className="year-text">{currentYear}</span>
                        </div>
                      )}
                      <div
                        className={`timeline-dot ${selectedExperience === item.id ? 'active' : ''} ${hoveredExperience === item.id ? 'hovered' : ''}`}
                        data-dot-index={index}
                        onClick={() => setSelectedExperience(item.id)}
                        onMouseEnter={() => setHoveredExperience(item.id)}
                        onMouseLeave={() => setHoveredExperience(null)}
                      >
                        <div className="dot-inner"></div>
                        <div className="dot-tooltip">
                          <div className="tooltip-title">{item.title}</div>
                          <div className="tooltip-company">
                            {companyLogo && (
                              <FontAwesomeIcon icon={companyLogo.icon} className="company-icon" />
                            )} {item.company}
                          </div>
                          <div className="tooltip-period">{item.duration}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience Details */}
            {selectedItem && (
              <div className="experience-details">
                <div className="details-header">
                  <div className="details-main">
                    <h2 className="details-title">{selectedItem.title}</h2>
                    <div className="details-company">
                      {(() => {
                        const selectedLogo = getCompanyLogo(selectedItem.company);
                        if (!selectedLogo) return selectedItem.company;
                        return (
                          <>
                            <FontAwesomeIcon icon={selectedLogo.icon} className="company-icon" /> {selectedItem.company}
                          </>
                        );
                      })()}
                    </div>
                    <div className="details-period">{selectedItem.period}</div>
                  </div>
                  <div className="details-meta">
                    <div className="details-duration">{selectedItem.duration}</div>
                    <div className="details-categories">
                      {selectedItem.categories.map((category: string) => (
                        <span 
                          key={category} 
                          className={`category-tag category-${category}`}
                        >
                          <FontAwesomeIcon icon={getIcon(capstones[category]?.icon)} /> {capstones[category]?.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="details-impact">
                  <strong>Impact:</strong> {selectedItem.impact}
                </div>

                <div className="details-highlights">
                  <h3>Key Highlights</h3>
                  <ul>
                    {selectedItem.highlights.map((highlight: string, index: number) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                {/* Project example links for C3.AI role */}
                {selectedItem.id === 'c3ai-engineer' && experienceData.projectExamples?.c3ai && (
                  <div className="project-links">
                    {experienceData.projectExamples.c3ai.map((proj: any, idx: number) => (
                      <a
                        key={idx}
                        className="project-link-card"
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={proj.title}
                      >
                        <div className="project-link-content">
                          <div className="project-link-title">{proj.title}</div>
                          <div className="project-link-icon">
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                          </div>
                        </div>
                        <div className="project-link-cta">View Project</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Skills Summary */}
          <div className="skills-summary">
            <h2>Core Competencies</h2>
            <div className="skills-grid">
              {Object.entries(skills).map(([category, skillList]: [string, any]) => (
                <div key={category} className="skill-category">
                  <h3 className="skill-category-title">
                    <FontAwesomeIcon icon={getIcon(capstones[category]?.icon)} /> {capstones[category]?.title}
                  </h3>
                  <div className="skill-tags">
                    {skillList.map((skill: string, index: number) => (
                      <span key={index} className="skill-tag">
                        <FontAwesomeIcon icon={getSkillIcon(skill)} className="skill-tag-icon" /> {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="education-section">
            <h2>{education.title}</h2>
            <div className="education-grid">
              {education.items.map((item: any, index: number) => (
                <div key={index} className="education-card">
                  <div className="education-content">
                    <h3 className="education-title"><FontAwesomeIcon icon={getEducationIcon(item.title, item.subtitle)} className="education-icon" /> {item.title}</h3>
                    <p className="education-subtitle">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperiencePage;
