import type { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = '' }: Props) {
  return (
    <div className={`flex flex-col items-center justify-center px-6 py-16 text-center animate-fade-in-up ${className}`}>
      {icon && <div className="mb-4 text-4xl animate-float" aria-hidden="true">{icon}</div>}
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-soft">{description}</p>}
      {action && <div className="mt-5 animate-fade-in-up stagger-1">{action}</div>}
    </div>
  );
}
