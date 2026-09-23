import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? files(file) : [file];
    }),
  );
  return nested.flat();
}
const pages = (await files(root)).filter((file) => file.endsWith('.html'));
const targets = new Set();
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const match of html.matchAll(
    /(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
  )) {
    if (!match[1].startsWith('//')) targets.add(decodeURIComponent(match[1]));
  }
}
const missing = [];
for (const target of targets) {
  const file = path.join(root, target);
  const candidates = path.extname(file)
    ? [file]
    : [path.join(file, 'index.html'), `${file}.html`];
  let found = false;
  for (const candidate of candidates) {
    try {
      await access(candidate);
      found = true;
      break;
    } catch {
      /* Try the next static route shape. */
    }
  }
  if (!found) missing.push(target);
}
if (missing.length) {
  console.error('Missing internal links or assets:', missing);
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${pages.length} exported pages and ${targets.size} internal targets.`,
  );
}
