import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Translations } from '../localization/translations';

type Language = 'ru' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('app_language') as Language || 'ru';
    setLanguageState(savedLanguage);
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('app_language', newLanguage);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};