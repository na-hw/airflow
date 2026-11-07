'use client';

import { createContext, useContext, useSyncExternalStore } from 'react';
import { createPreference } from '@/lib/createPreference';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const themePreference = createPreference<Theme>({
  key: 'theme',
  values: ['dark', 'light'],
  fallback: 'dark',
  apply: (theme) => document.documentElement.setAttribute('data-theme', theme),
});

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    themePreference.subscribe,
    themePreference.getSnapshot,
    themePreference.getServerSnapshot,
  );

  const toggleTheme = () => themePreference.set(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
