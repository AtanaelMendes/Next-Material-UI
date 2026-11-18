# Publishing `@atanael/ui`

This document prepares the release; **nothing is published automatically**.

## Prerequisites

1. The npm scope `@atanael` must exist and your npm account must have publish rights.
2. Add the repository as a Trusted Publisher on npm:
   - npm → Packages → `@atanael/ui` → Settings → Trusted publishing.
   - Provider: GitHub Actions.
   - Repository: `AtanaelMendes/next16-template`.
   - Workflow: `.github/workflows/publish.yml`.
   - Environment: `npm` (optional, recommended).
3. No `NPM_TOKEN` secret is required with Trusted Publishing / OIDC. The workflow requests `id-token: write`.

## Versioning (SemVer)

- `MAJOR`: breaking public API changes.
- `MINOR`: new components, props or backwards-compatible behavior.
- `PATCH`: bug fixes, accessibility fixes, style corrections.

Update `packages/ui/package.json` and `packages/ui/CHANGELOG.md` together.

```bash
npm version --workspace @atanael/ui minor --no-git-tag-version
```

## Local release checklist

```bash
npm ci --include=dev
npm run lint
npm run typecheck
npm run build:ui
npm run test:unit
npm run test:e2e
npm run pack:verify
```

`npm run pack:verify` runs `npm pack` and asserts that the tarball contains
`dist/index.js`, `dist/index.d.ts`, `dist/styles.css`, `README.md`, `LICENSE`
and a valid `package.json`.

## Publishing

Create and push a tag that matches the package version:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The `publish.yml` workflow then:

1. installs dependencies with dev tooling;
2. builds the library;
3. runs `npm publish --workspace @atanael/ui --provenance --access public`.

Manual publish (only if Trusted Publishing is unavailable):

```bash
npm run build:ui
npm publish --workspace @atanael/ui --access public --provenance
```

## Verify the published package

```bash
npm view @atanael/ui version
npm view @atanael/ui dist.tarball
npm install @atanael/ui
```

## Dry run

```bash
npm publish --workspace @atanael/ui --dry-run --access public
```

## Rollback

npm does not allow deleting versions. If a release is broken:

1. Publish a patch with the fix.
2. Run `npm deprecate @atanael/ui@<broken-version> "message"`.
3. Document the incident in `CHANGELOG.md`.
