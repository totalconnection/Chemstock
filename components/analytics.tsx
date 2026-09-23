'use client';

import { useEffect, useState } from 'react';

const measurementId = 'G-TLZLJB19MZ';
const preferenceKey = 'chemstock-analytics-consent';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  'ga-disable-G-TLZLJB19MZ'?: boolean;
};

export function Analytics() {
  const [choice, setChoice] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!['chemstock.com', 'www.chemstock.com'].includes(location.hostname) ||
        location.pathname.startsWith('/leads')) return;
    let saved: string | null = null;
    try { saved = localStorage.getItem(preferenceKey); } catch { /* Keep tracking off. */ }
    setChoice(saved);
    setOpen(saved !== 'accepted' && saved !== 'declined');
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const analytics = window as AnalyticsWindow;
    analytics['ga-disable-G-TLZLJB19MZ'] = choice !== 'accepted';
    if (choice !== 'accepted') return;
    if (document.getElementById('chemstock-google-tag')) return;
    analytics.dataLayer = analytics.dataLayer || [];
    analytics.gtag = function () { analytics.dataLayer!.push(arguments); };
    analytics.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    analytics.gtag('js', new Date());
    analytics.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement('script');
    script.id = 'chemstock-google-tag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }, [choice, ready]);

  function save(value: 'accepted' | 'declined') {
    try { localStorage.setItem(preferenceKey, value); } catch { /* Apply for this visit. */ }
    const analytics = window as AnalyticsWindow;
    analytics['ga-disable-G-TLZLJB19MZ'] = value !== 'accepted';
    analytics.gtag?.('consent', 'update', {
      analytics_storage: value === 'accepted' ? 'granted' : 'denied',
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    });
    setChoice(value);
    setOpen(false);
    if (value === 'declined') {
      (window as AnalyticsWindow)['ga-disable-G-TLZLJB19MZ'] = true;
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (name === '_ga' || name.startsWith('_ga_')) {
          for (const domain of ['', '; domain=chemstock.com', '; domain=.chemstock.com', `; domain=${location.hostname}`]) {
            document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
          }
        }
      }
    }
  }

  if (!ready) return null;
  return (
    <>
      <div style={{ padding: '12px 24px', textAlign: 'center', background: '#fff', color: '#23272d' }}>
        <button type="button" onClick={() => setOpen(true)} style={{ textDecoration: 'underline' }}>
          Analytics preferences
        </button>
      </div>
      {open && (
        <section aria-label="Analytics preferences" style={{ position: 'fixed', bottom: 16, left: 16, right: 16, maxWidth: 540, marginLeft: 'auto', padding: 24, background: '#fff', color: '#23272d', border: '1px solid #ccd1d9', boxShadow: '0 4px 24px #0002', zIndex: 1000 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Help us improve Chemstock</h2>
          <p style={{ fontSize: 14, lineHeight: 1.5 }}>With your permission, Google Analytics uses cookies to measure visits and interactions. You can decline and still use the entire site. Change your choice anytime in Analytics preferences. <a href="/privacy/" style={{ textDecoration: 'underline' }}>Privacy policy</a></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
            <button type="button" onClick={() => save('accepted')} style={{ border: '1px solid #26394c', padding: '10px 16px', background: '#fff' }}>Allow analytics</button>
            <button type="button" onClick={() => save('declined')} style={{ border: '1px solid #26394c', padding: '10px 16px', background: '#fff' }}>Decline analytics</button>
          </div>
        </section>
      )}
    </>
  );
}
