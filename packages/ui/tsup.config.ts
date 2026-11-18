import { defineConfig } from 'tsup';
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry: string) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const entries = walk('src')
  .filter((file) => /\.(ts|tsx)$/.test(file))
  .filter((file) => !/\.test\.(ts|tsx)$/.test(file))
  .map((file) => file.replace(/\\/g, '/'));

export default defineConfig({
  entry: entries,
  format: ['esm'],
  // Unbundled per-module output preserves each file's "use client" directive,
  // which Next.js requires, and gives consumers the finest tree-shaking grain.
  bundle: false,
  dts: true,
  splitting: false,
  treeshake: false,
  clean: true,
  metafile: true,
  sourcemap: true,
  target: 'es2020',
  outDir: 'dist',
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@fortawesome/react-fontawesome',
    '@fortawesome/free-solid-svg-icons',
    '@fortawesome/free-regular-svg-icons',
    'suneditor',
    'suneditor-react',
  ],
  esbuildPlugins: [
    preserveDirectivesPlugin({
      directives: ['use client'],
      include: /\.(ts|tsx)$/,
      exclude: /node_modules/,
    }) as never,
  ],
  onSuccess:
    'node scripts/fix-extensions.mjs && node scripts/copy-styles.mjs && node scripts/verify-use-client.mjs',
});
