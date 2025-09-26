export interface Translation {
  nav: {
    home: string;
    about: string;
    projects: string;
    demo: string;
    contact: string;
  };
  landing: {
    greeting: string;
    name: string;
    subtitle: string;
    description: string;
    cta: {
      viewWork: string;
      tryAI: string;
    };
    profile: {
      title: string;
      techStack: string[];
    };
  };
  chat: {
    title: string;
    welcomeMessage: string;
    inputPlaceholder: string;
    comingSoon: string;
  };
  common: {
    close: string;
    send: string;
    loading: string;
    underConstruction: string;
    comingSoon: string;
  };
}

export type Language = 'en' | 'es' | 'zh' | 'zh-cn' | 'ko' | 'ja';

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface LanguageContextType {
  language: Language;
  translations: Translation;
  setLanguage: (lang: Language) => void;
}
