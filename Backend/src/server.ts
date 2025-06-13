import { Hono } from "hono";
import { logger } from "hono/logger";
import { productRoute } from "./routes/product-route.js";
import { cors } from "hono/cors";

export const app = new Hono().basePath("/api/v1");

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.use(
  "*",
  cors({
    origin: "*",
  })
);
app.use(logger());
app.route("/productos", productRoute);

export default app;
