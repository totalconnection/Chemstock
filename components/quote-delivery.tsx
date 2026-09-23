'use client';
import { useEffect, useRef, useState } from 'react';
import type { QuoteAnswers } from '../lib/quote';
type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
export default function QuoteDelivery({
  answers,
  files,
  emailHref,
  onSaved,
}: {
  answers: QuoteAnswers;
  files: File[];
  emailHref: string;
  onSaved: (id: string, preview: boolean) => void;
}) {
  const [config, setConfig] = useState<{
    enabled: boolean;
    siteKey: string;
    preview: boolean;
  } | null>(null);
  const [token, setToken] = useState('');
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const reference = useRef('');
  const widget = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/lead-config', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((v) =>
        setConfig(
          v as { enabled: boolean; siteKey: string; preview: boolean } | null,
        ),
      )
      .catch(() => {});
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!config?.siteKey || !widget.current) return;
    let stopped = false;
    let id: string | undefined;
    const get = () =>
      (window as unknown as { turnstile?: Turnstile }).turnstile;
    const render = () => {
      if (!stopped && widget.current)
        id = get()?.render(widget.current, {
          sitekey: config.siteKey,
          callback: setToken,
          'expired-callback': () => setToken(''),
          'error-callback': () =>
            setError(
              'Verification could not load. Please retry or send by email.',
            ),
        });
    };
    let script = document.querySelector<HTMLScriptElement>(
      'script[data-chemstock-turnstile]',
    );
    if (get()) render();
    else {
      if (!script) {
        script = document.createElement('script');
        script.src =
          'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.dataset.chemstockTurnstile = 'true';
        document.head.appendChild(script);
      }
      script.addEventListener('load', render);
    }
    return () => {
      stopped = true;
      script?.removeEventListener('load', render);
      if (id) get()?.remove(id);
    };
  }, [config?.siteKey, retry]);
  async function send() {
    setBusy(true);
    setError('');
    try {
      if (!reference.current)
        reference.current = 'CS-' + crypto.randomUUID().replaceAll('-', '');
      const body = new FormData();
      body.set('reference', reference.current);
      body.set('payload', JSON.stringify(answers));
      body.set('token', token);
      files.forEach((f) => body.append('files', f));
      const response = await fetch('/api/quotes', { method: 'POST', body });
      const result = (await response.json()) as {
        error?: string;
        reference: string;
        preview: boolean;
      };
      if (!response.ok)
        throw new Error(result.error || 'Unable to save. Please retry.');
      setSaved(true);
      onSaved(result.reference, result.preview);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Unable to save. Please retry.',
      );
      setToken('');
      setRetry((n) => n + 1);
    } finally {
      setBusy(false);
    }
  }
  if (saved)
    return (
      <div className="submission-saved">
        <strong>What happens next</strong>
        <p>
          Our team reviews the material, grade, and delivery requirements, then
          follows up using your contact details.
        </p>
        {config?.preview && (
          <p>This is a local preview record. No email has been sent.</p>
        )}
      </div>
    );
  return (
    <div className="quote-delivery">
      {config?.enabled ? (
        <>
          {config.preview && (
            <p className="preview-notice">
              Preview mode · saves locally for review. Email delivery will be
              connected later.
            </p>
          )}
          <div ref={widget} />
          <button
            type="button"
            className="btn wizard-next"
            disabled={busy || (!!config.siteKey && !token)}
            onClick={send}
          >
            {busy
              ? 'Saving your request…'
              : config.preview
                ? 'Save preview request'
                : 'Send quote request'}
          </button>
          <small>Your files are submitted with this request.</small>
        </>
      ) : (
        <p>
          Direct submission is not available here yet. You can send your request
          by email.
        </p>
      )}
      {error && (
        <p role="alert" className="wizard-error">
          {error}
        </p>
      )}
      <a
        className={config?.enabled ? 'text-link' : 'btn wizard-next'}
        href={emailHref}
      >
        Send through your email app{config?.enabled ? ' instead' : ''} ↗
      </a>
      {files.length > 0 && (
        <p className="small-copy">
          If using email, attach your selected files manually.
        </p>
      )}
    </div>
  );
}
