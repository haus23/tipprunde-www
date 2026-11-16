# App Agent Guide

This app was set up as a minimal Remix v3 app. Use these conventions when continuing to build it out.

## Commands

```sh
pnpm install
pnpm dev                  # node dev-server.ts: development with HMR (PORT, default 3000)
pnpm start                # node --import remix/node-tsx server.ts (PORT, default 3000)
pnpm typecheck            # tsc, type checks only; Node never runs tsc
pnpm biome check          # format + lint + import order
pnpm biome check --write  # apply safe fixes
```

There is no build step: Node runs the `.ts`/`.tsx` sources directly. Run `pnpm typecheck` and `pnpm biome check` before considering a change done.

Neither script sets `NODE_ENV`; anything but `production` is development mode (asset server watches files, no minification or fingerprints). Start with `NODE_ENV=production` to test production behavior locally; Railway (Railpack) sets it at runtime.

`pnpm dev` updates server code and CSS in the open page without a reload. `pnpm start` without HMR does not reload server code: restart it after changing `.ts`/`.tsx` files.

## TypeScript Without a Build Step

- Node strips types natively; `remix/node-tsx` adds JSX. Only use erasable TypeScript syntax: no `enum`, `namespace`, or constructor parameter properties (`erasableSyntaxOnly` enforces this).
- Relative imports include the file extension: `./routes.ts`, `./home-page.tsx`.
- Type-only imports use `import type` or inline `type` (`verbatimModuleSyntax`).

## Building Features

Refer to ./.agents/skills/remix/SKILL.md for the Remix mental model and how to find guides and API READMEs through `node_modules/remix/INDEX.md`.

## Starter Layout

- `server.ts` is the only app server. It creates the Node HTTP server from `router.fetch` and handles graceful shutdown (closes the HTTP server, then the asset server). Under `dev-server.ts` (`REMIX_NODE_HMR=1`) it trusts the proxy's forwarded headers and calls `emitServerReady()` after listening.
- `dev-server.ts` is the HMR runner, not a second server: it runs `server.ts` in a supervised child process and puts a proxy in front. Ports: `PORT` (proxy, the one to open), `PORT+1` (browser HMR events), `PORT+2` (app). Keep app setup in `server.ts`, not here.
- `app/routes.ts` defines the shared route contract used by server and browser modules for type-safe hrefs
- `app/router.ts` wires routes to controllers; middleware order is `staticFiles("./public")`, then `render({ assets })`
- `app/assets.ts` creates the asset server (HMR enabled only under `dev-server.ts`) and exports `stylesheetHref` and `getScriptEntry()`
- `app/actions/controller.tsx` implements the route actions (including `assets`, which serves `/assets/*path`) and default-exports the controller object, as the remix skill describes
- `app/actions/document.tsx` is the HTML document shell (favicon, stylesheet, import map, preloads, browser entry script); pages wrap their content in `<Document>` and pass it a `scriptEntry`
- `app/actions/home-page.tsx` is the page for `/`
- `app/ui/logo.tsx` is the shared `<Logo />` component (accent-colored, sized by its container)
- `app/ui/public/app.css` is the global stylesheet, served by the asset server
- `app/ui/public/entry.ts` is the browser entry: it starts the Remix component runtime and refreshes the page in place on `server:update`
- `public/` holds files served as-is by `staticFiles()`, such as `favicon.ico`

`document.tsx` and `home-page.tsx` live in `app/actions/` for now; their final location is still open.

## Assets and Styles

- Browser-reachable source goes in a `public/` directory under `app/`, beside its narrowest owner; the asset server only allows `app/**/public/**` (minus `*.test.*`). Everything else under `app/` is server-only.
- Files that need no processing (favicon, robots.txt) go in the root `public/` directory.
- Reference stylesheets, images, and fonts by URL via `assets.getHref(...)`; browser code cannot import CSS. Image and font extensions must be added to `files.extensions` before they are served.
- `app.css` declares `@layer base, rmx, app;`. Base/reset styles go in `base`, Remix `css(...)` styles live in `rmx`, deliberate overrides go in `app`. The CSS compiler rewrites the order statement (it may appear as `@layer base {…} @layer rmx, app;`), which keeps the same order.
- Every page loads the browser entry. Resolve it per request with `await getScriptEntry()` in the action and pass it to the page, because it changes when files change during development. There are no client components (`clientEntry(...)`) yet; see the interactivity guide when adding one.

This starter intentionally begins small; add directories like `app/data/`, `app/middleware/`, and `test/` only when you need them.
