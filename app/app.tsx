import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { layout } from "./layout.tsx";
import { tablePage } from "./pages/table.tsx";

export const app = new Hono()
  .use(serveStatic({ root: "./public" }))
  .use(layout)
  .get("/", tablePage)
  .get("/:championship", tablePage);
