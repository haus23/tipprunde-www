import type { Handle, RemixNode } from "remix/component";

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
        </head>
        <body>{children}</body>
      </html>
    );
  };
}
