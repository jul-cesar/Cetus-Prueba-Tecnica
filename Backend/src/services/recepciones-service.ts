import { prisma } from "../../lib/prisma.js";
import type { InsertRecepcion, UpdateRecepcion } from "../types/recepciones-types.js";

export const getRecepciones = async () => {
  const recepciones = await prisma.recepcion.findMany({
    include: {
      proveedor: true,
      producto: true,
    },
  });
  return {
    success: true,
    message: "Recepciones retrieved successfully",
    data: recepciones,
  };
}

export const getRecepcionById = async (id: string) => {
  const recepcion = await prisma.recepcion.findUnique({
    where: { id },
    include: {
      proveedor: true,
      producto: true,
    },
  });
  if (!recepcion) {
    return {
      success: false,
      message: `Recepcion with ID ${id} not found`,
    };
  }
  return {
    success: true,
    message: "Recepcion retrieved successfully",
    data: recepcion,
  };
};

export const createRecepcion = async (data: InsertRecepcion ) => {
  const recepcion = await prisma.recepcion.create({
    data,
    include: {
      proveedor: true,
      producto: true,
    },
  });
  return {
    success: true,
    message: "Recepcion created successfully",
    data: recepcion,
  };
}

export const deleteRecepcion = async (id: string) => {
    const existingRecepcion = await prisma.recepcion.findUnique({
        where: { id },
    });
    if (!existingRecepcion) {
        return {
            success: false,
            message: `Recepcion with ID ${id} not found`,
        };
    }
  const recepcion = await prisma.recepcion.delete({
    where: { id },
  });
  return {
    success: true,
    message: "Recepcion deleted successfully",
    data: recepcion,
  };
}   


export const updateRecepcion = async (id: string, data: UpdateRecepcion) => {
  const existingRecepcion = await prisma.recepcion.findUnique({
    where: { id },
  });
  if (!existingRecepcion) {
    return {
      success: false,
      message: `Recepcion with ID ${id} not found`,
    };
  }
  const recepcion = await prisma.recepcion.update({
    where: { id },
    data,
    include: {
      proveedor: true,
      producto: true,
    },
  });
  return {
    success: true,
    message: "Recepcion updated successfully",
    data: recepcion,
  };
}