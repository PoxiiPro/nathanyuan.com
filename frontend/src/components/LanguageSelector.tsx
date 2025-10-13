import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types/translations';
import '../assets/styles/LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '繁體', flag: '🇹🇼' },
    { code: 'zh-cn', name: '简体', flag: '🇨🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  return (
    <div className="language-selector">
      <div className="language-dropdown">
        <button className="language-trigger">
          <span className="current-flag">{languages.find(lang => lang.code === language)?.flag}</span>
          <i className="fas fa-chevron-down"></i>
        </button>
        <div className="language-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => setLanguage(lang.code)}
            >
              <span className="flag">{lang.flag}</span>
              <span className="name">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
