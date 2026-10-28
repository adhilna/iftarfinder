import type { VerificationStatus } from '@/types';

interface Config {
  label: string;
  icon: string;
  bg: string;
  text: string;
  border: string;
  ariaLabel: string;
}

const CONFIG: Record<VerificationStatus, Config> = {
  confirmed_today: {
    label: 'Confirmed Today',
    icon: '🟢',
    bg: 'bg-primary-50 dark:bg-primary-900/30',
    text: 'text-primary-800 dark:text-primary-300',
    border: 'border-primary-200 dark:border-primary-800',
    ariaLabel: 'Status: Confirmed today',
  },
  confirmed_recent: {
    label: 'Community Confirmed',
    icon: '🟢',
    bg: 'bg-primary-50 dark:bg-primary-900/30',
    text: 'text-primary-800 dark:text-primary-300',
    border: 'border-primary-200 dark:border-primary-800',
    ariaLabel: 'Status: Community confirmed',
  },
  needs_confirmation: {
    label: 'Needs Confirmation',
    icon: '🟡',
    bg: 'bg-accent-50 dark:bg-accent-900/30',
    text: 'text-accent-800 dark:text-accent-300',
    border: 'border-accent-200 dark:border-accent-800',
    ariaLabel: 'Status: Needs confirmation',
  },
  potentially_outdated: {
    label: 'May Be Outdated',
    icon: '⚠',
    bg: 'bg-accent-50 dark:bg-accent-900/30',
    text: 'text-accent-800 dark:text-accent-300',
    border: 'border-accent-200 dark:border-accent-800',
    ariaLabel: 'Status: Information may be outdated',
  },
  recently_submitted: {
    label: 'Awaiting Verification',
    icon: '🟡',
    bg: 'bg-accent-50 dark:bg-accent-900/30',
    text: 'text-accent-800 dark:text-accent-300',
    border: 'border-accent-200 dark:border-accent-800',
    ariaLabel: 'Status: Awaiting verification',
  },
  representative_verified: {
    label: 'Representative Verified',
    icon: '🕌',
    bg: 'bg-primary-50 dark:bg-primary-900/30',
    text: 'text-primary-800 dark:text-primary-300',
    border: 'border-primary-200 dark:border-primary-800',
    ariaLabel: 'Status: Masjid representative verified',
  },
};

interface Props {
  status: VerificationStatus;
  lastConfirmed?: string;
  confirmationCount?: number;
  variant?: 'badge' | 'full';
  className?: string;
}

export function VerificationBadge({
  status,
  lastConfirmed,
  confirmationCount,
  variant = 'badge',
  className = '',
}: Props) {
  const c = CONFIG[status];

  if (variant === 'full') {
    return (
      <div
        className={`rounded-xl border ${c.border} ${c.bg} p-3 ${className}`}
        role="status"
        aria-label={c.ariaLabel}
      >
        <div className="flex items-center gap-2">
          <span aria-hidden="true">{c.icon}</span>
          <span className={`text-sm font-bold ${c.text}`}>{c.label}</span>
        </div>
        {lastConfirmed && (
          <p className={`mt-1 text-xs ${c.text} opacity-80`}>
            Last confirmed {lastConfirmed}
            {confirmationCount !== undefined && confirmationCount > 0
              ? ` · ${confirmationCount} community confirmations`
              : ''}
          </p>
        )}
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${c.border} ${c.bg} px-2 py-0.5 text-xs font-semibold ${c.text} ${className}`}
      role="status"
      aria-label={c.ariaLabel}
    >
      <span aria-hidden="true">{c.icon}</span>
      {c.label}
    </span>
  );
}
