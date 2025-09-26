import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translation, LanguageContextType } from '../types/translations';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
import zhTranslations from '../locales/zh.json';
import zhCnTranslations from '../locales/zh-cn.json';
import koTranslations from '../locales/ko.json';
import jaTranslations from '../locales/ja.json';

const translations: Record<Language, Translation> = {
  en: enTranslations as Translation,
  es: esTranslations as Translation,
  zh: zhTranslations as Translation,
  'zh-cn': zhCnTranslations as Translation,
  ko: koTranslations as Translation,
  ja: jaTranslations as Translation,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to English
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    // Update document language attribute
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    translations: translations[language],
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
