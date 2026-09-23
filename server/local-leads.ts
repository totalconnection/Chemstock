import { mkdir, readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import type { Plugin } from 'vite';
import { handleLeads, type ObjectStore } from './leads';
export function localLeads(): Plugin {
  return {
    name: 'chemstock-local-leads',
    async configureServer(server) {
      const root = path.resolve('.leads');
      await mkdir(root, { recursive: true, mode: 0o700 });
      const tokenPath = path.join(root, 'admin-token.txt');
      let token: string;
      try {
        token = (await readFile(tokenPath, 'utf8')).trim();
      } catch {
        token = randomBytes(32).toString('hex');
        await writeFile(tokenPath, token, { mode: 0o600 });
      }
      const store: ObjectStore = {
        async get(key) {
          try {
            const data = await readFile(path.join(root, key));
            return {
              text: async () => data.toString(),
              arrayBuffer: async () =>
                data.buffer.slice(
                  data.byteOffset,
                  data.byteOffset + data.byteLength,
                ) as ArrayBuffer,
            };
          } catch {
            return null;
          }
        },
        async put(key, value) {
          const file = path.join(root, key);
          await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
          const temporary = file + '.' + randomBytes(6).toString('hex');
          await writeFile(
            temporary,
            typeof value === 'string' ? value : Buffer.from(value),
            { mode: 0o600 },
          );
          await rename(temporary, file);
        },
        async list({ prefix, cursor, limit = 50 }) {
          let names: string[];
          try {
            names = (await readdir(path.join(root, prefix)))
              .filter((n) => n.endsWith('.json'))
              .sort();
          } catch {
            names = [];
          }
          const start = cursor ? Number(cursor) : 0;
          return {
            objects: names
              .slice(start, start + limit)
              .map((n) => ({ key: prefix + n })),
            truncated: start + limit < names.length,
            cursor: String(start + limit),
          };
        },
      };
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();
        try {
          const chunks: Buffer[] = [];
          let size = 0;
          for await (const chunk of req) {
            size += chunk.length;
            if (size > 21 * 1024 * 1024) {
              res.writeHead(413);
              res.end();
              return;
            }
            chunks.push(chunk);
          }
          const request = new Request('http://' + req.headers.host + req.url, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body:
              req.method === 'GET' || req.method === 'HEAD'
                ? undefined
                : Buffer.concat(chunks),
          });
          const response = await handleLeads(request, {
            LEADS: store,
            ADMIN_TOKEN: token,
            LOCAL_PREVIEW: true,
          });
          res.writeHead(response.status, Object.fromEntries(response.headers));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch {
          res.writeHead(500);
          res.end('{"error":"Local lead service unavailable."}');
        }
      });
    },
  };
}
