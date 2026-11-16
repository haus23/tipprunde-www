import { createController } from "remix/router";
import { assets, getScriptEntry } from "../assets.ts";
import { routes } from "../routes.ts";
import { HomePage } from "./home-page.tsx";

export default createController(routes, {
  actions: {
    assets: async (ctx) =>
      (await assets.fetch(ctx.request)) ??
      new Response("Not Found", { status: 404 }),
    home: async (ctx) =>
      ctx.render(<HomePage scriptEntry={await getScriptEntry()} />),
  },
});
