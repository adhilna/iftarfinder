import { useState } from 'react';
import { Check, AlertTriangle, Users } from 'lucide-react';

interface Props {
  confirmationCount: number;
  lastConfirmed: string;
  onConfirm: () => void;
  onReport: () => void;
  className?: string;
}

export function ConfirmationButton({ confirmationCount, lastConfirmed, onConfirm, onReport, className = '' }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (confirmed) return;
    setConfirmed(true);
    onConfirm();
  };

  return (
    <div className={`rounded-xl border border-line bg-surface-card p-4 ${className}`}>
      <p className="text-sm font-bold text-ink">Is this information correct?</p>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
        <Users className="h-3.5 w-3.5" aria-hidden="true" />
        {confirmed ? confirmationCount + 1 : confirmationCount} people confirmed this information
        {' · '}Last confirmed {lastConfirmed}
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={handleConfirm}
          disabled={confirmed}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all active:scale-[0.98] ${
            confirmed
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
              : 'bg-primary-700 text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-500'
          }`}
          aria-pressed={confirmed}
        >
          <Check className={`h-4 w-4 transition-transform ${confirmed ? 'scale-110' : ''}`} aria-hidden="true" />
          {confirmed ? 'Confirmed' : 'Yes, confirm'}
        </button>
        <button
          onClick={onReport}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line py-2.5 text-sm font-semibold text-ink-soft transition-all hover:bg-ink/5 active:scale-[0.98]"
        >
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          Report incorrect
        </button>
      </div>
      {confirmed && (
        <p className="mt-2 text-xs font-medium text-primary-700 dark:text-primary-400 animate-fade-in-up">
          Thank you for confirming. Your input helps the community.
        </p>
      )}
    </div>
  );
}
