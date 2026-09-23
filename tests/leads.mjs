import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const compiled = { exports: {} };
  cache.set(file, compiled.exports);
  // Test-only loader transpiles repository TypeScript; no user input is evaluated.
  // eslint-disable-next-line typescript/no-implied-eval
  new Function(
    'require',
    'module',
    'exports',
    ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
  )(
    (p) => load(path.resolve(path.dirname(file), p + '.ts')),
    compiled,
    compiled.exports,
  );
  return compiled.exports;
}
const { handleLeads, csvCell } = load('server/leads.ts');
const objects = new Map();
const store = {
  async get(key) {
    if (!objects.has(key)) return null;
    const v = objects.get(key);
    return {
      text: async () =>
        typeof v === 'string' ? v : new TextDecoder().decode(v),
      arrayBuffer: async () =>
        typeof v === 'string' ? new TextEncoder().encode(v).buffer : v,
    };
  },
  async put(key, value) {
    objects.set(key, value);
  },
  async list({ prefix, cursor, limit = 50 }) {
    const keys = [...objects.keys()]
      .filter((k) => k.startsWith(prefix))
      .sort((a, b) => a.localeCompare(b));
    const start = Number(cursor || 0);
    return {
      objects: keys.slice(start, start + limit).map((key) => ({ key })),
      truncated: start + limit < keys.length,
      cursor: String(start + limit),
    };
  },
};
const env = {
  LEADS: store,
  ADMIN_TOKEN: 'test-key-not-a-real-key-'.repeat(3),
  LOCAL_PREVIEW: true,
};
const base = {
  mode: 'known',
  product: 'Maleic Acid',
  cas: '110-16-7',
  requirements: '99% & testing',
  orderType: 'Recurring supply',
  quantity: '100',
  unit: 'kg',
  quantityUnknown: false,
  timing: 'Planning ahead',
  destination: 'New Jersey',
  name: 'Test buyer',
  company: '=HYPERLINK("test")',
  email: 'test@example.invalid',
};
const reference = 'CS-' + 'a'.repeat(32);
const req = (
  payload = base,
  id = reference,
  file,
  origin = 'https://example.test',
) => {
  const body = new FormData();
  body.set('reference', id);
  body.set('payload', JSON.stringify(payload));
  if (file) body.append('files', file);
  return new Request('https://example.test/api/quotes', {
    method: 'POST',
    headers: { Origin: origin },
    body,
  });
};
let r = await handleLeads(req(), env);
assert.equal(r.status, 201);
assert.equal((await r.json()).reference, reference);
assert(objects.has('csv/' + reference + '.csv'));
r = await handleLeads(req(), env);
assert.equal(r.status, 200);
assert.equal(
  [...objects.keys()].filter((k) => k.startsWith('records/')).length,
  1,
);
assert.equal(
  (await handleLeads(req({ ...base, company: 'Changed' }), env)).status,
  409,
);
assert.equal(
  (
    await handleLeads(
      req({ ...base, email: 'bad' }, 'CS-' + 'b'.repeat(32)),
      env,
    )
  ).status,
  400,
);
assert.equal(
  (
    await handleLeads(
      req({ ...base, quantity: '-1' }, 'CS-' + 'b'.repeat(32)),
      env,
    )
  ).status,
  400,
);
assert.equal(
  (
    await handleLeads(
      req(base, reference, undefined, 'https://other.test'),
      env,
    )
  ).status,
  403,
);
assert.equal(
  (
    await handleLeads(
      new Request('https://example.test/api/leads/export.csv'),
      env,
    )
  ).status,
  401,
);
const auth = { Authorization: 'Bearer ' + env.ADMIN_TOKEN };
r = await handleLeads(
  new Request('https://example.test/api/leads/export.csv', { headers: auth }),
  env,
);
assert.equal(r.status, 200);
const csv = await r.text();
assert(csv.includes("'=HYPERLINK"));
assert(csv.includes('100'));
assert.equal(csvCell('+formula'), `"'+formula"`);
const file = new File(['example requirements'], 'spec.txt', {
  type: 'text/plain',
});
const fileId = 'CS-' + 'c'.repeat(32);
assert.equal((await handleLeads(req(base, fileId, file), env)).status, 201);
assert.equal(
  (
    await handleLeads(
      req(
        base,
        fileId,
        new File(['changed requirements'], 'spec.txt', { type: 'text/plain' }),
      ),
      env,
    )
  ).status,
  409,
);
r = await handleLeads(
  new Request('https://example.test/api/leads/' + fileId + '/files/0', {
    headers: auth,
  }),
  env,
);
assert.equal(await r.text(), 'example requirements');
assert.equal(r.headers.get('Content-Type'), 'application/octet-stream');
assert.equal(
  (
    await handleLeads(
      req(base, 'CS-' + 'd'.repeat(32), new File(['x'], 'bad.html')),
      env,
    )
  ).status,
  400,
);
assert.equal(
  (
    await handleLeads(
      req(base, 'CS-' + 'd'.repeat(32), new File([''], 'empty.txt')),
      env,
    )
  ).status,
  400,
);
const multi = {
  ...base,
  items: [
    {
      name: 'One',
      cas: 'To confirm',
      quantity: '20',
      unit: 'kg',
      unknown: false,
      notes: 'one',
    },
    {
      name: 'Two',
      cas: 'To confirm',
      quantity: '',
      unit: 'lb',
      unknown: true,
      notes: 'two',
    },
  ],
};
assert.equal(
  (await handleLeads(req(multi, 'CS-' + 'e'.repeat(32)), env)).status,
  201,
);
assert.equal(
  (
    await handleLeads(req(base, 'CS-' + 'f'.repeat(32)), {
      ...env,
      LOCAL_PREVIEW: false,
    })
  ).status,
  503,
);
console.log(
  'Lead storage, duplicate protection, CSV escaping, multi-product requests, validation, attachment download, authorization, and production fail-closed checks passed.',
);
