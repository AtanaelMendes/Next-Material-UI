import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider, ThemeToggle, themeInitScript } from '@atanael/ui';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Next16 Template — Catálogo de Componentes',
  description: 'Template Next.js 16 com biblioteca de componentes acessível e tematizada.',
};

const themeScript = themeInitScript({
  storageKey: 'next16-template:theme',
  defaultTheme: 'dark',
});

export default function RootLayout({ children }) {
  return (
    <html
      lang='pt-BR'
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className='min-h-full flex flex-col bg-background text-foreground'>
        <ThemeProvider defaultTheme='dark' storageKey='next16-template:theme'>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
