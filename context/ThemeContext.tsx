'use client';

import React, { createContext, useContext, useEffect } from 'react';

export type Theme = 'dark';

interface ThemeContextType {
  theme: 'dark';
  isDark: true;
  toggleTheme: () => void;
  setTheme: (theme: 'dark') => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      // Purge any legacy theme preference
      localStorage.removeItem('bms_theme');
      const root = document.documentElement;
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={defaultThemeContext}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}




