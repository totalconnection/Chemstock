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
