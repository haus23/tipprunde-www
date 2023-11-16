import {
  json,
  type LinksFunction,
  type DataFunctionArgs,
  type SerializeFrom,
  type MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteLoaderData,
} from '@remix-run/react';

import { ClientHintCheck, getHints } from './utils/client-hints';
import { AppHeader } from '~/components/nav/app-header';

import tailwindStylesheetUrl from './styles/tailwind.css';
import { ThemeProvider, useTheme } from './utils/color-theme';
import { getSession } from './utils/server/session';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Link } from './components/(ui)/atoms/link';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];

export const meta: MetaFunction = () => {
  return [{ title: 'runde.tips' }];
};

export const loader = async ({ request }: DataFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));

  return json({
    requestInfo: {
      hints: getHints(request),
      session: {
        theme: session.get('theme'),
      },
    },
  });
};

function AppDocument() {
  const { theme } = useTheme();

  return (
    <html lang="de" className={theme === 'dark' ? theme : ''}>
      <head>
        <meta charSet="utf-8" />
        <ClientHintCheck />
        <Meta />
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

function ErrorDocument() {
  const { theme } = useTheme();
  const { pathname } = useLocation();

  return (
    <html lang="de" className={theme === 'dark' ? `${theme} h-full` : 'h-full'}>
      <head>
        <meta charSet="utf-8" />
        <ClientHintCheck />
        <Meta />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Tipprunde der Haus23 Freunde" />
        <Links />
      </head>
      <body className="h-full bg-background font-medium text-foreground">
        <div
          id="error"
          style={{ display: 'none' }}
          className="flex min-h-full flex-col items-center justify-center gap-y-4 text-destructive-foreground"
        >
          <div className="flex justify-center text-destructive">
            <FaceFrownIcon className="h-40" />
          </div>
          <p className="mx-4 text-center text-3xl leading-snug [text-wrap:balance]">
            Hoppla, hier stimmt was nicht!
          </p>
          {pathname === '/' ? (
            <p className="mt-4 block text-2xl">Bitte Micha informieren!</p>
          ) : (
            <Link to="/" className="mt-4 block text-2xl hover:underline">
              Zur Startseite
            </Link>
          )}
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.getElementById('error').style.display = 'flex';`,
          }}
        ></script>
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const data = useRouteLoaderData('root') as SerializeFrom<typeof loader> | undefined;
  const theme = data?.requestInfo.session.theme || data?.requestInfo.hints.theme || 'dark';

  return (
    <ThemeProvider requestedTheme={theme}>
      <ErrorDocument />
    </ThemeProvider>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const theme = data.requestInfo.session.theme || data.requestInfo.hints.theme || 'dark';

  return (
    <ThemeProvider requestedTheme={theme}>
      <AppDocument />
    </ThemeProvider>
  );
}
