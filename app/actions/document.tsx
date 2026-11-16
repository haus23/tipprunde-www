import type { ScriptEntry } from "remix/assets";
import type { Handle, RemixNode } from "remix/component";
import { ImportMap } from "remix/component/server";
import { stylesheetHref } from "../assets.ts";

export interface DocumentProps {
  /** Browser entry from `getScriptEntry()`, resolved per request. */
  scriptEntry: ScriptEntry;
  title?: string;
  children?: RemixNode;
}

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    const { scriptEntry, title = "runde.tips", children } = handle.props;
    const { href, importMap, preloads } = scriptEntry;

    return (
      <html lang="de">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="stylesheet" href={stylesheetHref} />
          <ImportMap value={importMap} />
          {preloads.map((preloadHref) => (
            <link key={preloadHref} rel="modulepreload" href={preloadHref} />
          ))}
          <script type="module" src={href}></script>
        </head>
        <body>{children}</body>
      </html>
    );
  };
}
