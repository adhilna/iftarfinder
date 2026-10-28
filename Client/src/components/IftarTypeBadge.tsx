import type { IftarType } from '@/types';
import { IFTAR_TYPE_LABELS } from '@/data';

const STYLES: Record<IftarType, { bg: string; text: string; dot: string }> = {
  full: { bg: 'bg-primary-50 dark:bg-primary-900/30', text: 'text-primary-700 dark:text-primary-300', dot: 'bg-primary-600 dark:bg-primary-400' },
  dates_water: { bg: 'bg-accent-50 dark:bg-accent-900/30', text: 'text-accent-700 dark:text-accent-300', dot: 'bg-accent-500 dark:bg-accent-400' },
  none: { bg: 'bg-stone-100 dark:bg-stone-800/50', text: 'text-stone-600 dark:text-stone-400', dot: 'bg-stone-400 dark:bg-stone-500' },
  unknown: { bg: 'bg-stone-100 dark:bg-stone-800/50', text: 'text-stone-500 dark:text-stone-400', dot: 'bg-stone-300 dark:bg-stone-600' },
};

interface Props {
  type: IftarType;
  className?: string;
}

export function IftarTypeBadge({ type, className = '' }: Props) {
  const s = STYLES[type];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold ${s.bg} ${s.text} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {IFTAR_TYPE_LABELS[type]}
    </span>
  );
}
