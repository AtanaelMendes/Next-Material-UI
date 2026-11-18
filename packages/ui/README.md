# @atanael/ui

Accessible, themeable React components built with **Tailwind CSS v4**, TypeScript and Material Design principles. Works with React 18/19 and with or without Next.js.

- Typed public API, ESM output and per-module tree shaking.
- Light/dark themes driven by CSS variables you can override.
- WAI-ARIA patterns: focus trapping, `aria-*` contracts, keyboard navigation.
- No Axios, no amCharts, no Next.js imports in the library core.
- `"use client"` preserved on every interactive module.

## Installation

```bash
npm install @atanael/ui
```

Peer dependencies:

```bash
npm install react react-dom tailwindcss
```

`tailwindcss` **v4 or newer** is required because components are styled with utility classes generated from the package tokens.

## Tailwind setup

Import Tailwind first, then the library stylesheet:

```css
/* app/globals.css */
@import "tailwindcss";
@import "@atanael/ui/styles.css";
```

`@atanael/ui/styles.css` ships:

- the `dark` custom variant (`@custom-variant dark`);
- the design tokens (`:root` = dark, `:root.light` = light);
- the `@theme inline` bridge that generates `bg-surface`, `text-content`, `border-border`, `bg-danger-subtle`, etc.;
- an `@source "./"` directive so Tailwind scans the package's own `dist` folder.

If your Tailwind pipeline does not follow the package `@source`, add it manually:

```css
@source "../node_modules/@atanael/ui/dist";
```

No Tailwind config file is needed. Only CSS custom properties are used for theming.

## Theming

Tokens live on `:root` (dark) and `:root.light`. Override them anywhere:

```css
.brand {
  --primary: #7c3aed;
  --primary-hover: #6d28d9;
  --primary-content: #ffffff;
  --focus: #a78bfa;
}
```

Use the provider and the optional toggle:

```tsx
'use client';
import { ThemeProvider, ThemeToggle, themeInitScript } from '@atanael/ui';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript({ storageKey: 'app:theme' }) }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="app:theme">
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`themeInitScript` is framework-agnostic: inject it before hydration to avoid a flash of the wrong theme.

## Usage

```tsx
import { Button, Card, CardBody, CardTitle, InputText, PieChart } from '@atanael/ui';

export function Dashboard() {
  return (
    <Card>
      <CardTitle color="primary">Resumo</CardTitle>
      <CardBody>
        <InputText id="name" label="Nome" onChange={(id, value) => console.log(id, value)} clearable />
        <Button buttonType="primary" onClick={() => alert('Salvo')}>
          Salvar
        </Button>
        <PieChart
          title="Tarefas"
          data={[
            { label: 'Concluído', value: 62 },
            { label: 'Pendente', value: 38 },
          ]}
        />
      </CardBody>
    </Card>
  );
}
```

## Components

| Category | Exports |
| --- | --- |
| Theme | `ThemeProvider`, `ThemeToggle`, `useTheme`, `themeInitScript`, `ThemeContext` |
| Drawer | `Drawer`, `DrawerHeader`, `DrawerContent`, `DrawerFooter`, `DrawerToggle`, `LeftDrawer`, `RightDrawer`, `useDrawerState`, `useDrawer`, `useDrawerAccessibility`, `useDrawerContext`, `DrawerContext`, `safeStorage`, `lockBodyScroll`, `unlockBodyScroll`, `getFocusableElements`, `FOCUSABLE_SELECTOR` |
| Buttons | `Button`, `ButtonGroup`, `ButtonDropDown`, `ButtonRadioGroup`, `ButtonToggle`, `FabAdd`, `FabSave`, `FabCancel`, `FabCustom`, `PillsBadge`, `generateButtonClass` |
| Inputs | `InputText`, `InputTextArea`, `InputPassword`, `InputEmail`, `InputNumber`, `InputDate`, `InputMonth`, `InputFile`, `DatePicker`, `TimePicker`, `DataHora`, `Checkbox`, `Radio`, `RadioGroup`, `Fieldset`, `ProgressBar`, `RangeSlider`, `CustomDropdown`, `Select`, `Combobox`, `RichText`, `applyMask` |
| Display | `Title`, `Subtitle`, `Label`, `Caption`, `FieldLabel`, `Accordion`, `Blockquote`, `NewBadge`, `Timeline`, `Clipboard`, `Iframe` |
| Feedback | `DataLoading`, `Failure`, `Loading`, `NoDataFound`, `SmallLoading`, `Skeleton`, `FormSkeleton`, `SkeletonList`, `WarningMessage` |
| Overlays | `TooltipComponent`, `Balloon`, `Confirm`, `Dialog`, `DialogFields`, `ModalGrid`, `TimelineModal` |
| Navigation | `Pagination`, `SortControl`, `PageTabs` |
| Tables | `DataTable` |
| Charts | `PieChart`, `AnswersChart`, `UserHoursBarChart` |
| Cards | `Card`, `CardTitle`, `CardBody`, `CardActions`, `CardImage` |
| Utilities | `cn`, `empty`, `nl2br`, `numberBetween` |

## Customization

Every visual component accepts `className` (merged with `tailwind-merge`) and forwards standard DOM attributes.

```tsx
<Button className="uppercase tracking-wide" buttonType="primary" size="large">
  Enviar
</Button>

<Drawer side="right" width="w-96" className="rounded-l-2xl">
  ...
</Drawer>
```

Prefer CSS variables for themes and `className` for one-off layout changes.

## Rich text editor

`RichText` is the only optional-dependency component. Install SunEditor only if you use it:

```bash
npm install suneditor suneditor-react
```

Then import its stylesheet once in your app:

```css
@import "suneditor/dist/css/suneditor.min.css";
```

The editor is loaded lazily on the client, so SSR environments are unaffected.

## Accessibility

- Drawers implement focus trapping, ESC dismissal, scroll locking, focus restoration and `aria-expanded`/`aria-controls`/`aria-modal`.
- Inputs expose labels, `aria-invalid` and error descriptions.
- The combobox follows the WAI-ARIA listbox pattern with arrow/Enter/Escape support.
- Charts render `role="img"` with accessible names and include empty states.
- A global `:focus-visible` outline is provided in both themes.

## Tree shaking

The package ships unbundled ESM: importing one component loads only its module graph. `sideEffects` is limited to `*.css`.

```ts
import { Button } from '@atanael/ui'; // only Button and its deps
```

## Requirements

- React `^18` or `^19`
- Tailwind CSS `>=4`
- Node.js `>=20` for development

## Local development

From the monorepo root:

```bash
npm install --include=dev
npm run dev:docs        # Next.js catalog at http://localhost:3000
npm run dev:playground  # Vite harness at http://localhost:5173
npm run build:ui        # tsup → packages/ui/dist
npm run test:unit       # Vitest + React Testing Library
npm run test:e2e        # Playwright (Next.js App Router)
npm run pack:verify     # npm pack validation
```

## License

MIT © Atanael Mendes
