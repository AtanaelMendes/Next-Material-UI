# Changelog

## [0.1.0] - 2026-11-18

- Converted `next16-template` into an npm workspaces monorepo.
- Extracted the reusable UI into the `@atanael/ui` package with TypeScript declarations and ESM output.
- Moved the Next.js application to `apps/docs` without changing its routes (`/` and `/components`).
- Added the Vite + React playground (`apps/playground`).
- Added Vitest + React Testing Library and Playwright coverage.
- Added CI, npm Trusted Publishing workflow and packaging documentation.
