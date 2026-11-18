import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspace = resolve(root, 'packages/ui');
const scratch = resolve(root, '.pack-test');
console.log('> building @atanael/ui');
execSync('npm run build -w @atanael/ui', { cwd: root, stdio: 'inherit' });

console.log('> packing @atanael/ui');
rmSync(scratch, { recursive: true, force: true });
mkdirSync(scratch, { recursive: true });
const packOutput = execSync(
  `npm pack -w @atanael/ui --pack-destination "${scratch}" --json`,
  { cwd: root, encoding: 'utf8' },
);
const [packResult] = JSON.parse(packOutput);
const tarball = join(scratch, packResult.filename);
if (!existsSync(tarball)) throw new Error(`Tarball not created: ${tarball}`);

const files = packResult.files.map((file) => file.path);
const required = ['package.json', 'dist/index.js', 'dist/index.d.ts', 'dist/styles.css', 'README.md', 'LICENSE'];
for (const file of required) {
  if (!files.includes(file)) throw new Error(`Missing file in package: ${file}`);
}

const pkg = JSON.parse(readFileSync(join(workspace, 'package.json'), 'utf8'));
for (const target of [pkg.exports['.'].import, pkg.exports['.'].types, pkg.exports['./styles.css']]) {
  if (!existsSync(join(workspace, target))) throw new Error(`exports target missing: ${target}`);
}

console.log(`> packed ${packResult.filename} (${files.length} files, ${packResult.size} bytes)`);
console.log('> package contents verified');
