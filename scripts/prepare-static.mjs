import { cp, mkdir, readdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
// Directory index pages keep direct links and refreshes portable across static hosts.
const output = path.resolve('out');
await rm(output, { recursive: true, force: true });
await cp(path.resolve('dist/client'), output, { recursive: true });
async function organize(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await organize(file);
    else if (
      entry.name.endsWith('.html') &&
      !['index.html', '404.html'].includes(entry.name)
    ) {
      const destination = file.slice(0, -5);
      await mkdir(destination, { recursive: true });
      await rename(file, path.join(destination, 'index.html'));
    }
  }
}
await organize(output);
console.log('Static website prepared in out/');

// Production indexing is an explicit build setting; preview builds stay excluded.
const { readFile, writeFile } = await import('node:fs/promises');
const production = process.env.CHEMSTOCK_INDEXABLE === 'true';
const origin = 'https://chemstock.com';
const excluded = new Set(['/leads/', '/blog/', '/404/']);
const urls = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(file);
    else if (entry.name === 'index.html') {
      const route =
        '/' +
        path
          .relative(output, directory)
          .split(path.sep)
          .filter(Boolean)
          .join('/') +
        (directory === output ? '' : '/');
      if (!excluded.has(route)) urls.push(origin + route);
    }
  }
}
await collect(output);
await writeFile(
  path.join(output, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .sort((a, b) => a.localeCompare(b))
      .map((url) => `  <url><loc>${url}</loc></url>`)
      .join('\n') +
    '\n</urlset>\n',
);
await writeFile(
  path.join(output, 'robots.txt'),
  production
    ? `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /leads\n\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
);
let headers = await readFile(path.join(output, '_headers'), 'utf8');
if (production)
  headers = headers.replace(/  X-Robots-Tag: noindex, nofollow\n/g, '');
headers +=
  '\n/leads*\n  X-Robots-Tag: noindex, nofollow\n/api/*\n  X-Robots-Tag: noindex, nofollow\n/blog*\n  X-Robots-Tag: noindex, follow\n';
await writeFile(path.join(output, '_headers'), headers);
console.log(
  `SEO assets: ${urls.length} sitemap URLs; ${production ? 'production indexing enabled' : 'preview indexing blocked'}.`,
);
