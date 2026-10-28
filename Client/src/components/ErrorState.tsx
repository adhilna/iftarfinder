import { AlertCircle, RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again in a moment.',
  action,
  className = '',
}: Props) {
  return (
    <div className={`flex flex-col items-center justify-center px-6 py-16 text-center animate-fade-in-up ${className}`}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger-50 dark:bg-danger-900/30 animate-scale-in" aria-hidden="true">
        <AlertCircle className="h-6 w-6 text-danger-500 dark:text-danger-400" />
      </div>
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-soft">{description}</p>
      {action ?? (
        <button
          onClick={() => window.location.reload()}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-800 active:scale-95 dark:bg-primary-600 dark:hover:bg-primary-500"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  );
}
