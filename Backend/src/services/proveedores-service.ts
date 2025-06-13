import { prisma } from "../../lib/prisma.js";
import type { Proveedor } from "../generated/prisma/index.js";
import type { UpdateProveedor } from "../types/proveedores-types.js";
import type { Response } from "../types/response.js";

export const getProveedores = async (): Promise<Response<Proveedor[]>> => {
  const proveedores = await prisma.proveedor.findMany();
  if (!proveedores || proveedores.length === 0) {
    return {
      success: false,
      message: "No providers found",
    };
  }
  return {
    success: true,
    message: "Providers retrieved successfully",
    data: proveedores,
  };
}

export const getProveedorById = async (
  id: string
): Promise<Response<Proveedor | null>> => {
  const proveedor = await prisma.proveedor.findUnique({
    where: { id },
  });
  if (!proveedor) {
    return {
      success: false,
      message: `Provider with ID ${id} not found`,
    };
  }
  return {
    success: true,
    message: "Provider retrieved successfully",
    data: proveedor,
  };
};

export const createProveedor = async (
  proveedorData: Proveedor
): Promise<Response<Proveedor>> => {
  const proveedor = await prisma.proveedor.create({
    data: proveedorData,
  });
  return {
    success: true,
    message: "Provider created successfully",
    data: proveedor,
  };
};

export const updateProveedor = async (
  id: string,
  proveedorData: UpdateProveedor
): Promise<Response<Proveedor>> => {
  const proveedor = await prisma.proveedor.update({
    where: { id },
    data: proveedorData,
  });
  return {
    success: true,
    message: "Provider updated successfully",
    data: proveedor,
  };
};