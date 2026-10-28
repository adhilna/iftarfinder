import { useState, useEffect } from 'react';
import {
  ArrowLeft, MapPin, Navigation, Clock, Calendar, Phone,
  Info, Home, CheckCircle2, AlertTriangle,
} from 'lucide-react';
import { getMasjidById, DAY_LABELS, ALL_DAYS } from '@/data';
import type { DayOfWeek } from '@/types';
import { IftarTypeBadge } from '@/components/IftarTypeBadge';
import { VerificationBadge } from '@/components/VerificationBadge';
import { DistanceLabel } from '@/components/DistanceLabel';
import { ConfirmationButton } from '@/components/ConfirmationButton';
import { ReportDialog } from '@/components/ReportDialog';
import { DetailSkeleton } from '@/components/LoadingState';
import { MasjidMap } from '@/components/MasjidMap';
import { navigate } from '@/router';

interface Props {
  id: string;
  onBack: () => void;
}

export function MasjidDetailPage({ id, onBack }: Props) {
  const [loading, setLoading] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [id]);

  const masjid = getMasjidById(id);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </button>
        <DetailSkeleton />
      </div>
    );
  }

  if (!masjid) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center animate-fade-in-up">
        <h2 className="text-lg font-bold text-ink">Masjid not found</h2>
        <p className="mt-1 text-sm text-ink-soft">This listing may have been removed.</p>
        <button onClick={() => navigate({ name: 'search' })} className="mt-5 rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-800 active:scale-95 dark:bg-primary-600 dark:hover:bg-primary-500">
          Browse Iftar locations
        </button>
      </div>
    );
  }

  const availableDaySet = new Set(masjid.availableDays);
  const isEveryDay = masjid.availableDays.length === ALL_DAYS.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-4 md:py-6 animate-fade-in-up">
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink active:scale-95">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        Back to results
      </button>

      {/* Photo or placeholder */}
      <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 md:h-56 dark:from-primary-800 dark:to-primary-950">
        <div className="absolute inset-0 flex items-center justify-center">
          <Home className="h-16 w-16 text-white/20 animate-float" aria-hidden="true" />
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <IftarTypeBadge type={masjid.iftarType} className="!bg-white/90 dark:!bg-black/40" />
        </div>
      </div>

      {/* Title */}
      <div className="mt-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">{masjid.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {masjid.distanceKm !== undefined && <DistanceLabel distanceKm={masjid.distanceKm} />}
          <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {masjid.city}, {masjid.region}, {masjid.country}
          </span>
        </div>
      </div>

      {/* Verification */}
      <div className="mt-4 animate-fade-in-up stagger-1">
        <VerificationBadge
          status={masjid.verification.status}
          lastConfirmed={masjid.verification.lastConfirmedDate}
          confirmationCount={masjid.verification.confirmationCount}
          variant="full"
        />
      </div>

      {/* Primary CTA */}
      <div className="mt-4 flex gap-2 animate-fade-in-up stagger-2">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${masjid.lat},${masjid.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-700 py-3.5 text-base font-bold text-white shadow-card transition-all hover:bg-primary-800 hover:shadow-glow active:scale-[0.98] dark:bg-primary-600 dark:hover:bg-primary-500"
        >
          <Navigation className="h-5 w-5" aria-hidden="true" />
          Get Directions
        </a>
      </div>

      {/* Iftar information */}
      <Section title="Iftar Information" icon={<Clock className="h-4 w-4" />}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoRow label="Iftar Type" value={masjid.iftarType === 'full' ? 'Full Iftar' : masjid.iftarType === 'dates_water' ? 'Dates & Water' : 'Unknown'} />
          <InfoRow label="Iftar Time" value={masjid.iftarTime} />
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            Available Days
          </div>
          {isEveryDay ? (
            <p className="mt-1.5 text-sm text-ink">Every day during Ramadan</p>
          ) : (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {ALL_DAYS.map((day: DayOfWeek) => (
                <span
                  key={day}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                    availableDaySet.has(day)
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'bg-stone-100 text-ink-faint dark:bg-stone-800/50 dark:text-stone-500'
                  }`}
                >
                  {DAY_LABELS[day]}
                </span>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Map preview */}
      <Section title="Location" icon={<MapPin className="h-4 w-4" />}>
        <MasjidMap masjids={[masjid]} selectedId={masjid.id} className="h-48 w-full" />
        <p className="mt-2 text-sm text-ink-soft">{masjid.address}</p>
      </Section>

      {/* Facilities */}
      {masjid.facilities.length > 0 && (
        <Section title="Facilities" icon={<Info className="h-4 w-4" />}>
          <div className="flex flex-wrap gap-2">
            {masjid.facilities.map((f) => (
              <span key={f} className="rounded-lg border border-line bg-ink/5 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-ink/10">
                {f}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Contact */}
      {masjid.contact && (
        <Section title="Contact" icon={<Phone className="h-4 w-4" />}>
          <a href={`tel:${masjid.contact}`} className="text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
            {masjid.contact}
          </a>
        </Section>
      )}

      {/* Notes */}
      {masjid.notes && (
        <Section title="Additional Notes">
          <p className="text-sm leading-relaxed text-ink-soft">{masjid.notes}</p>
        </Section>
      )}

      {/* Community confirmation */}
      <div className="mt-6 animate-fade-in-up">
        <ConfirmationButton
          confirmationCount={masjid.verification.confirmationCount}
          lastConfirmed={masjid.verification.lastConfirmedDate}
          onConfirm={() => {}}
          onReport={() => setReportOpen(true)}
        />
      </div>

      {/* Footer actions */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => navigate({ name: 'add' })}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-surface-card py-3 text-sm font-semibold text-ink-soft transition-all hover:bg-ink/5 active:scale-[0.98]"
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Add another masjid
        </button>
        <button
          onClick={() => setReportOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-surface-card py-3 text-sm font-semibold text-ink-soft transition-all hover:bg-ink/5 active:scale-[0.98]"
        >
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          Report incorrect information
        </button>
      </div>

      <div className="h-16 md:h-6" />

      <ReportDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        masjidName={masjid.name}
      />
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-line bg-surface-card p-4 shadow-soft animate-fade-in-up">
      <h2 className="flex items-center gap-1.5 text-sm font-bold text-ink">
        {icon && <span className="text-ink-muted" aria-hidden="true">{icon}</span>}
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ink/5 p-3">
      <div className="text-xs font-medium text-ink-muted">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}
