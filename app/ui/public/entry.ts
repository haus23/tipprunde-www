// Browser entry: starts the Remix component runtime, which hydrates client
// entries on the page. Loaded by <Document>.

import { run } from "remix/component";
import {
  detectMultipleImportMapSupport,
  importModule,
  preloadShim,
} from "remix/multiple-import-maps-polyfill";

const app = run({
  async loadModule(moduleUrl, exportName) {
    const module = await importModule(moduleUrl);
    const Component = module[exportName];
    if (typeof Component !== "function") {
      throw new Error(`Unknown component: ${moduleUrl}#${exportName}`);
    }
    return Component;
  },
  async processClientEntryPreloads(preloads) {
    if (await detectMultipleImportMapSupport()) return preloads;

    preloadShim(preloads);
    return [];
  },
});

app.addEventListener("error", (event) => {
  console.error("Component error:", event.error);
});

// Development with dev-server.ts: when server code changes, fetch fresh HTML
// and reconcile it into the page instead of a full reload.
if (import.meta.hot) {
  import.meta.hot.on("server:update", async () => {
    try {
      await app.ready();
      await app.frames.top.reload();
    } catch (error) {
      console.error("Error reloading top frame on server update", error);
    }
  });
}
