import { memo } from 'react';
import { ChevronRight } from 'lucide-react';
import type { Masjid } from '@/types';
import { IftarTypeBadge } from './IftarTypeBadge';
import { VerificationBadge } from './VerificationBadge';
import { DistanceLabel } from './DistanceLabel';
import { TimeLabel } from './TimeLabel';

interface Props {
  masjid: Masjid;
  onClick?: (id: string) => void;
  className?: string;
}

export const MasjidCard = memo(function MasjidCard({ masjid, onClick, className = '' }: Props) {
  return (
    <button
      onClick={() => onClick?.(masjid.id)}
      className={`group w-full rounded-xl border border-line/80 bg-surface-card p-4 text-left shadow-soft transition-all duration-200 hover:border-primary-300 hover:shadow-card hover:translate-y-[-1px] focus-visible:border-primary-400 dark:hover:border-primary-700 ${className}`}
      aria-label={`View details for ${masjid.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-ink">{masjid.name}</h3>
          <p className="mt-0.5 truncate text-sm text-ink-soft">{masjid.city}, {masjid.region}</p>
        </div>
        <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-primary-600 dark:group-hover:text-primary-400" aria-hidden="true" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <IftarTypeBadge type={masjid.iftarType} />
        {masjid.distanceKm !== undefined && <DistanceLabel distanceKm={masjid.distanceKm} />}
        <TimeLabel time={masjid.iftarTime} />
      </div>

      <div className="mt-3">
        <VerificationBadge
          status={masjid.verification.status}
          lastConfirmed={masjid.verification.lastConfirmedDate}
        />
      </div>
    </button>
  );
});
