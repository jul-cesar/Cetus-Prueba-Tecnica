import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { productRoute } from "./routes/product-route.js";
import { proveedorRoute } from "./routes/proveedor-route.js";
import { recepcionesRoute } from "./routes/recepciones-route.js";
import { statsRoute } from "./routes/stats-route.js";

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
app.route("/proveedores", proveedorRoute);
app.route("/recepciones", recepcionesRoute);
app.route("/stats", statsRoute);

export default app;
