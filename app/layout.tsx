import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";

/** The HTML document around every page rendered with `c.render(...)`. */
export const layout = jsxRenderer(({ children }) => (
  <html lang="de">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>runde.tips</title>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="stylesheet" href="/app.css" />
      <Style />
    </head>
    <body>{children}</body>
  </html>
));
