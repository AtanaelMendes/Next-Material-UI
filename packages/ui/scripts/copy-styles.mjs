import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'src/styles.css');
const target = resolve(root, 'dist/styles.css');

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);
console.log('copied src/styles.css -> dist/styles.css');
