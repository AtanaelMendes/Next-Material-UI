import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'src');
const dist = resolve(root, 'dist');

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(src).filter((file) => /\.(ts|tsx)$/.test(file));
const clientSources = sourceFiles.filter((file) =>
  /^\s*['"]use client['"]/.test(readFileSync(file, 'utf8')),
);

const missing = [];
for (const sourceFile of clientSources) {
  const base = relative(src, sourceFile).replace(/\.(ts|tsx)$/, '.js');
  const outputFile = join(dist, base);
  let contents = '';
  try {
    contents = readFileSync(outputFile, 'utf8');
  } catch {
    missing.push(`${outputFile} (missing output)`);
    continue;
  }
  if (!/^\s*['"]use client['"]/.test(contents)) {
    missing.push(outputFile);
  }
}

if (missing.length > 0) {
  console.error('Built modules lost their "use client" directive:');
  for (const file of missing) console.error(' - ' + file);
  process.exit(1);
}

console.log(`verified "use client" on ${clientSources.length} client modules`);
