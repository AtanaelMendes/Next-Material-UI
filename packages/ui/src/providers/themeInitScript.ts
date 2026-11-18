export type Theme = 'light' | 'dark';

export interface ThemeInitOptions {
  /** localStorage key used to persist the selected theme. */
  storageKey?: string;
  /** How the theme is applied to <html>. Defaults to "class". */
  attribute?: 'class' | 'data-theme';
  /** Theme used when nothing is stored. Defaults to "dark". */
  defaultTheme?: Theme;
}

export const DEFAULT_THEME_STORAGE_KEY = 'atanael-ui:theme';

/**
 * Returns a blocking inline script that applies the persisted theme before
 * paint, preventing a flash of the wrong theme. Apps can inject it in <head>.
 */
export function themeInitScript({
  storageKey = DEFAULT_THEME_STORAGE_KEY,
  attribute = 'class',
  defaultTheme = 'dark',
}: ThemeInitOptions = {}): string {
  return `(function(){try{var k=${JSON.stringify(storageKey)};var a=${JSON.stringify(
    attribute,
  )};var d=${JSON.stringify(defaultTheme)};var s=window.localStorage.getItem(k);var t=s==='light'||s==='dark'?s:d;var r=document.documentElement;if(a==='data-theme'){r.dataset.theme=t;}else{r.classList.toggle('dark',t==='dark');r.classList.toggle('light',t==='light');}r.style.colorScheme=t;}catch(e){}})();`;
}
