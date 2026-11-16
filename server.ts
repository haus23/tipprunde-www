import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { assets } from "./app/assets.ts";
import { router } from "./app/router.ts";

const port = Number(process.env.PORT ?? 3000);

// Set when dev-server.ts supervises this process.
const isHmr = process.env.REMIX_NODE_HMR === "1";
// The port the browser uses: the HMR proxy's, or our own.
const publicPort = process.env.HMR_PROXY_PORT ?? port;

// Behind the HMR proxy, trust its X-Forwarded-* headers.
const server = http.createServer(
  createRequestListener(router.fetch, { trustProxy: isHmr }),
);

server.listen(port, () => {
  if (isHmr) {
    // Lets the runner hold browser updates until the app is listening again.
    import("remix/node-hmr/runtime").then((nodeHmr) =>
      nodeHmr.emitServerReady(),
    );
  }

  console.log(`Server listening on http://localhost:${publicPort}`);
});

let shuttingDown = false;

function shutdown() {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  server.close(() => assets.close().finally(() => process.exit(0)));
  server.closeAllConnections();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
