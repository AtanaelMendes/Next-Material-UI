import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

// Matches relative specifiers in import/export/from/dynamic import statements.
const SPECIFIER = /((?:from\s+|import\s*\(\s*|import\s+|export\s+\*\s+from\s+)(['"]))(\.[^'"]*)(\2)/g;

function withJsExtension(file, specifier) {
  if (/\.(js|mjs|cjs|json|css)$/.test(specifier)) return specifier;

  const base = resolve(dirname(file), specifier);
  if (existsSync(`${base}.js`)) return `${specifier}.js`;
  if (existsSync(join(base, 'index.js'))) return `${specifier}/index.js`;
  return specifier;
}

let changed = 0;
for (const file of walk(dist).filter((entry) => /\.(js|d\.ts)$/.test(entry))) {
  const original = readFileSync(file, 'utf8');
  const updated = original.replace(
    SPECIFIER,
    (match, prefix, quote, specifier, closing) =>
      `${prefix}${withJsExtension(file, specifier)}${closing}`,
  );
  if (updated !== original) {
    writeFileSync(file, updated);
    changed++;
  }
}

console.log(`normalized relative ESM specifiers in ${changed} files`);
