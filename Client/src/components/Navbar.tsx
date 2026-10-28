import { Moon, Home, Search, PlusCircle, Info, Sun } from 'lucide-react';
import type { Route } from '@/router';
import { navigate } from '@/router';

const DESKTOP_LINKS: { label: string; route: Route; icon: typeof Home }[] = [
  { label: 'Home', route: { name: 'home' }, icon: Home },
  { label: 'Find Iftar', route: { name: 'search' }, icon: Search },
  { label: 'Add Masjid', route: { name: 'add' }, icon: PlusCircle },
  { label: 'About', route: { name: 'about' }, icon: Info },
];

const MOBILE_LINKS: { label: string; route: Route; icon: typeof Home }[] = [
  { label: 'Home', route: { name: 'home' }, icon: Home },
  { label: 'Search', route: { name: 'search' }, icon: Search },
  { label: 'Add Masjid', route: { name: 'add' }, icon: PlusCircle },
];

interface Props {
  current: Route;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navbar({ current, theme, onToggleTheme }: Props) {
  const isActive = (r: Route) => r.name === current.name;

  return (
    <>
      {/* Desktop header */}
      <header className="sticky top-0 z-40 hidden border-b border-line/70 bg-surface-overlay backdrop-blur-md md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <button
            onClick={() => navigate({ name: 'home' })}
            className="flex items-center gap-2 transition-transform hover:scale-[1.02]"
            aria-label="Iftar Finder home"
          >
            <Logo />
          </button>

          <div className="flex items-center gap-1">
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              {DESKTOP_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.route)}
                    className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-all ${
                      isActive(link.route)
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                        : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
                    }`}
                    aria-current={isActive(link.route) ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                  </button>
                );
              })}
            </nav>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>

      {/* Mobile top bar — compact */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-surface-overlay backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate({ name: 'home' })}
            className="flex items-center gap-2 transition-transform active:scale-95"
            aria-label="Iftar Finder home"
          >
            <Logo small />
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />
            <button
              onClick={() => navigate({ name: 'search' })}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-700 px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-800 active:scale-95"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Find Iftar
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-surface-card pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around">
          {MOBILE_LINKS.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.route);
            return (
              <button
                key={link.label}
                onClick={() => navigate(link.route)}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors ${
                  active ? 'text-primary-700 dark:text-primary-400' : 'text-ink-muted'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-5 w-5 transition-transform" style={{ transform: active ? 'scale(1.1)' : 'scale(1)' }} aria-hidden="true" />
                <span className="text-[11px] font-semibold">{link.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function ThemeToggle({ theme, onToggle, compact = false }: { theme: 'light' | 'dark'; onToggle: () => void; compact?: boolean }) {
  return (
    <button
      onClick={onToggle}
      className={`relative flex items-center justify-center rounded-lg border border-line bg-surface-card text-ink-soft transition-all hover:text-ink active:scale-90 ${
        compact ? 'h-9 w-9' : 'h-9 w-9'
      }`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 animate-scale-in text-accent-400" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 animate-scale-in text-primary-700" aria-hidden="true" />
      )}
    </button>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center rounded-lg bg-primary-700 dark:bg-primary-600 transition-colors" style={{ width: small ? 28 : 32, height: small ? 28 : 32 }}>
        <Moon className="text-white" style={{ width: small ? 15 : 17, height: small ? 15 : 17 }} aria-hidden="true" />
      </div>
      <span className={`font-extrabold text-ink ${small ? 'text-base' : 'text-lg'}`}>
        Iftar<span className="text-primary-700 dark:text-primary-400">Finder</span>
      </span>
    </div>
  );
}
