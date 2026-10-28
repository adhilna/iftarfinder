import { Moon, Sparkles, MapPin, Search, PlusCircle, Star } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { LocationButton } from '@/components/LocationButton';
import { SearchBar } from '@/components/SearchBar';
import { navigate } from '@/router';

interface Props {
  onFindNearby: () => void;
  onSearch: (query: string) => void;
}

export function HomePage({ onFindNearby, onSearch }: Props) {
  const { state, request } = useGeolocation();

  const handleLocation = () => {
    request();
    onFindNearby();
  };

  return (
    <div className="relative">
      {/* Subtle decorative Ramadan elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <Moon
          className="absolute right-[8%] top-[18%] h-28 w-28 text-primary-100/50 dark:text-primary-900/20 animate-float"
          style={{ rotate: '-15deg' }}
        />
        <Sparkles className="absolute left-[15%] top-[60%] h-4 w-4 text-accent-300 dark:text-accent-700 animate-twinkle" />
        <Sparkles className="absolute right-[20%] top-[75%] h-3 w-3 text-accent-300 dark:text-accent-700 animate-twinkle" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute left-[40%] top-[28%] h-3.5 w-3.5 text-primary-200 dark:text-primary-800 animate-twinkle" style={{ animationDelay: '2s' }} />
        <Star className="absolute left-[70%] top-[50%] h-2 w-2 text-accent-300 dark:text-accent-700 animate-twinkle" style={{ animationDelay: '1.5s' }} fill="currentColor" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 py-10 md:py-16">
        {/* Hero */}
        <div className="text-center animate-fade-in-up">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
            <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            Ramadan 2026
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Ramadan Iftar Finder
          </h1>
          <p className="mt-2 text-lg text-ink-soft">
            Find Iftar near you
          </p>
        </div>

        {/* Search actions */}
        <div className="mt-8 space-y-4 animate-fade-in-up stagger-1">
          <LocationButton
            state={state}
            onClick={handleLocation}
            className="w-full"
            label="Find Iftar Near Me"
          />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">or</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <SearchBar
            onSubmit={onSearch}
            autoFocus={false}
          />
        </div>

        {/* Quick stats */}
        <div className="mt-10 grid grid-cols-3 gap-3 animate-fade-in-up stagger-2">
          {[
            { value: '120+', label: 'Masjids listed' },
            { value: '8', label: 'Cities' },
            { value: '540+', label: 'Confirmations' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-line bg-surface-card p-3 text-center shadow-soft transition-all hover:shadow-card hover:translate-y-[-1px]">
              <div className="text-xl font-extrabold text-primary-700 dark:text-primary-400">{stat.value}</div>
              <div className="mt-0.5 text-xs text-ink-soft">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center animate-fade-in-up stagger-3">
          <button
            onClick={() => navigate({ name: 'search' })}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-card px-5 py-3 text-sm font-semibold text-ink-soft transition-all hover:bg-ink/5 hover:translate-y-[-1px]"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Browse Iftar locations
          </button>
          <button
            onClick={() => navigate({ name: 'add' })}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-card px-5 py-3 text-sm font-semibold text-ink-soft transition-all hover:bg-ink/5 hover:translate-y-[-1px]"
          >
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Add a masjid
          </button>
        </div>
      </div>

      {/* Nearby preview */}
      <div className="relative mx-auto max-w-2xl px-4 pb-10 animate-fade-in-up stagger-4">
        <div className="rounded-2xl border border-line bg-gradient-to-b from-primary-50/50 to-transparent p-5 dark:from-primary-900/20 dark:to-transparent">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary-700 dark:text-primary-400" aria-hidden="true" />
            <h2 className="text-base font-bold text-ink">Nearby Iftar</h2>
          </div>
          <p className="mt-1.5 text-sm text-ink-soft">
            Tap "Find Iftar Near Me" to see masjids providing Iftar around your location, or browse by city.
          </p>
          <button
            onClick={() => navigate({ name: 'search' })}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 transition-all hover:gap-2.5 dark:text-primary-400"
          >
            Browse all locations
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
