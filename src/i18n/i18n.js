import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Locale_en from '../i18n/Locales/en/translation.json';
import Locale_ar from '../i18n/Locales/ar/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: "en",
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: Locale_en
            },
            ar: {
                translation: Locale_ar
            }
        }
    });

export default i18n;