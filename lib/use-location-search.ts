'use client';
import { useSyncExternalStore } from 'react';
function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}
const snapshot = () => window.location.search;
const serverSnapshot = () => '';
export function useLocationSearch() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
