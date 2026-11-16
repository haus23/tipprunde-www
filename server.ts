import { serve } from "@hono/node-server";
import { app } from "./app/app.tsx";

const port = Number(process.env.PORT ?? 3000);

const server = serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server listening on http://localhost:${info.port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
  // Also end keep-alive connections, or close() waits for them.
  if ("closeAllConnections" in server) {
    server.closeAllConnections();
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
