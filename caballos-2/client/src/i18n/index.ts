import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enPages from './locales/en/pages.json';
import enAdmin from './locales/en/admin.json';
import enErrors from './locales/en/errors.json';

import esCommon from './locales/es/common.json';
import esPages from './locales/es/pages.json';
import esAdmin from './locales/es/admin.json';
import esErrors from './locales/es/errors.json';

const resources = {
  en: {
    common: enCommon,
    pages: enPages,
    admin: enAdmin,
    errors: enErrors,
  },
  es: {
    common: esCommon,
    pages: esPages,
    admin: esAdmin,
    errors: esErrors,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
