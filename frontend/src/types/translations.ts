export interface Translation {
  nav: {
    home: string;
    about: string;
    projects: string;
    demo: string;
    ugc: string;
    demos: string;
    aboutMe: string;
    contact: string;
    readme: string;
  };
  landing: {
    greeting: string;
    name: string;
    subtitle: string;
    description: string;
    cta: {
      viewWork: string;
      tryAI: string;
      learnMore: string;
      resume: string;
    };
    profile: {
      title: string;
      techStack: string[];
      pictureAlt: string;
    };
  };
  chat: {
    title: string;
    poweredBy: string;
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
    errorMessage: string;
    rateLimitMessage: string;
    switchToLightMode: string;
    switchToDarkMode: string;
    readmeLoadError: string;
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
    retry: string;
  };
  contact: {
    subtitle: string;
    emailLabel: string;
    email: string;
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
    disclaimer: string;
  };
  experience: {
    intro: string;
    academic: {
      title: string;
      details: string[];
    };
    leadership: {
      title: string;
      details: string[];
    };
    work: {
      title: string;
      details: string[];
    };
  };
  experiencePage: {
    title: string;
    technicalExperience: {
      title: string;
      jobs: {
        title: string;
        company: string;
        period: string;
        description?: string;
        bullets: string[];
      }[];
    };
    leadershipManagement: {
      title: string;
      jobs: {
        title: string;
        company: string;
        period: string;
        bullets: string[];
      }[];
    };
    educationCertifications: {
      title: string;
      items: {
        title: string;
        subtitle: string;
      }[];
    };
    technicalSkills: {
      title: string;
      skills: {
        category: string;
        items: string;
      }[];
    };
  };
  copilot: {
    instructions: string;
  };
  ugc: {
    title: string;
    tagline: string;
    status: string;
    creatorTitle: string;
    deliverables: string[];
    about: {
      title: string;
      description: string;
      body: string;
    };
    niches: {
      title: string;
      tech: {
        title: string;
        description: string;
      };
      grooming: {
        title: string;
        description: string;
      };
      style: {
        title: string;
        description: string;
      };
      lifestyle: {
        title: string;
        description: string;
      };
    };
    brands: {
      label: string;
    };
    contact: {
      title: string;
      description: string;
      email: string;
      rates: string;
      turnaround: string;
      getInTouch: string;
      copied: string;
      copyEmail: string;
    };
    social: {
      title: string;
      instagram: string;
      tiktok: string;
      youtube: string;
      youtubeBadge: string;
    };
    cta: {
      viewDemo: string;
      getQuote: string;
      contact: string;
    };
    video: {
      modalTitle: string;
      modalDescription: string;
      watchMore: string;
      closeVideo: string;
      comingSoon: string;
      prevVideo: string;
      nextVideo: string;
      samplesTitle: string;
    };
    demographics: {
      title: string;
      description: string;
    };
  };
}

export type Language = 'en' | 'es' | 'zh' | 'zh-cn' | 'ko' | 'ja';

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (dark: boolean) => void;
}

export interface LanguageContextType {
  language: Language;
  translations: Translation;
  setLanguage: (lang: Language) => void;
}
