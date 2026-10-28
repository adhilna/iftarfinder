import { X, ChevronRight } from 'lucide-react';
import type { Masjid } from '@/types';
import { IftarTypeBadge } from './IftarTypeBadge';
import { VerificationBadge } from './VerificationBadge';
import { DistanceLabel } from './DistanceLabel';
import { TimeLabel } from './TimeLabel';

interface Props {
  masjid: Masjid;
  onViewDetails: (id: string) => void;
  onClose: () => void;
}

export function MasjidPreview({ masjid, onViewDetails, onClose }: Props) {
  return (
    <div className="rounded-t-2xl bg-surface-card shadow-lifted animate-slide-up">
      <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-ink-faint" aria-hidden="true" />
      <div className="flex items-start justify-between p-4 pb-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-ink">{masjid.name}</h3>
          <p className="mt-0.5 truncate text-sm text-ink-soft">{masjid.city}, {masjid.region}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-2 shrink-0 rounded-full p-1.5 text-ink-muted transition-colors hover:bg-ink/5"
          aria-label="Close preview"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 px-4">
        <IftarTypeBadge type={masjid.iftarType} />
        {masjid.distanceKm !== undefined && <DistanceLabel distanceKm={masjid.distanceKm} />}
        <TimeLabel time={masjid.iftarTime} />
      </div>
      <div className="mt-2 px-4">
        <VerificationBadge
          status={masjid.verification.status}
          lastConfirmed={masjid.verification.lastConfirmedDate}
        />
      </div>
      <div className="p-4 pt-3">
        <button
          onClick={() => onViewDetails(masjid.id)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 py-3 text-sm font-bold text-white transition-all hover:bg-primary-800 active:scale-[0.98] dark:bg-primary-600 dark:hover:bg-primary-500"
        >
          View Details
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
