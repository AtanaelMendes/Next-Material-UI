'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_THEME_STORAGE_KEY, type Theme } from './themeInitScript';

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children?: ReactNode;
  /** Theme used before any persisted value is read. Defaults to "dark". */
  defaultTheme?: Theme;
  /** localStorage key. Defaults to "atanael-ui:theme". */
  storageKey?: string;
  /** How the theme is applied to <html>. Defaults to "class". */
  attribute?: 'class' | 'data-theme';
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme, attribute: 'class' | 'data-theme' = 'class') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (attribute === 'data-theme') {
    root.dataset.theme = theme;
  } else {
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }
  root.style.colorScheme = theme;
}

/**
 * Framework-agnostic light/dark theme provider.
 *
 * Persists the selected theme in localStorage, applies it to <html> and keeps
 * multiple tabs in sync. Pair with `themeInitScript` to avoid a flash of the
 * wrong theme on first paint.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = DEFAULT_THEME_STORAGE_KEY,
  attribute = 'class',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      applyTheme(next, attribute);
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          // Storage can be unavailable (private mode / quota).
        }
      }
    },
    [attribute, storageKey],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(storageKey);
    } catch {
      stored = null;
    }
    const initial: Theme = stored === 'light' || stored === 'dark' ? stored : defaultTheme;
    applyTheme(initial, attribute);
    setThemeState(initial);
    document.documentElement.dataset.themeReady = 'true';

    const syncTheme = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      const next: Theme =
        event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : defaultTheme;
      applyTheme(next, attribute);
      setThemeState(next);
    };

    window.addEventListener('storage', syncTheme);
    return () => window.removeEventListener('storage', syncTheme);
  }, [attribute, defaultTheme, storageKey]);

  const toggleTheme = useCallback(() => {
    setThemeState((previous) => {
      const next: Theme = previous === 'dark' ? 'light' : 'dark';
      applyTheme(next, attribute);
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          // Storage can be unavailable (private mode / quota).
        }
      }
      return next;
    });
  }, [attribute, storageKey]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme: theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
