import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import styles from './styles.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function App() {
  return (
    <html lang="de" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Tipprunde der Haus23 Freunde" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
