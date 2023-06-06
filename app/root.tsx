import { json, type LinksFunction, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import { ClientHintCheck, getHints } from './utils/client-hints';
import { AppHeader } from '~/components/nav/app-header';

import tailwindStylesheetUrl from './styles/tailwind.css';
import { ThemeProvider, useTheme } from './utils/color-theme';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];

export const meta: V2_MetaFunction = () => {
  return [{ title: 'runde.tips' }];
};

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    requestInfo: {
      hints: getHints(request),
    },
  });
};

function AppDocument() {
  const { theme } = useTheme();

  return (
    <html lang="de" className={theme === 'dark' ? theme : ''}>
      <head>
        <ClientHintCheck />
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
export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider clientHint={data.requestInfo.hints.theme}>
      <AppDocument />
    </ThemeProvider>
  );
}
