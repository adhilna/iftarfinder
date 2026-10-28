interface Props {
  count?: number;
  className?: string;
}

export function MasjidCardSkeleton({ className = '' }: Props) {
  return (
    <div className={`rounded-xl border border-line/80 bg-surface-card p-4 shadow-soft ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="shimmer h-5 w-48 rounded-md" />
          <div className="shimmer mt-2 h-4 w-32 rounded-md" />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="shimmer h-5 w-20 rounded-md" />
        <div className="shimmer h-5 w-16 rounded-md" />
      </div>
      <div className="shimmer mt-3 h-6 w-36 rounded-md" />
    </div>
  );
}

export function MasjidListSkeleton({ count = 4, className = '' }: Props) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <MasjidCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton({ className = '' }: Props) {
  return (
    <div className={className}>
      <div className="shimmer h-48 w-full rounded-xl" />
      <div className="shimmer mt-4 h-7 w-64 rounded-md" />
      <div className="shimmer mt-2 h-4 w-40 rounded-md" />
      <div className="shimmer mt-4 h-20 w-full rounded-xl" />
      <div className="shimmer mt-4 h-48 w-full rounded-xl" />
    </div>
  );
}
