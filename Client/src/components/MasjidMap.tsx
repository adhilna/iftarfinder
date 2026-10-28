import { memo, useEffect, useRef } from 'react';
import { Moon } from 'lucide-react';
import type { Masjid } from '@/types';

interface Props {
  masjids: Masjid[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

function computePositions(masjids: Masjid[]) {
  if (masjids.length === 0) return [];
  const lats = masjids.map((m) => m.lat);
  const lngs = masjids.map((m) => m.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latRange = maxLat - minLat || 0.01;
  const lngRange = maxLng - minLng || 0.01;

  return masjids.map((m) => {
    const x = ((m.lng - minLng) / lngRange) * 100;
    const y = (1 - (m.lat - minLat) / latRange) * 100;
    return { id: m.id, x: Math.max(8, Math.min(92, x)), y: Math.max(10, Math.min(90, y)) };
  });
}

export const MasjidMap = memo(function MasjidMap({ masjids, selectedId, onSelect, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const positions = computePositions(masjids);

  useEffect(() => {
    if (containerRef.current && selectedId) {
      const el = containerRef.current.querySelector(`[data-marker="${selectedId}"]`);
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedId]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-xl ${className}`} style={{ backgroundColor: 'var(--map-bg)' }}>
      {/* Stylized map background */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" style={{ stroke: 'var(--map-grid)' }} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" style={{ fill: 'var(--map-bg)' }} />
        <rect width="100%" height="100%" fill="url(#grid)" />
        <ellipse cx="80%" cy="20%" rx="18%" ry="12%" style={{ fill: 'var(--map-water)' }} opacity="0.6" />
        <ellipse cx="25%" cy="70%" rx="12%" ry="10%" style={{ fill: 'var(--map-water)' }} opacity="0.4" />
        <line x1="0" y1="45%" x2="100%" y2="40%" style={{ stroke: 'var(--map-road)' }} strokeWidth="6" />
        <line x1="0" y1="45%" x2="100%" y2="40%" style={{ stroke: 'var(--map-road-surface)' }} strokeWidth="3" />
        <line x1="50%" y1="0" x2="48%" y2="100%" style={{ stroke: 'var(--map-road)' }} strokeWidth="6" />
        <line x1="50%" y1="0" x2="48%" y2="100%" style={{ stroke: 'var(--map-road-surface)' }} strokeWidth="3" />
      </svg>

      {/* Markers */}
      <div className="absolute inset-0">
        {positions.map((p) => {
          const isSelected = p.id === selectedId;
          return (
            <button
              key={p.id}
              data-marker={p.id}
              onClick={() => onSelect?.(p.id)}
              className="absolute -translate-x-1/2 -translate-y-full transition-transform duration-200 hover:scale-110 focus-visible:scale-110"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label={`Select ${masjids.find((m) => m.id === p.id)?.name}`}
            >
              <div
                className={`flex items-center justify-center rounded-full border-2 shadow-md transition-all duration-200 ${
                  isSelected
                    ? 'h-9 w-9 border-primary-800 bg-primary-600 ring-4 ring-primary-200 dark:ring-primary-900/50'
                    : 'h-7 w-7 border-white bg-primary-700 hover:bg-primary-600 dark:border-stone-600'
                }`}
              >
                <Moon className="text-white" style={{ width: isSelected ? 18 : 14, height: isSelected ? 18 : 14 }} aria-hidden="true" />
              </div>
              {isSelected && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-1">
                  <div className="whitespace-nowrap rounded-md bg-ink px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                    {masjids.find((m) => m.id === p.id)?.name}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 rounded bg-surface-card/80 px-2 py-0.5 text-[10px] font-medium text-ink-muted backdrop-blur-sm">
        Interactive map preview
      </div>
    </div>
  );
});
