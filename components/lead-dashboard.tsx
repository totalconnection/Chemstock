'use client';
import { useState } from 'react';
type Lead = {
  id: string;
  createdAt: string;
  answers: {
    name: string;
    company: string;
    email: string;
    product: string;
    items?: { name: string }[];
  };
  notification: string;
  files: { name: string; size: number }[];
};
export default function LeadDashboard() {
  const [key, setKey] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function call(url: string, method = 'GET') {
    const response = await fetch(url, {
      method,
      headers: { Authorization: 'Bearer ' + key },
    });
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      throw new Error(data.error || 'Unable to load leads.');
    }
    return response;
  }
  async function load(more = false) {
    setBusy(true);
    setError('');
    try {
      const r = (await (
        await call(
          '/api/leads' +
            (more && cursor ? '?cursor=' + encodeURIComponent(cursor) : ''),
        )
      ).json()) as { leads: Lead[]; cursor: string | null };
      setLeads((prev) => (more ? [...prev, ...r.leads] : r.leads));
      setCursor(r.cursor);
      setOpen(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function download(url: string, name: string) {
    setError('');
    try {
      const blob = await (await call(url)).blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <div className="lead-dashboard">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Private workspace</span>
          <h1>Quote requests.</h1>
          <p>Review incoming requirements and export your lead records.</p>
        </div>
        {open && (
          <button
            className="btn"
            onClick={() =>
              download('/api/leads/export.csv', 'chemstock-leads.csv')
            }
          >
            Download all leads · CSV
          </button>
        )}
      </div>
      {!open ? (
        <form
          className="admin-login"
          onSubmit={(e) => {
            e.preventDefault();
            void load();
          }}
        >
          <label>
            Access key
            <input
              type="password"
              required
              value={key}
              autoComplete="current-password"
              onChange={(e) => setKey(e.target.value)}
            />
          </label>
          <button className="btn" disabled={busy}>
            {busy ? 'Opening…' : 'Open lead records'}
          </button>
          <p>
            The access key is kept only in this tab and is never added to a
            download URL.
          </p>
        </form>
      ) : (
        <>
          <div className="lead-tools">
            <button
              className="text-link"
              disabled={busy}
              onClick={() => load()}
            >
              Refresh
            </button>
            <button
              className="text-link"
              onClick={() => {
                setOpen(false);
                setKey('');
                setLeads([]);
              }}
            >
              Lock workspace
            </button>
          </div>
          {!leads.length && <p>No requests have been saved yet.</p>}
          <div className="lead-records">
            {leads.map((lead) => (
              <article key={lead.id}>
                <div>
                  <span className="eyebrow">
                    {new Date(lead.createdAt).toLocaleString()}
                  </span>
                  <h2>{lead.answers.company}</h2>
                  <p>
                    {lead.answers.name} · {lead.answers.email}
                  </p>
                  <strong>
                    {lead.answers.items?.length
                      ? lead.answers.items.map((i) => i.name).join(', ')
                      : lead.answers.product || 'Sourcing assistance'}
                  </strong>
                  <small className="lead-reference">{lead.id}</small>
                </div>
                <div>
                  <span className={'notification-status ' + lead.notification}>
                    Email: {lead.notification.replaceAll('-', ' ')}
                  </span>
                  {lead.notification !== 'sent' && (
                    <button
                      className="text-link"
                      onClick={async () => {
                        try {
                          await call(
                            '/api/leads/' + lead.id + '/notify',
                            'POST',
                          );
                          await load();
                        } catch (e) {
                          setError((e as Error).message);
                        }
                      }}
                    >
                      Retry notification
                    </button>
                  )}
                  {lead.files.map((f, i) => (
                    <button
                      key={i}
                      className="file-download"
                      onClick={() =>
                        download(
                          '/api/leads/' + lead.id + '/files/' + i,
                          f.name,
                        )
                      }
                    >
                      {f.name} ↓
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
          {cursor && (
            <button
              className="btn outline"
              disabled={busy}
              onClick={() => load(true)}
            >
              Load more requests
            </button>
          )}
        </>
      )}
      {error && (
        <p role="alert" className="wizard-error">
          {error}
        </p>
      )}
    </div>
  );
}
