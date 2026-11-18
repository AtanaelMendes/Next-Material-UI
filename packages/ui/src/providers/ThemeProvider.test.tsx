import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';
import { themeInitScript } from './themeInitScript';

function Harness() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='test-theme'>
      <ThemeToggle />
      <span>conteúdo</span>
    </ThemeProvider>
  );
}

describe('ThemeProvider', () => {
  it('renders children and toggles the html class + localStorage', async () => {
    render(<Harness />);
    await waitFor(() => expect(document.documentElement).toHaveClass('dark'));

    fireEvent.click(screen.getByTestId('theme-toggle'));

    await waitFor(() => expect(document.documentElement).toHaveClass('light'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('test-theme')).toBe('light');
    expect(screen.getByTestId('theme-toggle')).toHaveAttribute('aria-label', 'Ativar tema escuro');
  });

  it('reads the persisted theme on mount', async () => {
    localStorage.setItem('test-theme', 'light');
    render(<Harness />);
    await waitFor(() => expect(document.documentElement).toHaveClass('light'));
  });

  it('builds an anti-FOUC script with the configured key', () => {
    const script = themeInitScript({ storageKey: 'custom-key', defaultTheme: 'light' });
    expect(script).toContain('custom-key');
    expect(script).toContain('"light"');
    expect(script).toContain('classList.toggle');
  });
});
