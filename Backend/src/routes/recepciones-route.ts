import { Hono } from "hono";
import {
  createRecepcion,
  deleteRecepcion,
  getRecepcionById,
  getRecepciones,
} from "../services/recepciones-service.js";
import type { InsertRecepcion } from "../types/recepciones-types.js";
import { recepcionesValidator } from "../validators/recepciones-validator.js";

export const recepcionesRoute = new Hono();

recepcionesRoute.get("/", async (c) => {
  try {
    const recepciones = await getRecepciones();
    if (!recepciones.success) {
      return c.json({ error: recepciones.message }, 404);
    }

    return c.json(recepciones.data, 200);
  } catch (error) {
    console.error("Error fetching recepciones:", error);
    return c.json({ error: "Error al obtener las recepciones" }, 500);
  }
});

recepcionesRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const recepcion = await getRecepcionById(id);
    if (!recepcion.success) {
      return c.json({ error: recepcion.message }, 404);
    }
    return c.json(recepcion.data, 200);
  } catch (error) {
    console.error("Error fetching recepcion:", error);
    return c.json({ error: "Error al obtener la recepcion" }, 500);
  }
});

recepcionesRoute.post("/", recepcionesValidator, async (c) => {
  try {
    const recepcionData: InsertRecepcion = await c.req.json();
    const newRecepcion = await createRecepcion(recepcionData);
    if (!newRecepcion.success) {
      return c.json({ error: newRecepcion.message }, 400);
    }
    return c.json(newRecepcion.data, 201);
  } catch (error) {
    console.error("Error creating recepcion:", error);
    return c.json({ error: "Error al crear la recepcion" }, 500);
  }
});

recepcionesRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    
    
   const del = await deleteRecepcion(id);
    if (!del.success) {
      return c.json({ error: del.message }, 404);
    }

    return c.json({ message: "Recepcion deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting recepcion:", error);
    return c.json({ error: "Error al eliminar la recepcion" }, 500);
  }
}   
);
