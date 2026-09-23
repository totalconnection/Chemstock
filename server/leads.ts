import { quoteEmail, type QuoteAnswers } from '../lib/quote';
export type ObjectStore = {
  get(key: string): Promise<{
    text(): Promise<string>;
    arrayBuffer(): Promise<ArrayBuffer>;
  } | null>;
  put(
    key: string,
    value: string | ArrayBuffer,
    options?: { httpMetadata?: { contentType: string } },
  ): Promise<unknown>;
  list(options: { prefix: string; cursor?: string; limit?: number }): Promise<{
    objects: { key: string }[];
    truncated: boolean;
    cursor?: string;
  }>;
};
export type LeadEnvironment = {
  LEADS: ObjectStore;
  ADMIN_TOKEN: string;
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  TURNSTILE_SECRET?: string;
  TURNSTILE_SITE_KEY?: string;
  LOCAL_PREVIEW?: boolean;
};
type SavedLead = {
  fingerprint?: string;
  id: string;
  createdAt: string;
  answers: QuoteAnswers;
  files: { name: string; key: string; size: number }[];
  notification: 'not-configured' | 'failed' | 'sent';
};
const MAX = 20 * 1024 * 1024;
const json = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
const text = (v: unknown, max = 1000) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';
const idPattern = /^CS-[a-f0-9]{32}$/;
// Control-character matching deliberately protects spreadsheet exports.
/* eslint-disable no-control-regex */
export function csvCell(value: unknown) {
  let s =
    typeof value === 'string'
      ? value
      : typeof value === 'number'
        ? String(value)
        : '';
  if (/^[\s\u0000-\u001f]*[=+@-]/.test(s) || /^[\t\r\n]/.test(s)) s = "'" + s;
  return '"' + s.replaceAll('"', '""') + '"';
}
const csvHeader = [
  'Reference',
  'Created UTC',
  'Name',
  'Company',
  'Email',
  'Material',
  'CAS',
  'Quantity',
  'Unit',
  'Requirements',
  'Order type',
  'Timing',
  'Destination',
  'Attachments',
  'Email notification',
];
export function leadCsv(lead: SavedLead, header = true) {
  const a = lead.answers;
  const items = a.items?.length
    ? a.items
    : [
        {
          name: a.mode === 'help' ? 'Sourcing assistance' : a.product,
          cas: a.cas,
          quantity: a.quantity,
          unit: a.unit,
          unknown: a.quantityUnknown,
          notes: a.requirements,
        },
      ];
  const lines = items.map((i) =>
    [
      lead.id,
      lead.createdAt,
      a.name,
      a.company,
      a.email,
      i.name,
      i.cas,
      i.unknown ? 'To discuss' : i.quantity,
      i.unknown ? '' : i.unit,
      [i.notes, a.items?.length ? a.requirements : '']
        .filter(Boolean)
        .join(' | '),
      a.orderType,
      a.timing,
      a.destination,
      lead.files.map((f) => f.name).join('; '),
      lead.notification,
    ]
      .map(csvCell)
      .join(','),
  );
  return [...(header ? [csvHeader.map(csvCell).join(',')] : []), ...lines].join(
    '\r\n',
  );
}
function validate(raw: unknown): QuoteAnswers {
  if (!raw || typeof raw !== 'object')
    throw new Error('Enter your request details.');
  const r = raw as Record<string, unknown>;
  const a: QuoteAnswers = {
    mode: r.mode === 'help' ? 'help' : 'known',
    product: text(r.product, 150),
    requirements: text(r.requirements, 3000),
    cas: text(r.cas, 80),
    orderType: text(r.orderType, 80),
    quantity: text(r.quantity, 20),
    unit: text(r.unit, 30),
    quantityUnknown: r.quantityUnknown === true,
    timing: text(r.timing, 100),
    destination: text(r.destination, 200),
    name: text(r.name, 100),
    company: text(r.company, 150),
    email: text(r.email, 150),
  };
  if (!a.name || !a.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email))
    throw new Error('Enter your name, company, and a valid email.');
  const validQuantity = (quantity: string, unknown: boolean, unit: string) =>
    (unknown ||
      (Number.isFinite(Number(quantity)) &&
        Number(quantity) > 0 &&
        Number(quantity) <= 1e9)) &&
    ['kg', 'lb', 'metric tons', 'liters', 'gallons'].includes(unit);
  if (r.items !== undefined) {
    if (!Array.isArray(r.items) || !r.items.length || r.items.length > 50)
      throw new Error('Your request can include 1–50 materials.');
    a.items = r.items.map((item: Record<string, unknown>) => {
      if (!item || typeof item !== 'object')
        throw new Error('Invalid material.');
      const i = {
        name: text(item.name, 150),
        cas: text(item.cas, 80),
        quantity: text(item.quantity, 20),
        unit: text(item.unit, 30),
        unknown: item.unknown === true,
        notes: text(item.notes, 500),
      };
      if (!i.name || !validQuantity(i.quantity, i.unknown, i.unit))
        throw new Error('Check each material and quantity.');
      return i;
    });
  } else if (
    !validQuantity(a.quantity, a.quantityUnknown, a.unit) ||
    (a.mode === 'known' && !a.product)
  )
    throw new Error('Check the material and quantity.');
  if (
    !['Sample / trial', 'One-time order', 'Recurring supply'].includes(
      a.orderType,
    ) ||
    ![
      'As soon as possible',
      'Within the next month',
      'Planning ahead',
    ].includes(a.timing)
  )
    throw new Error('Choose your order type and timing.');
  return a;
}
async function save(env: LeadEnvironment, lead: SavedLead) {
  await env.LEADS.put('csv/' + lead.id + '.csv', leadCsv(lead), {
    httpMetadata: { contentType: 'text/csv' },
  });
  await env.LEADS.put('records/' + lead.id + '.json', JSON.stringify(lead));
}
async function notify(env: LeadEnvironment, lead: SavedLead, origin: string) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    lead.notification = 'not-configured';
    return;
  }
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json',
        'Idempotency-Key': lead.id,
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: ['evelyn@chemstock.com'],
        reply_to: lead.answers.email,
        subject: 'New Chemstock request · ' + lead.id,
        text:
          quoteEmail({ ...lead.answers, files: lead.files.map((f) => f.name) })
            .body +
          '\n\nReference: ' +
          lead.id +
          '\nReview files and export: ' +
          origin +
          '/leads/',
      }),
      signal: AbortSignal.timeout(12000),
    });
    lead.notification = result.ok ? 'sent' : 'failed';
  } catch {
    lead.notification = 'failed';
  }
}
async function authorized(request: Request, env: LeadEnvironment) {
  if (!env.ADMIN_TOKEN || env.ADMIN_TOKEN.length < 32) return false;
  const supplied =
    request.headers.get('Authorization')?.replace(/^Bearer /, '') || '';
  const hash = async (s: string) =>
    new Uint8Array(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)),
    );
  const [a, b] = await Promise.all([hash(supplied), hash(env.ADMIN_TOKEN)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
export async function handleLeads(
  request: Request,
  env: LeadEnvironment,
): Promise<Response> {
  const url = new URL(request.url);
  const route = url.pathname.replace(/\/$/, '');
  if (route === '/api/lead-config' && request.method === 'GET')
    return json({
      enabled:
        !!env.LEADS &&
        (env.LOCAL_PREVIEW ||
          !!(env.TURNSTILE_SECRET && env.TURNSTILE_SITE_KEY)),
      siteKey: env.TURNSTILE_SITE_KEY || '',
      preview: !!env.LOCAL_PREVIEW,
    });
  if (!env.LEADS)
    return json(
      {
        error:
          'Quote submission is not available yet. Please email evelyn@chemstock.com.',
      },
      503,
    );
  try {
    if (route === '/api/quotes' && request.method === 'POST') {
      if (request.headers.get('Origin') !== url.origin)
        return json({ error: 'Request origin not allowed.' }, 403);
      if (
        !env.LOCAL_PREVIEW &&
        (!env.TURNSTILE_SECRET || !env.TURNSTILE_SITE_KEY)
      )
        return json(
          { error: 'Submission is not configured. Please contact Chemstock.' },
          503,
        );
      if (Number(request.headers.get('Content-Length')) > MAX + 1000000)
        return json({ error: 'Files exceed the size limit.' }, 413);
      const reader = request.body?.getReader();
      if (!reader) return json({ error: 'Missing request.' }, 400);
      const chunks: Uint8Array[] = [];
      let length = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > MAX + 1000000) {
          await reader.cancel();
          return json({ error: 'Files exceed the size limit.' }, 413);
        }
        chunks.push(value);
      }
      const body = new Uint8Array(length);
      let offset = 0;
      for (const chunk of chunks) {
        body.set(chunk, offset);
        offset += chunk.length;
      }
      const form = await new Response(body, {
        headers: { 'Content-Type': request.headers.get('Content-Type') || '' },
      }).formData();
      if (form.get('website'))
        return json({ error: 'Unable to accept this request.' }, 400);
      const id = text(form.get('reference'), 40);
      if (!idPattern.test(id))
        return json({ error: 'Invalid request reference.' }, 400);
      if (!env.LOCAL_PREVIEW) {
        const verification = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            body: new URLSearchParams({
              secret: env.TURNSTILE_SECRET!,
              response: text(form.get('token'), 2048),
            }),
            signal: AbortSignal.timeout(10000),
          },
        );
        const result = (await verification.json()) as {
          success: boolean;
          hostname?: string;
        };
        if (!result.success || result.hostname !== url.hostname)
          return json(
            { error: 'Please complete the verification again.' },
            400,
          );
      }
      const answers = validate(JSON.parse(text(form.get('payload'), 60000)));
      const uploads = form
        .getAll('files')
        .filter((f): f is File => typeof f !== 'string');
      if (
        uploads.length > 5 ||
        uploads.reduce((s, f) => s + f.size, 0) > MAX ||
        uploads.some(
          (f) =>
            !f.size ||
            f.size > 10 * 1024 * 1024 ||
            !/\.(pdf|xlsx|csv|docx|txt)$/i.test(f.name),
        )
      )
        return json(
          { error: 'Choose up to 5 supported files within the size limits.' },
          400,
        );
      if (
        answers.mode === 'help' &&
        !answers.items?.length &&
        !answers.requirements &&
        !uploads.length
      )
        return json(
          { error: 'Describe your requirements or add a specification file.' },
          400,
        );
      const fileContents = await Promise.all(
        uploads.map((f) => f.arrayBuffer()),
      );
      const hashes = await Promise.all(
        fileContents.map(async (buffer) =>
          Array.from(
            new Uint8Array(await crypto.subtle.digest('SHA-256', buffer)),
          )
            .map((n) => n.toString(16).padStart(2, '0'))
            .join(''),
        ),
      );
      const fingerprint = JSON.stringify([
        answers,
        uploads.map((f, i) => [f.name, f.size, hashes[i]]),
      ]);
      const previous = await env.LEADS.get('records/' + id + '.json');
      if (previous) {
        const lead = JSON.parse(await previous.text()) as SavedLead;
        if (
          lead.fingerprint
            ? lead.fingerprint !== fingerprint
            : JSON.stringify(lead.answers) !== JSON.stringify(answers)
        )
          return json(
            {
              error:
                'This reference belongs to a different request. Start a new request.',
            },
            409,
          );
        return json({
          reference: id,
          saved: true,
          preview: !!env.LOCAL_PREVIEW,
        });
      }
      const files = [];
      for (let i = 0; i < uploads.length; i++) {
        const f = uploads[i];
        const name = f.name.replace(/[\u0000-\u001f/\\]/g, '_').slice(0, 180);
        const key = 'files/' + id + '/' + i;
        await env.LEADS.put(key, fileContents[i], {
          httpMetadata: { contentType: 'application/octet-stream' },
        });
        files.push({ name, key, size: f.size });
      }
      const lead: SavedLead = {
        fingerprint,
        id,
        createdAt: new Date().toISOString(),
        answers,
        files,
        notification: 'not-configured',
      };
      await save(env, lead);
      await notify(env, lead, url.origin);
      await save(env, lead);
      return json(
        { reference: id, saved: true, preview: !!env.LOCAL_PREVIEW },
        201,
      );
    }
    if (route.startsWith('/api/leads')) {
      if (!(await authorized(request, env)))
        return json({ error: 'Enter a valid access key.' }, 401);
      if (route === '/api/leads' && request.method === 'GET') {
        const result = await env.LEADS.list({
          prefix: 'records/',
          limit: 50,
          cursor: url.searchParams.get('cursor') || undefined,
        });
        const leads = await Promise.all(
          result.objects.map(async (o) =>
            JSON.parse(await (await env.LEADS.get(o.key))!.text()),
          ),
        );
        return json({ leads, cursor: result.truncated ? result.cursor : null });
      }
      if (route === '/api/leads/export.csv' && request.method === 'GET') {
        let cursor: string | undefined;
        let count = 0;
        const rows = [csvHeader.map(csvCell).join(',')];
        do {
          const result = await env.LEADS.list({
            prefix: 'records/',
            limit: 500,
            cursor,
          });
          for (const o of result.objects) {
            if (++count > 10000)
              return json(
                {
                  error:
                    'Export exceeds 10,000 requests. Export from private storage.',
                },
                413,
              );
            rows.push(
              leadCsv(
                JSON.parse(await (await env.LEADS.get(o.key))!.text()),
                false,
              ),
            );
          }
          cursor = result.truncated ? result.cursor : undefined;
        } while (cursor);
        return new Response('\uFEFF' + rows.join('\r\n'), {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="chemstock-leads.csv"',
            'Cache-Control': 'no-store',
          },
        });
      }
      const match = route.match(
        /^\/api\/leads\/(CS-[a-f0-9]{32})\/(files\/\d+|notify)$/,
      );
      if (match) {
        const object = await env.LEADS.get('records/' + match[1] + '.json');
        if (!object) return json({ error: 'Request not found.' }, 404);
        const lead = JSON.parse(await object.text()) as SavedLead;
        if (match[2] === 'notify' && request.method === 'POST') {
          if (!env.RESEND_API_KEY || !env.EMAIL_FROM)
            return json({ error: 'Email delivery is not configured.' }, 503);
          if (lead.notification !== 'sent') {
            await notify(env, lead, url.origin);
            await save(env, lead);
          }
          return json({ notification: lead.notification });
        }
        if (match[2].startsWith('files/') && request.method === 'GET') {
          const file = lead.files[Number(match[2].split('/')[1])];
          if (!file) return json({ error: 'File not found.' }, 404);
          const object = await env.LEADS.get(file.key);
          if (!object) return json({ error: 'File not found.' }, 404);
          return new Response(await object.arrayBuffer(), {
            headers: {
              'Content-Type': 'application/octet-stream',
              'Content-Disposition':
                "attachment; filename*=UTF-8''" + encodeURIComponent(file.name),
              'Cache-Control': 'no-store',
              'X-Content-Type-Options': 'nosniff',
            },
          });
        }
      }
    }
    return json({ error: 'Not found.' }, 404);
  } catch (error) {
    if (error instanceof SyntaxError)
      return json({ error: 'Invalid request data.' }, 400);
    return json(
      {
        error:
          error instanceof Error &&
          /^(Enter|Check|Choose|Your|Invalid)/.test(error.message)
            ? error.message
            : 'We could not complete this request. Please retry with the same reference.',
      },
      error instanceof Error &&
        /^(Enter|Check|Choose|Your|Invalid)/.test(error.message)
        ? 400
        : 503,
    );
  }
}
