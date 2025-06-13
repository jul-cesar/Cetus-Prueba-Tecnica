import type { Prisma } from "../generated/prisma/index.js";

export type InsertProducto = Prisma.ProductoCreateInput
export type UpdateProducto = Prisma.ProductoUpdateInput
export type Producto = Prisma.ProductoGetPayload<{
}>;