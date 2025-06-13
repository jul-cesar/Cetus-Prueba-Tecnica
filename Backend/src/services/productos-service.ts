import { prisma } from "../../lib/prisma.js";
import type {
  InsertProducto,
  Producto,
  UpdateProducto,
} from "../types/productos-types.js";
import type { Response } from "../types/response.js";

export const getAllProducts = async (): Promise<Response<Producto[]>> => {
  const productos = await prisma.producto.findMany({
    orderBy: { nombre: "asc" },
  });
  if (!productos || productos.length === 0) {
    return {
      success: false,
      message: "No products found",
    };
  }
  return {
    success: true,
    message: "Products retrieved successfully",
    data: productos,
  };
};

export const getProductById = async (
  id: string
): Promise<Response<Producto | null>> => {
  const producto = await prisma.producto.findUnique({
    where: { id },
  });
  if (!producto) {
    return {
      success: false,
      message: `Product with ID ${id} not found`,
    };
  }
  return {
    success: true,
    message: "Product retrieved successfully",
    data: producto,
  };
};

export const createProduct = async (
  productData: InsertProducto
): Promise<Response<Producto>> => {
  const producto = await prisma.producto.create({
    data: productData,
  });
  return {
    success: true,
    message: "Product created successfully",
    data: producto,
  };
};

export const updateProduct = async (
  id: string,
  productData: UpdateProducto
): Promise<Response<Producto>> => {
  const producto = await prisma.producto.update({
    where: { id },
    data: productData,
  });
  return {
    success: true,
    message: "Product updated successfully",
    data: producto,
  };
};

export const ToggleProductStatus = async (
  id: string
): Promise<Response<Producto>> => {
  const producto = await prisma.producto.findUnique({
    where: { id },
  });
  if (!producto) {
    return {
      success: false,
      message: `Product with ID ${id} not found`,
    };
  }

  const updatedProducto = await prisma.producto.update({
    where: { id },
    data: {
      estado: producto.estado === "Activo" ? "Inactivo" : "Activo",
    },
  });

  return {
    success: true,
    message: "Product status toggled successfully",
    data: updatedProducto,
  };
}
