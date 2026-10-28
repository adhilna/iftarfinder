import { useState, useCallback } from 'react';

export type LocationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'granted'; lat: number; lng: number }
  | { status: 'denied' }
  | { status: 'error' };

export function useGeolocation() {
  const [state, setState] = useState<LocationState>({ status: 'idle' });

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setState({ status: 'error' });
      return;
    }
    setState({ status: 'loading' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: 'granted',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => setState({ status: 'denied' }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  return { state, request };
}
