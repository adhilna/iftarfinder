import { MapPin, Loader2 } from 'lucide-react';
import type { LocationState } from '@/hooks/useGeolocation';

interface Props {
  state: LocationState;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'compact';
  label?: string;
}

export function LocationButton({ state, onClick, className = '', variant = 'primary', label = 'Find Iftar Near Me' }: Props) {
  const loading = state.status === 'loading';

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-3.5 py-2 text-sm font-semibold text-primary-700 transition-all hover:bg-primary-100 active:scale-95 disabled:opacity-60 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <MapPin className="h-4 w-4" aria-hidden="true" />}
        Use My Location
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary-700 px-6 py-4 text-base font-bold text-white shadow-card transition-all hover:bg-primary-800 hover:shadow-glow active:scale-[0.98] disabled:opacity-70 dark:bg-primary-600 dark:hover:bg-primary-500 ${className}`}
      aria-busy={loading}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      ) : (
        <MapPin className="h-5 w-5 animate-pulse-soft" aria-hidden="true" />
      )}
      {loading ? 'Locating…' : label}
    </button>
  );
}
