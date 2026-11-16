import { createAssetServer } from "remix/assets";
import { componentHmr } from "remix/component-hmr/assets";

const isProduction = process.env.NODE_ENV === "production";
// Set when dev-server.ts supervises the app.
const isHmr = !isProduction && process.env.REMIX_NODE_HMR === "1";

export const assets = createAssetServer({
  basePath: "/assets",
  rootDir: process.cwd(),
  allowFiles: ["app/**/public/**"],
  allowPackages: ["remix"],
  denyFiles: ["app/**/*.test.*"],
  sourceMaps: isProduction ? undefined : "external",
  minify: isProduction,
  fingerprint: isProduction,
  watch: !isProduction,
  hmr: isHmr
    ? {
        channel: async () =>
          (await import("remix/node-hmr/runtime")).createBrowserHmrChannel(),
        moduleImporter: "remix/multiple-import-maps-polyfill",
      }
    : undefined,
  scripts: { loaders: isHmr ? [componentHmr()] : undefined },
});

export const stylesheetHref = await assets.getHref("app/ui/public/app.css");

/**
 * URL, preloads, and import map of the browser entry. Call it per request:
 * the result changes when files change during development.
 */
export function getScriptEntry() {
  return assets.getScriptEntry("app/ui/public/entry.ts");
}
