import { Hono } from "hono";
import { handlePrismaError } from "../../lib/PrismaErrorHandler.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  ToggleProductStatus,
  updateProduct,
} from "../services/productos-service.js";
import type { InsertProducto } from "../types/productos-types.js";

export const productRoute = new Hono();


productRoute.get("/", async (c) => {
  try {
    const productos = await getAllProducts();
    if (!productos.success) {
      return c.json({ error: productos.message }, 404);
    }
    return c.json(productos.data, 200);
  } catch (error) {
      const prismaError = handlePrismaError(error);
      console.error("Error trayendo productos:", prismaError);
      return c.json({ error: prismaError, message: "Error al obtener los productos" }, 500);
  }
});

productRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const producto = await getProductById(id);
    if (!producto.success) {
      return c.json({ error: producto.message }, 404);
    }
    return c.json(producto.data, 200);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error trayendo producto:", prismaError);
    return c.json({ error: prismaError, message: "Error al obtener el producto" }, 500);
  }
});

productRoute.post("/", async (c) => {
  try {
    const productData: InsertProducto = await c.req.json();
    const newProduct = await createProduct(productData);
    if (!newProduct.success) {
      return c.json({ error: newProduct.message }, 400);
    }
    return c.json(newProduct.data, 201);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error creando producto:", prismaError);
    return c.json({ error: prismaError, message: "Error al crear el producto" }, 500);
  }
});

productRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const productData: InsertProducto = await c.req.json();
    const updatedProduct = await updateProduct(id, productData);
    if (!updatedProduct.success) {
      return c.json({ error: updatedProduct.message }, 404);
    }
    return c.json(updatedProduct.data, 200);
  } catch (error) {
    console.error("Error actualizando producto:", error);
    const prismaError = handlePrismaError(error);
    console.error("Error actualizando producto:", prismaError);
    return c.json({ error: prismaError, message: "Error al actualizar el producto" }, 500);
  }
});

productRoute.patch("/:id/toggle-status", async (c) => {
  const id = c.req.param("id");
  try {
    
    const updatedProduct = await ToggleProductStatus(id);
    if (!updatedProduct.success) {
      return c.json({ error: updatedProduct.message }, 404);
    }
    return c.json({ message: "Estado del producto actualizado correctamente" }, 200);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error actualizando estado del producto:", prismaError);
    return c.json({ error: prismaError, message: "Error al actualizar el estado del producto" }, 500);
  }
}
);

productRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const deletedProduct = await updateProduct(id, { estado: "Inactivo" });
    if (!deletedProduct.success) {
      return c.json({ error: deletedProduct.message }, 404);
    }
    return c.json({ message: "Producto eliminado correctamente" }, 200);
  } catch (error) {
    const prismaError = handlePrismaError(error);
    console.error("Error eliminando producto:", prismaError);
    return c.json({ error: prismaError, message: "Error al eliminar el producto" }, 500);
  }
});
