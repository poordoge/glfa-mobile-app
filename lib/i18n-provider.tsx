import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n/config';

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
  isInitialized: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        const lang = savedLanguage || 'en';
        setLanguageState(lang);
        await i18n.changeLanguage(lang);
      } catch (error) {
        console.error('Failed to initialize language:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeLanguage();
  }, []);

  const setLanguage = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Failed to set language:', error);
    }
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, isInitialized }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
