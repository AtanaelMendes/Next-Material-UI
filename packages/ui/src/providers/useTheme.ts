'use client';

import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from './ThemeProvider';

/** Access the current theme and its setters. Must be used inside ThemeProvider. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return context;
}
