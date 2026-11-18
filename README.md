# next16-template → @atanael/ui

Monorepo with a React component library and two consumers:

| Workspace | Package | Purpose |
| --- | --- | --- |
| `packages/ui` | `@atanael/ui` | The distributable React component library (TypeScript, tsup, Tailwind v4). |
| `apps/docs` | `@atanael/docs` | The existing Next.js 16 App Router documentation/dashboard app. |
| `apps/playground` | `@atanael/playground` | Vite + React harness used to prove the library works outside Next.js. |

## Requirements

- Node.js `>=20.9`
- npm `>=10` (npm workspaces)

## Getting started

```bash
npm install --include=dev
npm run dev:docs        # http://localhost:3000
npm run dev:playground  # http://localhost:5173
```

> Some environments set `NODE_ENV=production` globally, which makes npm skip dev dependencies. Use `--include=dev` if that happens.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` / `npm run dev:docs` | Start the Next.js documentation app. |
| `npm run dev:playground` | Start the Vite playground. |
| `npm run build` | Build the library and the docs app. |
| `npm run build:ui` | Build `@atanael/ui` (tsup + CSS copy + directive verification). |
| `npm run typecheck` | Type-check every workspace that defines it. |
| `npm run lint` | ESLint (flat config, TypeScript, hooks and a11y rules). |
| `npm run test:unit` | Vitest + React Testing Library. |
| `npm run test:e2e` | Playwright against the Next.js App Router app. |
| `npm run pack:verify` | Builds, runs `npm pack` and validates the tarball. |

## Repository layout

```
packages/ui/
  src/index.ts          explicit public exports
  src/styles.css        design tokens + Tailwind @theme bridge
  src/components/*      typed components (buttons, inputs, drawer, ...)
  scripts/              build post-processing and checks
apps/docs/
  src/app/              Next.js routes: / and /components
  src/components/       app-specific + archived domain components
apps/playground/
  src/                  Vite integration harness
```

## npm workspaces

The root `package.json` declares:

```json
{ "workspaces": ["apps/*", "packages/*"] }
```

`apps/*` consumes `@atanael/ui` through the workspace symlink, so local changes are visible without publishing.

## Release process

See [docs/PUBLISHING.md](docs/PUBLISHING.md) and [docs/MAINTENANCE.md](docs/MAINTENANCE.md). Nothing is published automatically: the GitHub workflow runs on a tag and uses npm Trusted Publishing (OIDC).

## License

MIT © Atanael Mendes
