'use client';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../lib/cn';
import { useTheme } from './useTheme';

export interface ThemeToggleProps {
  className?: string;
  /** Accessible label when the current theme is dark. */
  activateLightLabel?: string;
  /** Accessible label when the current theme is light. */
  activateDarkLabel?: string;
}

/** Floating theme toggle button. Renders inside a ThemeProvider. */
export function ThemeToggle({
  className,
  activateLightLabel = 'Ativar tema claro',
  activateDarkLabel = 'Ativar tema escuro',
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? activateLightLabel : activateDarkLabel;

  return (
    <button
      type='button'
      onClick={toggleTheme}
      data-testid='theme-toggle'
      aria-label={label}
      aria-pressed={!isDark}
      title={label}
      className={cn(
        'fixed bottom-4 right-4 z-[100] flex h-11 w-11 items-center justify-center',
        'rounded-full border border-border bg-surface text-content shadow-lg',
        'transition-colors hover:bg-hover focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <FontAwesomeIcon
        icon={isDark ? faSun : faMoon}
        width='18'
        height='18'
        className={isDark ? 'text-warning' : 'text-primary-text'}
      />
    </button>
  );
}
