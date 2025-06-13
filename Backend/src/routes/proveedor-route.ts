import { Hono } from "hono";
import { handlePrismaError } from "../../lib/PrismaErrorHandler.js";
import {
    createProveedor,
    getProveedorById,
    getProveedores,
    updateProveedor,
} from "../services/proveedores-service.js";
import type { UpdateProveedor } from "../types/proveedores-types.js";

export const proveedorRoute = new Hono();

proveedorRoute.get("/", async (c) => {
  try {
    const proveedores = await getProveedores();
    if (!proveedores.success) {
      return c.json({ error: proveedores.message }, 404);
    }
    return c.json(proveedores.data, 200);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error trayendo proveedores:", prismaError);
    return c.json(
      { error: prismaError, message: "Error al obtener los proveedores" },
      500
    );
  }
});

proveedorRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const proveedor = await getProveedorById(id);
    if (!proveedor.success) {
      return c.json({ error: proveedor.message }, 404);
    }
    return c.json(proveedor.data, 200);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error trayendo proveedor:", prismaError);
    return c.json(
      { error: prismaError, message: "Error al obtener el proveedor" },
      500
    );
  }
});

proveedorRoute.post("/", async (c) => {
  try {
    const proveedorData = await c.req.json();
    const newProveedor = await createProveedor(proveedorData);
    if (!newProveedor.success) {
      return c.json({ error: newProveedor.message }, 400);
    }
    return c.json(newProveedor.data, 201);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error creando proveedor:", prismaError);
    return c.json(
      { error: prismaError, message: "Error al crear el proveedor" },
      500
    );
  }
});

proveedorRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const proveedorData: UpdateProveedor = await c.req.json();
    const updatedProveedor = await updateProveedor(id, proveedorData);
    if (!updatedProveedor.success) {
      return c.json({ error: updatedProveedor.message }, 400);
    }
    return c.json(updatedProveedor.data, 200);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error actualizando proveedor:", prismaError);
    return c.json(
      { error: prismaError, message: "Error al actualizar el proveedor" },
      500
    );
  }
});

proveedorRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const deletedProveedor = await updateProveedor(id, { activo: false });
    if (!deletedProveedor.success) {
      return c.json({ error: deletedProveedor.message }, 404);
    }
    return c.json({ message: "Proveedor eliminado correctamente" }, 200);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error eliminando proveedor:", prismaError);
    return c.json(
      { error: prismaError, message: "Error al eliminar el proveedor" },
      500
    );
  }
});
