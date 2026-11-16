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
- Write `popover="auto"`, never a bare `popover`: Hono renders it as `popover="true"`, which browsers treat as `manual` (no light dismiss, no Escape).

## Layout

- `server.ts` starts the Node server (`@hono/node-server`) and shuts it down gracefully on SIGINT/SIGTERM.
- `app/app.tsx` is the Hono app: `serveStatic` for `public/`, the layout, then the routes.
- `app/layout.tsx` is the HTML document (`jsxRenderer`); routes render pages with `c.render(<Page />)`. Its `<Style />` outputs the `hono/css` styles.
- `app/data/unterbau.ts` reads the public unterbau API (`https://unterbau.runde.tips/api/v1`), which holds all Tipprunde data. Pages fetch on the server, per request.
- `app/pages/` holds one handler + page per route: `table.tsx` serves `/` (newest championship) and `/:championship`.
- `app/ui/` holds shared components: `<Header />` (brand, nav, championship switcher) and `<Logo />` (accent-colored, sized by its container).
- `public/` is served as-is: `app.css` (global stylesheet) and `favicon.ico`.

Add directories like `app/middleware/` and `test/` only when you need them.

## Styles

- `public/app.css` holds the design tokens (`--color-*` with `light-dark()`) and resets, inside `@layer base`.
- Component styles use `hono/css` (`` css`...` `` passed to `class`), co-located below the component. They are unlayered, so they beat `base`. Nesting such as `@media` works inside them.
- Tokens: `--color-bg`, `--color-surface`, `--color-surface-strong` (hover, highlights), `--color-border`, `--color-fg`, `--color-muted`, `--color-accent` (olive), `--color-on-accent` (text on accent).
- Interactivity comes from HTML first: `popover`/`popovertarget` for menus and overlays, links for navigation. The reset's `margin: 0` removes the popover's centering, so centered popovers set `margin: auto`.
