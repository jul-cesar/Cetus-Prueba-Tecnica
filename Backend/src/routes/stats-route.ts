import { Hono } from "hono";
import {
  getTotalActiveProducts,
  getTotalActiveProveedores,
  getTotalProducts,
  getTotalProveedores,
  getTotalRecepciones,
} from "../services/stats-service.js";

export const statsRoute = new Hono();

statsRoute.get("/", async (c) => {
  try {
    const [
      totalActiveProducts,
      totalProducts,
      totalRecepciones,
      totalProveedores,
      totalActiveProveedores,
    ] = await Promise.all([
      getTotalActiveProducts(),
      getTotalProducts(),
      getTotalRecepciones(),
      getTotalProveedores(),
      getTotalActiveProveedores(),
    ]);

    if (
      !totalActiveProducts.success ||
      !totalProducts.success ||
      !totalRecepciones.success ||
      !totalProveedores.success ||
      !totalActiveProveedores.success
    ) {
      return c.json({ error: "Error al obtener las estadísticas" }, 500);
    }
    const stats = {
      totalActiveProducts: totalActiveProducts.data,
      totalProducts: totalProducts.data,
      totalRecepciones: totalRecepciones.data,
      totalProveedores: totalProveedores.data,
      totalActiveProveedores: totalActiveProveedores.data,
    };

    return c.json(stats, 200);
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    return c.json({ error: "Error al obtener las estadísticas" }, 500);
  }
});
