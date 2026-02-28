import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '@/locales/en.json';
import kh from '@/locales/kh.json';
import cn from '@/locales/cn.json';

const resources = {
  en: { translation: en },
  kh: { translation: kh },
  cn: { translation: cn },
};

// Get saved language preference or default to English
const getStoredLanguage = async () => {
  try {
    const stored = await AsyncStorage.getItem('language');
    return stored || 'en';
  } catch {
    return 'en';
  }
};

export const initI18n = async () => {
  const savedLanguage = await getStoredLanguage();

  const options: InitOptions = {
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  };

  await i18n
    .use(initReactI18next)
    .init(options);

  return i18n;
};

export default i18n;
