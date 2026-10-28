import { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { REPORT_REASONS } from '@/data';
import type { ReportReason } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
  masjidName: string;
}

export function ReportDialog({ open, onClose, masjidName }: Props) {
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null);
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = () => {
    if (!selectedReason) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSelectedReason(null);
    setDetails('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 animate-fade-in" onClick={handleClose} aria-hidden="true" />
      <div
        className="relative w-full max-w-md rounded-t-2xl bg-surface-card shadow-lifted animate-slide-up md:rounded-2xl md:animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
      >
        {submitted ? (
          <div className="p-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30 animate-scale-in" aria-hidden="true">
              <CheckCircle2 className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-bold text-ink animate-fade-in-up">Report Submitted</h3>
            <p className="mt-1.5 text-sm text-ink-soft animate-fade-in-up stagger-1">
              Thank you for reporting. Our team will review the information for {masjidName}.
            </p>
            <button
              onClick={handleClose}
              className="mt-5 w-full rounded-xl bg-primary-700 py-3 text-sm font-bold text-white transition-all hover:bg-primary-800 active:scale-[0.98] dark:bg-primary-600 dark:hover:bg-primary-500"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-line p-4">
              <h3 id="report-title" className="text-base font-bold text-ink">Report Incorrect Information</h3>
              <button onClick={handleClose} className="rounded-full p-1.5 text-ink-muted transition-colors hover:bg-ink/5" aria-label="Close report dialog">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-4">
              <p className="mb-3 text-sm text-ink-soft">
                Reporting <span className="font-semibold text-ink">{masjidName}</span>
              </p>
              <fieldset>
                <legend className="text-sm font-semibold text-ink">What's incorrect?</legend>
                <div className="mt-2 space-y-2">
                  {REPORT_REASONS.map((reason) => (
                    <label
                      key={reason.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-all ${
                        selectedReason?.id === reason.id
                          ? 'border-primary-400 bg-primary-50 text-primary-800 dark:border-primary-600 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'border-line text-ink-soft hover:bg-ink/5'
                      }`}
                    >
                      <input
                        type="radio"
                        name="report-reason"
                        value={reason.id}
                        checked={selectedReason?.id === reason.id}
                        onChange={() => setSelectedReason(reason)}
                        className="h-4 w-4 accent-primary-700"
                      />
                      {reason.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="mt-4">
                <label htmlFor="report-details" className="text-sm font-semibold text-ink">
                  Additional details <span className="font-normal text-ink-muted">(optional)</span>
                </label>
                <textarea
                  id="report-details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full rounded-lg border border-line bg-surface-card p-3 text-sm text-ink placeholder:text-ink-muted focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800"
                  placeholder="Provide any helpful context…"
                />
              </div>
            </div>
            <div className="border-t border-line p-4">
              <button
                onClick={handleSubmit}
                disabled={!selectedReason}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 py-3 text-sm font-bold text-white transition-all hover:bg-primary-800 active:scale-[0.98] disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-500"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Submit Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
