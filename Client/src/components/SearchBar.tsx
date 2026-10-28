import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect, type FormEvent } from 'react';

interface Props {
  initialValue?: string;
  placeholder?: string;
  onSubmit: (query: string) => void;
  autoFocus?: boolean;
  className?: string;
}

const SUGGESTIONS = [
  'Kozhikode',
  'Kochi',
  'Thiruvananthapuram',
  'Malappuram',
  'Kannur',
  'Thrissur',
];

export function SearchBar({
  initialValue = '',
  placeholder = 'Search by city, area or location',
  onSubmit,
  autoFocus = false,
  className = '',
}: Props) {
  const [value, setValue] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setValue(initialValue); }, [initialValue]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const submit = (q: string) => {
    setShowSuggestions(false);
    onSubmit(q);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(value);
  };

  const filtered = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(value.toLowerCase()) && value.length > 0,
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
        <input
          type="text"
          value={value}
          onChange={(e) => { setValue(e.target.value); setShowSuggestions(true); }}
          onFocus={() => { setShowSuggestions(true); }}
          autoFocus={autoFocus}
          placeholder={placeholder}
          aria-label="Search location"
          className="w-full rounded-xl border border-line bg-surface-card py-3.5 pl-11 pr-10 text-base text-ink placeholder:text-ink-muted shadow-soft transition-all focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800"
        />
        {value && (
          <button
            type="button"
            onClick={() => { setValue(''); setShowSuggestions(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </form>

      {showSuggestions && filtered.length > 0 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-line bg-surface-card shadow-lifted animate-fade-in-up">
          <ul role="listbox" aria-label="Location suggestions">
            {filtered.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => { setValue(s); submit(s); }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-ink-soft transition-colors hover:bg-ink/5"
                  role="option"
                  aria-selected="false"
                >
                  <Search className="h-4 w-4 text-ink-faint" aria-hidden="true" />
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
