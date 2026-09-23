import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('out');
const production = process.env.CHEMSTOCK_INDEXABLE === 'true';
const excluded = new Set(['/blog/', '/leads/']);
const titles = new Set(),
  canonicals = new Set();
let count = 0,
  products = 0;
async function visit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await visit(file);
      continue;
    }
    if (entry.name !== 'index.html') continue;
    const route =
      '/' +
      path.relative(root, dir).split(path.sep).filter(Boolean).join('/') +
      (dir === root ? '' : '/');
    const html = await readFile(file, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert(title && !titles.has(title), `Missing or duplicate title: ${route}`);
    titles.add(title);
    const meta = [...html.matchAll(/<meta\s+[^>]*>/g)].map((x) => x[0]);
    assert(
      meta.some(
        (x) => /name="description"/.test(x) && /content="[^"]+"/.test(x),
      ),
      `Description: ${route}`,
    );
    const canonical = html.match(
      /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/s,
    )?.[1];
    assert.equal(
      canonical && new URL(canonical).href,
      'https://chemstock.com' + route,
      `Canonical: ${route}`,
    );
    assert(!canonicals.has(canonical), `Duplicate canonical: ${route}`);
    canonicals.add(new URL(canonical).href);
    const robots = meta.find((x) => x.includes('name="robots"')) || '';
    assert.equal(
      robots.includes('noindex'),
      !production || excluded.has(route),
      `Indexing mode: ${route}`,
    );
    for (const name of ['og:title', 'og:description', 'og:image', 'og:url'])
      assert(
        meta.some((x) => x.includes(`property="${name}"`)),
        `${name}: ${route}`,
      );
    assert(
      meta.some((x) => x.includes('name="twitter:card"')),
      `Social card: ${route}`,
    );
    const graphs = [
      ...html.matchAll(
        /<script type="application\/ld\+json">(.*?)<\/script>/gs,
      ),
    ].map((x) => JSON.parse(x[1]));
    assert(
      graphs.some((x) => x['@type'] === 'Organization'),
      `Organization: ${route}`,
    );
    if (/^\/catalogue\/[^/]+\/$/.test(route)) {
      products++;
      assert(
        graphs.some((x) => x['@type'] === 'Product' && x.name),
        `Product: ${route}`,
      );
      assert(
        graphs.some((x) => x['@type'] === 'BreadcrumbList'),
        `Breadcrumb: ${route}`,
      );
      assert(
        /<details/.test(html) && /<summary/.test(html),
        `Server-rendered answers: ${route}`,
      );
      assert(
        !graphs.some((x) => x.offers || x.aggregateRating),
        `Unsupported commerce claims: ${route}`,
      );
    }
    count++;
  }
}
await visit(root);
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((x) => x[1]);
assert.equal(urls.length, count - excluded.size);
assert.equal(new Set(urls).size, urls.length);
for (const url of urls)
  assert(
    canonicals.has(url) && !excluded.has(new URL(url).pathname),
    `Sitemap: ${url}`,
  );
const catalogue = await readFile(
  path.join(root, 'catalogue/index.html'),
  'utf8',
);
for (const url of urls.filter((x) => /\/catalogue\/[^/]+\/$/.test(x)))
  assert(
    catalogue.includes(`href="${new URL(url).pathname}"`),
    `Directory link: ${url}`,
  );
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assert.equal(/^Disallow: \/$/m.test(robots), !production);
const headers = await readFile(path.join(root, '_headers'), 'utf8');
assert.equal(
  headers.split('\n/leads')[0].includes('X-Robots-Tag: noindex'),
  !production,
);
const redirects = (await readFile(path.join(root, '_redirects'), 'utf8'))
  .trim()
  .split('\n');
const sources = new Set();
for (const line of redirects) {
  const [source, target, status] = line.split(/\s+/);
  assert(!sources.has(source), `Duplicate redirect: ${source}`);
  sources.add(source);
  assert.equal(status, '301');
  assert.notEqual(source, target);
  await access(path.join(root, target, 'index.html'));
}
console.log(
  `SEO checks passed: ${count} pages, ${products} products, ${urls.length} sitemap entries, ${redirects.length} redirects; ${production ? 'production' : 'preview'} mode.`,
);
