import { createController } from "remix/router";
import { HomePage } from "./home-page.tsx";
import { routes } from "./routes.ts";

export const appController = createController(routes, {
  actions: {
    home: (ctx) => ctx.render(<HomePage />),
  },
});
