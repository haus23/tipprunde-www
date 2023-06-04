import { json, type LinksFunction, type V2_MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import { AppHeader } from '~/components/nav/app-header';

import tailwindStylesheetUrl from './styles/tailwind.css';
import { fetchChampionships } from './backend/queries';
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];

export const meta: V2_MetaFunction = () => {
  return [{ title: 'runde.tips' }];
};

export const loader = async () => {
  const championships = await fetchChampionships();
  return json({ championships });
};

export const shouldRevalidate = () => {
  return false;
};

export default function App() {
  return (
    <html lang="de" className="dark">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Tipprunde der Haus23 Freunde" />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <AppHeader />
        <main className="mx-auto mt-4 max-w-5xl pb-10 sm:mt-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
