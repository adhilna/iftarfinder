import { Moon, MapPin, Users, Shield, Globe, Heart } from 'lucide-react';
import { navigate } from '@/router';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-10 animate-fade-in-up">
      <div className="text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
          <Moon className="h-3.5 w-3.5" aria-hidden="true" />
          Ramadan 2026
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
          About Iftar Finder
        </h1>
        <p className="mt-2 text-lg text-ink-soft">
          A community-driven platform to find Iftar near you.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <FeatureCard icon={<MapPin className="h-5 w-5" />} title="Find Iftar Nearby" description="Quickly discover mosques and Islamic centers providing Iftar in your area, with verified information." delay={0} />
        <FeatureCard icon={<Users className="h-5 w-5" />} title="Community Driven" description="Anyone can add a masjid or confirm existing information. No account required to contribute." delay={0.05} />
        <FeatureCard icon={<Shield className="h-5 w-5" />} title="Trust & Freshness" description="Community confirmations and verification statuses keep information accurate and up to date." delay={0.1} />
        <FeatureCard icon={<Globe className="h-5 w-5" />} title="Built for Everyone" description="Starting in Kerala, India — designed for global expansion to serve communities worldwide." delay={0.15} />
      </div>

      {/* How it works */}
      <div className="mt-8 rounded-2xl border border-line bg-surface-card p-5 shadow-soft animate-fade-in-up stagger-2">
        <h2 className="text-base font-bold text-ink">How it works</h2>
        <ol className="mt-3 space-y-3">
          {[
            'Open Iftar Finder and tap "Find Iftar Near Me" or search by location.',
            'Browse nearby masjids with Iftar details, times, and verification status.',
            'Tap any masjid for full details, facilities, and directions.',
            'Confirm information you know is correct, or report if something is wrong.',
            'Add new masjids providing Iftar to help your community.',
          ].map((step, i) => (
            <li key={i} className="flex gap-3 animate-fade-in-up" style={{ animationDelay: `${0.2 + i * 0.05}s`, animationFillMode: 'both' }}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                {i + 1}
              </span>
              <span className="text-sm text-ink-soft">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Trust */}
      <div className="mt-6 rounded-2xl border border-primary-200 bg-primary-50/50 p-5 dark:border-primary-800 dark:bg-primary-900/20 animate-fade-in-up">
        <h2 className="text-base font-bold text-ink">Our commitment to trust</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Every listing carries a verification status so you know how fresh the information is.
          Community confirmations and masjid representative verification help ensure accuracy.
          All submissions are reviewed before becoming trusted listings.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center animate-fade-in-up">
        <button
          onClick={() => navigate({ name: 'search' })}
          className="rounded-xl bg-primary-700 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary-800 hover:shadow-glow active:scale-95 dark:bg-primary-600 dark:hover:bg-primary-500"
        >
          Find Iftar Near Me
        </button>
        <button
          onClick={() => navigate({ name: 'add' })}
          className="rounded-xl border border-line bg-surface-card px-5 py-3 text-sm font-semibold text-ink-soft transition-all hover:bg-ink/5 active:scale-95"
        >
          Add a Masjid
        </button>
      </div>

      <div className="mt-8 text-center text-xs text-ink-muted">
        <p className="inline-flex items-center gap-1">
          Built with <Heart className="h-3 w-3 text-primary-600 dark:text-primary-400" aria-hidden="true" /> for the community
        </p>
      </div>

      <div className="h-16 md:h-6" />
    </div>
  );
}

function FeatureCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode; title: string; description: string; delay?: number }) {
  return (
    <div
      className="rounded-xl border border-line bg-surface-card p-4 shadow-soft transition-all hover:shadow-card hover:translate-y-[-2px] animate-fade-in-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400" aria-hidden="true">
        {icon}
      </div>
      <h3 className="mt-3 text-sm font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{description}</p>
    </div>
  );
}
