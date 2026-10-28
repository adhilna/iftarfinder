import { useState, useEffect, useCallback } from 'react';
import { List, Map as MapIcon, SlidersHorizontal } from 'lucide-react';
import { masjids } from '@/data';
import type { Masjid } from '@/types';
import { MasjidCard } from '@/components/MasjidCard';
import { MasjidMap } from '@/components/MasjidMap';
import { MasjidPreview } from '@/components/MasjidPreview';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { MasjidListSkeleton } from '@/components/LoadingState';
import { useGeolocation } from '@/hooks/useGeolocation';
import { LocationButton } from '@/components/LocationButton';

interface Props {
  initialQuery?: string;
  onOpenMasjid: (id: string) => void;
}

type ViewMode = 'list' | 'map';

export function SearchPage({ initialQuery = '', onOpenMasjid }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [view, setView] = useState<ViewMode>('list');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [results, setResults] = useState<Masjid[]>(masjids);
  const { state, request } = useGeolocation();

  useEffect(() => { setQuery(initialQuery); }, [initialQuery]);

  useEffect(() => {
    if (!query) {
      setResults(masjids);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      const q = query.toLowerCase();
      const filtered = masjids.filter(
        (m) =>
          m.city.toLowerCase().includes(q) ||
          m.region.toLowerCase().includes(q) ||
          m.name.toLowerCase().includes(q) ||
          m.address.toLowerCase().includes(q),
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const handleSearch = useCallback((q: string) => setQuery(q), []);
  const handleSelectMasjid = useCallback((id: string) => onOpenMasjid(id), [onOpenMasjid]);
  const handleMarkerSelect = useCallback((id: string) => setSelectedId(id), []);

  const selectedMasjid = selectedId ? results.find((m) => m.id === selectedId) : undefined;
  const hasResults = results.length > 0;

  return (
    <div className="flex flex-col md:h-[calc(100vh-57px)]">
      {/* Search bar + location — sticky */}
      <div className="sticky top-0 z-20 border-b border-line bg-surface-overlay px-4 py-3 backdrop-blur-md md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchBar initialValue={query} onSubmit={handleSearch} />
          </div>
          <div className="flex items-center gap-2">
            <LocationButton state={state} onClick={request} variant="compact" />
            <button
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-card px-3.5 py-2 text-sm font-semibold text-ink-soft transition-all hover:bg-ink/5 active:scale-95"
              aria-label="Filter results"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* View toggle — mobile */}
      <div className="md:hidden">
        <div className="flex border-b border-line bg-surface-card">
          <ViewTab active={view === 'list'} onClick={() => setView('list')} icon={List} label="List" />
          <ViewTab active={view === 'map'} onClick={() => setView('map')} icon={MapIcon} label="Map" />
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2.5 text-xs font-medium text-ink-muted md:px-6">
        {loading ? 'Searching…' : `${results.length} Iftar ${results.length === 1 ? 'location' : 'locations'}${query ? ` near "${query}"` : ' nearby'}`}
      </div>

      {/* Desktop: split view. Mobile: single view. */}
      <div className="flex flex-1 flex-col md:flex-row md:gap-4 md:px-6 md:pb-6">
        {/* List */}
        <div
          className={`flex-1 md:max-w-md md:overflow-y-auto md:rounded-xl md:border md:border-line ${
            view === 'list' ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="px-4 pb-4 md:px-4 md:py-4 md:pb-4">
            {loading ? (
              <MasjidListSkeleton count={4} />
            ) : hasResults ? (
              <div className="space-y-3">
                {results.map((m, i) => (
                  <div key={m.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}>
                    <MasjidCard masjid={m} onClick={handleSelectMasjid} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="🌙"
                title="No Iftar locations found nearby"
                description="Try expanding your search area or search for another location."
                action={
                  <button
                    onClick={() => { setQuery(''); }}
                    className="rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-800 active:scale-95 dark:bg-primary-600 dark:hover:bg-primary-500"
                  >
                    Clear search
                  </button>
                }
              />
            )}
          </div>
        </div>

        {/* Map — desktop: always visible, mobile: toggle */}
        <div className={`flex-1 md:block ${view === 'map' ? 'block' : 'hidden md:block'}`}>
          <div className="relative h-full">
            <MasjidMap
              masjids={results}
              selectedId={selectedId}
              onSelect={handleMarkerSelect}
              className="h-[calc(100vh-280px)] md:h-full"
            />
            {/* Desktop: inline preview card */}
            {selectedMasjid && (
              <div className="absolute bottom-4 left-4 right-4 max-w-sm">
                <div className="rounded-xl bg-surface-card shadow-lifted animate-fade-in-up">
                  <DesktopPreview masjid={selectedMasjid} onViewDetails={() => handleSelectMasjid(selectedMasjid.id)} onClose={() => setSelectedId(undefined)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet for selected marker */}
      {view === 'map' && selectedMasjid && (
        <div className="fixed inset-x-0 bottom-0 z-30 md:hidden">
          <MasjidPreview
            masjid={selectedMasjid}
            onViewDetails={handleSelectMasjid}
            onClose={() => setSelectedId(undefined)}
          />
        </div>
      )}

      {/* Mobile bottom spacing for nav */}
      <div className="h-16 md:hidden" />
    </div>
  );
}

function ViewTab({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof List; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-2.5 text-sm font-bold transition-all ${
        active ? 'border-primary-600 text-primary-700 dark:border-primary-500 dark:text-primary-400' : 'border-transparent text-ink-muted'
      }`}
      aria-pressed={active}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

function DesktopPreview({ masjid, onViewDetails, onClose }: { masjid: Masjid; onViewDetails: () => void; onClose: () => void }) {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-ink">{masjid.name}</h3>
          <p className="mt-0.5 truncate text-sm text-ink-soft">{masjid.city}, {masjid.region}</p>
        </div>
        <button onClick={onClose} className="ml-2 rounded-full p-1 text-ink-muted transition-colors hover:bg-ink/5" aria-label="Close preview">
          <span aria-hidden="true">✕</span>
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-primary-700 dark:text-primary-400">{masjid.iftarType === 'full' ? 'Full Iftar' : masjid.iftarType === 'dates_water' ? 'Dates & Water' : 'Unknown'}</span>
        {masjid.distanceKm !== undefined && <span className="text-ink-soft">· {masjid.distanceKm.toFixed(1)} km · {masjid.iftarTime}</span>}
      </div>
      <button
        onClick={onViewDetails}
        className="mt-3 w-full rounded-lg bg-primary-700 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-800 active:scale-[0.98] dark:bg-primary-600 dark:hover:bg-primary-500"
      >
        View Details
      </button>
    </div>
  );
}
