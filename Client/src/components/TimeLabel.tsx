import { Clock } from 'lucide-react';

interface Props {
  time: string;
  className?: string;
}

export function TimeLabel({ time, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium text-ink-soft ${className}`}>
      <Clock className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
      {time}
    </span>
  );
}
