// Development runner with hot module replacement.
//
// Runs server.ts in a supervised child process (REMIX_NODE_HMR=1) that
// reloads changed server modules without a restart, and puts a proxy in
// front of it that holds requests while the app is updating.
//
//   PORT      public port you open in the browser (default 3000)
//   HMR_PORT  browser HMR event stream (default PORT + 1)
//   APP_PORT  internal port of the app server (default PORT + 2)

import * as http from "node:http";
import { createFetchProxy } from "remix/fetch-proxy";
import { createRequestListener } from "remix/node-fetch-server";
import { createHmrReadyFetch, run } from "remix/node-hmr";

const proxyPort = Number(process.env.PORT ?? 3000);
const hmrEventPort = Number(process.env.HMR_PORT ?? proxyPort + 1);
const appPort = Number(process.env.APP_PORT ?? proxyPort + 2);

const hmrRunner = run("server.ts", {
  env: {
    ...process.env,
    PORT: String(appPort),
    HMR_PROXY_PORT: String(proxyPort),
  },
  nodeArgs: [
    "--import",
    "remix/node-tsx",
    "--import",
    "remix/component-hmr/node",
  ],
  browserHmrChannel: { port: hmrEventPort },
});

const server = http.createServer(
  createRequestListener(
    createHmrReadyFetch(
      hmrRunner,
      createFetchProxy(`http://127.0.0.1:${appPort}`, {
        xForwardedHeaders: true,
      }),
    ),
  ),
);

server.listen(proxyPort, "127.0.0.1");

let shuttingDown = false;

function shutdown() {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  server.close(() => hmrRunner.close().finally(() => process.exit(0)));
  server.closeAllConnections();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
