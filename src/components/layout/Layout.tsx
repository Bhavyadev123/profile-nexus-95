import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};