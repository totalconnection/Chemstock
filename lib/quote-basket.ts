'use client';
import { useMemo, useSyncExternalStore } from 'react';
import { products } from './catalogue';
export type BasketItem = {
  slug: string;
  quantity: string;
  unit: string;
  notes: string;
  unknown: boolean;
};
const KEY = 'chemstock-quote-list-v1';
const EVENT = 'chemstock-quote-list-change';
const units = ['kg', 'lb', 'metric tons', 'liters', 'gallons'];
let fallback = '[]';
let storageUnavailable = false;
function snapshot() {
  try {
    return storageUnavailable
      ? fallback
      : localStorage.getItem(KEY) || fallback;
  } catch {
    return fallback;
  }
}
export function parseBasket(raw: string): BasketItem[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed
      .filter(
        (x) =>
          x &&
          typeof x.slug === 'string' &&
          products.some((p) => p.slug === x.slug) &&
          !seen.has(x.slug) &&
          seen.add(x.slug),
      )
      .slice(0, 50)
      .map((x) => ({
        slug: x.slug,
        quantity: typeof x.quantity === 'string' ? x.quantity.slice(0, 20) : '',
        unit: units.includes(x.unit) ? x.unit : 'kg',
        notes: typeof x.notes === 'string' ? x.notes.slice(0, 500) : '',
        unknown: x.unknown !== false,
      }));
  } catch {
    return [];
  }
}
function subscribe(notify: () => void) {
  window.addEventListener('storage', notify);
  window.addEventListener(EVENT, notify);
  return () => {
    window.removeEventListener('storage', notify);
    window.removeEventListener(EVENT, notify);
  };
}
function save(items: BasketItem[]) {
  fallback = JSON.stringify(items);
  try {
    localStorage.setItem(KEY, fallback);
  } catch {
    storageUnavailable = true;
    /* Keep this tab usable when storage is unavailable. */
  }
  window.dispatchEvent(new Event(EVENT));
}
export function useQuoteBasket() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '[]');
  return useMemo(() => parseBasket(raw), [raw]);
}
export function addToBasket(slug: string) {
  const items = parseBasket(snapshot());
  if (items.some((p) => p.slug === slug)) return true;
  if (items.length >= 50) return false;
  save([
    ...items,
    { slug, quantity: '', unit: 'kg', notes: '', unknown: true },
  ]);
  return true;
}
export function updateBasket(slug: string, values: Partial<BasketItem>) {
  save(
    parseBasket(snapshot()).map((p) =>
      p.slug === slug ? { ...p, ...values, slug } : p,
    ),
  );
}
export function removeFromBasket(slug: string) {
  save(parseBasket(snapshot()).filter((p) => p.slug !== slug));
}
export function clearBasket() {
  save([]);
}
