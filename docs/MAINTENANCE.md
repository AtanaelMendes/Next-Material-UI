# Maintaining `@atanael/ui`

## Project principles

- Tailwind CSS is the styling technology; custom CSS is limited to tokens and a few global defaults.
- Material Design remains the visual reference.
- The library core must not import from Next.js or depend on app context.
- Interactive modules must keep the `"use client"` directive at the top of the file.
- Public exports are explicit; avoid `export *` in `src/index.ts`.
- No duplicate components, hooks or styles: the app consumes the library.

## Adding a component

1. Create `packages/ui/src/components/<category>/ComponentName.tsx`.
2. Export an explicit props interface; extend DOM attributes when appropriate.
3. Add `'use client';` if the component uses hooks, browser APIs or attaches handlers.
4. Accept `className` and merge it with `cn`.
5. Prefer design tokens (`bg-surface`, `text-content`, `border-border`) over palette colors.
6. Add the component (and its types) to the category `index.ts` and to `src/index.ts`.
7. Add a Vitest test covering rendering, interaction and the accessible contract.
8. Document it in `apps/docs/src/app/components` with preview, code, props table, variants, states, accessibility and customization.

## Removing or renaming a component

- Removing requires a `MAJOR` version bump.
- Deprecate first: keep the export and mark it `@deprecated` in the JSDoc for one minor release.
- Update the docs catalog and `CHANGELOG.md`.

## Changing tokens

- Tokens live in `packages/ui/src/styles.css` (`:root`, `:root.light`, `@theme inline`).
- Never hardcode values in components when a token exists.
- Ensure both themes remain WCAG AA for text contrast.

## `"use client"` verification

The build fails if a source module that declares `"use client"` loses the
directive in `dist`:

```bash
npm run build:ui
npm run -w @atanael/ui verify:use-client
```

## Testing matrix

| Layer | Tool | Scope |
| --- | --- | --- |
| Unit | Vitest + RTL | Component behavior, masks, drawer state/ARIA, theme, SSR strings |
| Integration (Next) | Playwright | App Router rendering, theming, hydration, responsive drawers |
| Integration (Vite) | Vite build | Proves no Next.js coupling |

Run everything with `npm test`.

## Dependency policy

- `react`, `react-dom` and `tailwindcss` are peer dependencies.
- `@fortawesome/*`, `clsx` and `tailwind-merge` are implementation dependencies.
- `suneditor` and `suneditor-react` are optional peers used only by `RichText`.
- Do not reintroduce Axios, amCharts, `moment`, `react-tailwindcss-select` or `react-toastify` into the library.

## Release cadence

- Patch releases for fixes as needed.
- Minor releases when new components or props land.
- Keep the docs app on the workspace version so documentation always reflects the latest code.
