import { Suspense, lazy } from 'react';
import { useRoute } from '@/router';
import { useTheme } from '@/hooks/useTheme';
import { Navbar } from '@/components/Navbar';
import { DetailSkeleton } from '@/components/LoadingState';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const SearchPage = lazy(() => import('@/pages/SearchPage').then((m) => ({ default: m.SearchPage })));
const MasjidDetailPage = lazy(() => import('@/pages/MasjidDetailPage').then((m) => ({ default: m.MasjidDetailPage })));
const AddMasjidPage = lazy(() => import('@/pages/AddMasjidPage').then((m) => ({ default: m.AddMasjidPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })));

function App() {
  const [route, go] = useRoute();
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="min-h-screen bg-surface-page pb-14 md:pb-0">
      <Navbar current={route} theme={theme} onToggleTheme={toggleTheme} />

      <main key={route.name + (route.name === 'masjid' ? route.id : '')} className="animate-fade-in">
        <Suspense
          fallback={
            <div className="mx-auto max-w-3xl px-4 py-6">
              <DetailSkeleton />
            </div>
          }
        >
          {route.name === 'home' && (
            <HomePage
              onFindNearby={() => go({ name: 'search' })}
              onSearch={(q) => go({ name: 'search', query: q })}
            />
          )}

          {route.name === 'search' && (
            <SearchPage
              initialQuery={route.query}
              onOpenMasjid={(id) => go({ name: 'masjid', id })}
            />
          )}

          {route.name === 'masjid' && (
            <MasjidDetailPage
              id={route.id}
              onBack={() => go({ name: 'search' })}
            />
          )}

          {route.name === 'add' && (
            <AddMasjidPage onBack={() => go({ name: 'home' })} />
          )}

          {route.name === 'about' && <AboutPage />}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
