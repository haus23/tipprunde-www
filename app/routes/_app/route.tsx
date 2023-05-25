import { Outlet } from '@remix-run/react';
import { AppHeader } from './app-header';

export default function AppLayout() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto mt-4 max-w-5xl pb-10 sm:mt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
}
