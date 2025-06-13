import { Hono } from "hono";
import { handlePrismaError } from "../../lib/PrismaErrorHandler.js";
import {
  createRecepcion,
  deleteRecepcion,
  getRecepcionById,
  getRecepciones,
  updateRecepcion,
} from "../services/recepciones-service.js";
import type {
  InsertRecepcion,
  UpdateRecepcion,
} from "../types/recepciones-types.js";
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
    const prismaError = handlePrismaError(error);
    console.error("Error actualizando estado del producto:", prismaError);
    return c.json(
      {
        error: prismaError,
        message: "Error al actualizar el estado del producto",
      },
      500
    );
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
    const prismaError = handlePrismaError(error);
    console.error("Error actualizando estado del producto:", prismaError);
    return c.json(
      {
        error: prismaError,
        message: "Error al actualizar el estado del producto",
      },
      500
    );
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
    const prismaError = handlePrismaError(error);
    console.error("Error actualizando estado del producto:", prismaError);
    return c.json(
      {
        error: prismaError,
        message: "Error al actualizar el estado del producto",
      },
      500
    );
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
    const prismaError = handlePrismaError(error);
    console.error("Error actualizando estado del producto:", prismaError);
    return c.json(
      {
        error: prismaError,
        message: "Error al actualizar el estado del producto",
      },
      500
    );
  }
});

recepcionesRoute.put("/:id", recepcionesValidator, async (c) => {
  const id = c.req.param("id");
  try {
    const recepcionData: UpdateRecepcion = await c.req.json();
    const updatedRecepcion = await updateRecepcion(id, recepcionData);
    if (!updatedRecepcion.success) {
      return c.json({ error: updatedRecepcion.message }, 400);
    }
    return c.json(updatedRecepcion.data, 200);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error actualizando estado del producto:", prismaError);
    return c.json(
      {
        error: prismaError,
        message: "Error al actualizar el estado del producto",
      },
      500
    );
  }
});
