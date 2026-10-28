import { useState, type FormEvent } from 'react';
import {
  ArrowLeft, MapPin, CheckCircle2, Loader2, Camera, Info,
} from 'lucide-react';
import { ALL_DAYS, DAY_LABELS, IFTAR_TYPE_LABELS } from '@/data';
import type { IftarType, DayOfWeek } from '@/types';
import { navigate } from '@/router';

interface Props {
  onBack: () => void;
}

const IFTAR_TYPE_OPTIONS: IftarType[] = ['full', 'dates_water', 'none', 'unknown'];

export function AddMasjidPage({ onBack }: Props) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [iftarType, setIftarType] = useState<IftarType>('full');
  const [iftarTime, setIftarTime] = useState('');
  const [availableDays, setAvailableDays] = useState<Set<DayOfWeek>>(new Set(ALL_DAYS));
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleDay = (day: DayOfWeek) => {
    setAvailableDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center animate-fade-in-up">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30 animate-scale-in" aria-hidden="true">
          <CheckCircle2 className="h-7 w-7 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-xl font-extrabold text-ink">Submission Received</h1>
        <p className="mt-2 text-sm text-ink-soft animate-fade-in-up stagger-1">
          Thank you for contributing. Your submission will be reviewed before becoming a trusted listing.
          This usually takes 1-2 days.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center animate-fade-in-up stagger-2">
          <button
            onClick={() => navigate({ name: 'search' })}
            className="rounded-xl bg-primary-700 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary-800 active:scale-95 dark:bg-primary-600 dark:hover:bg-primary-500"
          >
            Browse Iftar locations
          </button>
          <button
            onClick={() => {
              setSubmitted(false);
              setName(''); setLocation(''); setIftarTime(''); setContact(''); setNotes('');
              setAvailableDays(new Set(ALL_DAYS));
            }}
            className="rounded-xl border border-line bg-surface-card px-5 py-3 text-sm font-semibold text-ink-soft transition-all hover:bg-ink/5 active:scale-95"
          >
            Add another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-4 md:py-6 animate-fade-in-up">
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink active:scale-95">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back
      </button>

      <h1 className="text-2xl font-extrabold tracking-tight text-ink">Add a Masjid</h1>
      <p className="mt-1.5 text-sm text-ink-soft">
        Know a masjid that provides Iftar? Share it with the community.
      </p>

      {/* Review notice */}
      <div className="mt-4 flex items-start gap-3 rounded-xl border border-accent-200 bg-accent-50 p-3.5 dark:border-accent-800 dark:bg-accent-900/20">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-700 dark:text-accent-400" aria-hidden="true" />
        <p className="text-sm text-accent-800 dark:text-accent-300">
          Your submission will be reviewed before becoming a trusted listing. No account needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        {/* Masjid name */}
        <Field label="Masjid name" required>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Masjid Al Noor"
            className={inputClass}
          />
        </Field>

        {/* Location */}
        <Field label="Location" required hint="Use current location, search, or pick on map.">
          <div className="flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="City, area or address"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setLocation('My current location')}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-line bg-surface-card px-3.5 text-sm font-semibold text-ink-soft transition-all hover:bg-ink/5 active:scale-95"
              aria-label="Use current location"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </Field>

        {/* Iftar type */}
        <Field label="Iftar type" required>
          <div className="grid grid-cols-2 gap-2">
            {IFTAR_TYPE_OPTIONS.map((type) => (
              <label
                key={type}
                className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm font-semibold transition-all ${
                  iftarType === type
                    ? 'border-primary-400 bg-primary-50 text-primary-800 dark:border-primary-600 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'border-line text-ink-soft hover:bg-ink/5'
                }`}
              >
                <input
                  type="radio"
                  name="iftar-type"
                  value={type}
                  checked={iftarType === type}
                  onChange={() => setIftarType(type)}
                  className="sr-only"
                />
                {IFTAR_TYPE_LABELS[type]}
              </label>
            ))}
          </div>
        </Field>

        {/* Iftar time */}
        <Field label="Iftar time" hint="Approximate Maghrib / Iftar time.">
          <input
            type="text"
            value={iftarTime}
            onChange={(e) => setIftarTime(e.target.value)}
            placeholder="e.g. 6:42 PM"
            className={inputClass}
          />
        </Field>

        {/* Available days */}
        <Field label="Available days">
          <div className="flex flex-wrap gap-1.5">
            {ALL_DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all active:scale-90 ${
                  availableDays.has(day)
                    ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-300 dark:bg-primary-900/30 dark:text-primary-300 dark:ring-primary-700'
                    : 'bg-stone-100 text-ink-faint hover:bg-stone-200 dark:bg-stone-800/50 dark:text-stone-500 dark:hover:bg-stone-700/50'
                }`}
                aria-pressed={availableDays.has(day)}
              >
                {DAY_LABELS[day]}
              </button>
            ))}
          </div>
        </Field>

        {/* Contact — optional */}
        <Field label="Contact number" optional>
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Phone number (optional)"
            className={inputClass}
          />
        </Field>

        {/* Photo — optional */}
        <Field label="Photo" optional>
          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-line bg-ink/5 p-6 text-center transition-colors hover:border-primary-400 hover:bg-primary-50/30 dark:hover:bg-primary-900/10">
            <div>
              <Camera className="mx-auto h-8 w-8 text-ink-faint" aria-hidden="true" />
              <p className="mt-2 text-sm text-ink-muted">Tap to upload a photo</p>
              <p className="mt-0.5 text-xs text-ink-faint">JPG or PNG, max 5MB</p>
            </div>
          </div>
        </Field>

        {/* Additional info */}
        <Field label="Additional information" optional>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Any helpful details about the Iftar arrangement…"
            className={inputClass}
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || !name || !location}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 py-3.5 text-base font-bold text-white shadow-card transition-all hover:bg-primary-800 hover:shadow-glow active:scale-[0.98] disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-500"
        >
          {submitting ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          )}
          {submitting ? 'Submitting…' : 'Submit for Review'}
        </button>
      </form>

      <div className="h-16 md:h-6" />
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-line bg-surface-card px-4 py-3 text-sm text-ink placeholder:text-ink-muted transition-all focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800';

function Field({
  label,
  required,
  optional,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-danger-500"> *</span>}
        {optional && <span className="ml-1 text-xs font-normal text-ink-muted">(optional)</span>}
      </label>
      {hint && <p className="mt-0.5 text-xs text-ink-muted">{hint}</p>}
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
