import { initReactI18next } from 'react-i18next';
import i18n, { InitOptions, LanguageDetectorAsyncModule, Resource } from 'i18next';

import { resources } from './locales';
import { TypeI18n } from './type';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  // flags below detection to be async
  async: true,
  detect: (callback: (lng: string | readonly string[] | undefined) => void) => {
    callback(TypeI18n.DEFAULT_FALLBACK_LNG_I18n);
  },
  init: () => {
    console.log('init I18n');
  },
  cacheUserLanguage: () => {
    console.log('cacheUserLanguage I18n');
  },
};

export const initOptionsI18n = (source: Resource) => {
  return {
    compatibilityJSON: "v3",
    fallbackLng: TypeI18n.DEFAULT_FALLBACK_LNG_I18n,

    resources: source,

    // have a common namespace used around the full app
    debug: false,

    interpolation: {
      // not needed for react as it does escape per default to prevent xss!
      escapeValue: false,
    },
    react: {
      useSuspense: true
    },
  };
};

/**
 * Config i18n for app
 */
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init(initOptionsI18n(resources) as InitOptions);
  
export default i18n;
