import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./app/router.ts";

const port = Number(process.env.PORT ?? 3000);
const server = http.createServer(createRequestListener(router.fetch));

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

let shuttingDown = false;

function shutdown() {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  server.close();
  server.closeAllConnections();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
