import { createAssetServer } from "remix/assets";

const isProduction = process.env.NODE_ENV === "production";

export const assets = createAssetServer({
  basePath: "/assets",
  rootDir: process.cwd(),
  allowFiles: ["app/**/public/**"],
  denyFiles: ["app/**/*.test.*"],
  minify: isProduction,
  fingerprint: isProduction,
  watch: !isProduction,
});

export const stylesheetHref = await assets.getHref("app/ui/public/app.css");
