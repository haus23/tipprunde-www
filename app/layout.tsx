import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";

declare module "hono" {
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: interface merging needs a call signature
    (
      content: string | Promise<string>,
      props?: { title?: string },
    ): Response | Promise<Response>;
  }
}

/** The HTML document around every page rendered with `c.render(...)`. */
export const layout = jsxRenderer(({ children, title }) => (
  <html lang="de">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>{title ? `${title} · runde.tips` : "runde.tips"}</title>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="stylesheet" href="/app.css" />
      <Style />
    </head>
    <body>{children}</body>
  </html>
));
