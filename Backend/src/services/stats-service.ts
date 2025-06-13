import { prisma } from "../../lib/prisma.js";
import type { Response } from "../types/response.js";

export const getTotalProducts = async (): Promise<Response<number>> => {
  const totalProducts = await prisma.producto.count();
  return {
    success: true,
    message: "Total products retrieved successfully",
    data: totalProducts,
  };
}

export const getTotalRecepciones = async (): Promise<Response<number>> => {
  const totalRecepciones = await prisma.recepcion.count();
  return {
    success: true,
    message: "Total recepciones retrieved successfully",
    data: totalRecepciones,
  };
}

export const getTotalProveedores = async (): Promise<Response<number>> => {
  const totalProveedores = await prisma.proveedor.count();
  return {
    success: true,
    message: "Total proveedores retrieved successfully",
    data: totalProveedores,
  };
}

export const getTotalActiveProducts = async (): Promise<Response<number>> => {  
  const totalActiveProducts = await prisma.producto.count({
    where: { estado: "Activo" },
  });
  return {
    success: true,
    message: "Total active products retrieved successfully",
    data: totalActiveProducts,
  };
}

export const getTotalActiveProveedores = async (): Promise<Response<number>> => {
  const totalActiveProveedores = await prisma.proveedor.count({
    where: { estado: "Activo" },
  });
  return {
    success: true,
    message: "Total active proveedores retrieved successfully",
    data: totalActiveProveedores,
  };
}   