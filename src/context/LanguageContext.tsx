'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';
import { createPreference } from '@/lib/createPreference';

export type Lang = 'fa' | 'en';
export type Dir = 'rtl' | 'ltr';

interface LanguageContextValue {
  lang: Lang;
  dir: Dir;
  setLang: (lang: Lang) => void;
}

const dirOf = (lang: Lang): Dir => (lang === 'en' ? 'ltr' : 'rtl');

const languagePreference = createPreference<Lang>({
  key: 'lang',
  values: ['fa', 'en'],
  fallback: 'fa',
  apply: (lang) => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dirOf(lang));
  },
});

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'fa',
  dir: 'rtl',
  setLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(
    languagePreference.subscribe,
    languagePreference.getSnapshot,
    languagePreference.getServerSnapshot,
  );

  return (
    <LanguageContext.Provider value={{ lang, dir: dirOf(lang), setLang: languagePreference.set }}>
      {children}
    </LanguageContext.Provider>
  );
}
