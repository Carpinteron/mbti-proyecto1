import { Outlet, useLocation } from 'react-router';
import Navigation from './Navigation';
import Footer from './Footer';

/** Shared shell for every route: navigation, page content and footer. */
function AppLayout() {
  const { pathname } = useLocation();
  const verticalPadding = pathname === '/contact' ? 'py-4' : 'py-12';

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-page text-fg">
      <Navigation />
      <main className={`mx-auto w-full max-w-7xl flex-1 px-2 sm:px-4 lg:px-6 ${verticalPadding}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
