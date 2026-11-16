# App Agent Guide

This app was set up as a minimal Remix v3 app. Use these conventions when continuing to build it out.

## Commands

```sh
pnpm install
pnpm start                # node --import remix/node-tsx server.ts (PORT, default 3000)
pnpm typecheck            # tsc, type checks only; Node never runs tsc
pnpm biome check          # format + lint + import order
pnpm biome check --write  # apply safe fixes
```

There is no build step: Node runs the `.ts`/`.tsx` sources directly. Run `pnpm typecheck` and `pnpm biome check` before considering a change done.

## TypeScript Without a Build Step

- Node strips types natively; `remix/node-tsx` adds JSX. Only use erasable TypeScript syntax: no `enum`, `namespace`, or constructor parameter properties (`erasableSyntaxOnly` enforces this).
- Relative imports include the file extension: `./routes.ts`, `./home-page.tsx`.
- Type-only imports use `import type` or inline `type` (`verbatimModuleSyntax`).

## Building Features

Refer to ./.agents/skills/remix/SKILL.md for the Remix mental model and how to find guides and API READMEs through `node_modules/remix/INDEX.md`.

## Starter Layout

- `server.ts` creates the Node HTTP server from `router.fetch` and handles graceful shutdown
- `app/routes.ts` defines the shared route contract used by server and browser modules for type-safe hrefs
- `app/router.ts` wires routes to controllers and installs the standard Remix component renderer used by actions
- `app/actions/controller.tsx` implements the route actions and default-exports the controller object, as the remix skill describes
- `app/actions/document.tsx` is the HTML document shell; pages wrap their content in `<Document>`
- `app/actions/home-page.tsx` is the page for `/`

`document.tsx` and `home-page.tsx` live in `app/actions/` for now; their final location is still open.

The app currently renders plain server HTML only: there is no asset server, no browser entry, and no client components yet. `render()` is installed without `assets`; adding interactivity requires setting those up first (see the interactivity guide).

This starter intentionally begins small; add directories like `app/data/`, `app/middleware/`, `app/ui/`, and `test/` only when you need them.
