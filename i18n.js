import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
//import { findBestLanguageTag } from "react-native-localize";

import en from './locales/en.json';
import pa from './locales/pa.json';
import ta from './locales/ta.json';
import hi from './locales/hi.json';

const locales = {
  en: {translation: en},
  hi: {translation: hi},
  pa: {translation: pa},
  ta: {translation: ta},
};

// const languageDetector = {
//   type: 'languageDetector',
//   async: true,
//   detect: callback => {
//     const bestLanguage = findBestLanguageTag(
//       Object.keys(resources),
//     );
//     callback(bestLanguage?.languageTag || 'en');
//   },
//   init: () => {},
//   cacheUserLanguage: () => {},
// };
const initData = () => ({
     compatibilityJSON: 'v3',
     fallbackLng: 'en',
     debug: false,
     resources: locales,
     interpolation: {
       escapeValue: false,
     },
   });
   
i18n.use(initReactI18next).init(initData());

export default i18n;