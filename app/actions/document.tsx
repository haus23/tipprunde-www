import type { Handle, RemixNode } from "remix/component";
import { stylesheetHref } from "../assets.ts";

export interface DocumentProps {
  title?: string;
  children?: RemixNode;
}

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    const { title = "runde.tips", children } = handle.props;

    return (
      <html lang="de">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="stylesheet" href={stylesheetHref} />
        </head>
        <body>{children}</body>
      </html>
    );
  };
}
