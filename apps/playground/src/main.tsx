import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, ThemeToggle } from '@atanael/ui';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="playground:theme">
      <ThemeToggle />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
