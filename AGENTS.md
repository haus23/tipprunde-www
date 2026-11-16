# App Agent Guide

A minimal [Hono](https://hono.dev) app on Node: server-rendered JSX, plain CSS, and no client JavaScript. Keep it that way unless a page really needs a script.

## Commands

```sh
pnpm install
pnpm dev                  # tsx watch: restarts on code changes (PORT, default 3000)
pnpm start                # tsx server.ts (PORT, default 3000)
pnpm typecheck            # tsc, type checks only
pnpm biome check          # format + lint + import order
pnpm biome check --write  # apply safe fixes
```

There is no build step: `tsx` runs the `.ts`/`.tsx` sources directly. Run `pnpm typecheck` and `pnpm biome check` before considering a change done.

`pnpm dev` restarts the server when a `.ts`/`.tsx` file changes; reload the browser yourself. CSS in `public/` is read per request, so it needs no restart. Railway (Railpack) sets `NODE_ENV=production` at runtime.

## TypeScript

- Only use erasable TypeScript syntax: no `enum`, `namespace`, or constructor parameter properties (`erasableSyntaxOnly` enforces this).
- Relative imports include the file extension: `./app/app.tsx`, `../ui/logo.tsx`.
- Type-only imports use `import type` or inline `type` (`verbatimModuleSyntax`).
- JSX is Hono's (`jsxImportSource: hono/jsx`), not React: use `class`, not `className`. Components are plain functions of their props.

## Layout

- `server.ts` starts the Node server (`@hono/node-server`) and shuts it down gracefully on SIGINT/SIGTERM.
- `app/app.tsx` is the Hono app: `serveStatic` for `public/`, the layout, then the routes.
- `app/layout.tsx` is the HTML document (`jsxRenderer`); routes render pages with `c.render(<Page />)`. Its `<Style />` outputs the `hono/css` styles.
- `app/pages/` holds one component per page (`home.tsx` for `/`).
- `app/ui/` holds shared components, such as `<Logo />` (accent-colored, sized by its container).
- `public/` is served as-is: `app.css` (global stylesheet) and `favicon.ico`.

Add directories like `app/data/`, `app/middleware/`, and `test/` only when you need them.

## Styles

- `public/app.css` holds the design tokens (`--color-*` with `light-dark()`) and resets, inside `@layer base`.
- Component styles use `hono/css` (`` css`...` `` passed to `class`), co-located below the component. They are unlayered, so they beat `base`. Nesting such as `@media` works inside them.
