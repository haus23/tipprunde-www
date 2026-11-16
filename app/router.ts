import { render } from "remix/middleware/render";
import { createRouter, type RouterContext } from "remix/router";
import controller from "./actions/controller.tsx";
import { routes } from "./routes.ts";

export const router = createRouter({ middleware: [render()] });

export type AppContext = RouterContext<typeof router>;

declare module "remix" {
  interface RouterTypes {
    context: AppContext;
  }
}

router.map(routes, controller);
