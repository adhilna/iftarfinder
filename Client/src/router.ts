import { useState, useEffect, useCallback } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'search'; query?: string }
  | { name: 'masjid'; id: string }
  | { name: 'add' }
  | { name: 'about' };

export function navigate(route: Route) {
  window.dispatchEvent(new CustomEvent('app-route', { detail: route }));
}

export function useRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>({ name: 'home' });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Route>).detail;
      setRoute(detail);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('app-route', handler);
    return () => window.removeEventListener('app-route', handler);
  }, []);

  const go = useCallback((r: Route) => navigate(r), []);

  return [route, go];
}
