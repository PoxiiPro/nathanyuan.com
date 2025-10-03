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
    poweredBy: string;
    welcomeMessage: string;
    inputPlaceholder: string;
    comingSoon: string;
  };
  contact: {
    subtitle: string;
    emailLabel: string;
    locationLabel: string;
    location: string;
    linkedinLabel: string;
    linkedinUrl: string;
    workLabel: string;
    fullTime: string;
    based: string;
    relocate: string;
    citizen: string;
    clearance: string;
  };
  common: {
    close: string;
    send: string;
    loading: string;
    underConstruction: string;
    comingSoon: string;
    errorMessage: string; // Added this key
  };
  bugReport: {
    title: string;
    button: string;
    form: {
      titleLabel: string;
      titlePlaceholder: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      priorityLabel: string;
      priorityOptions: {
        p0: string;
        p1: string;
        p2: string;
        p3: string;
      };
      submit: string;
      cancel: string;
    };
    success: string;
    error: string;
    bugReportPrompt: string;
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
