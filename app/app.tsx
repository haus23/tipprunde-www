import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { layout } from "./layout.tsx";
import { HomePage } from "./pages/home.tsx";

export const app = new Hono()
  .use(serveStatic({ root: "./public" }))
  .use(layout)
  .get("/", (c) => c.render(<HomePage />));
