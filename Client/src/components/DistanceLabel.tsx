import { MapPin } from 'lucide-react';

interface Props {
  distanceKm: number;
  className?: string;
}

export function DistanceLabel({ distanceKm, className = '' }: Props) {
  const display = distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium text-ink-soft ${className}`}>
      <MapPin className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
      {display} away
    </span>
  );
}
