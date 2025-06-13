import type { Prisma } from "../generated/prisma/index.js";

export type Recepcion = Prisma.RecepcionGetPayload<{
    include: {
        proveedor: true;
        producto: true;
    };
}>

export type InsertRecepcion = Omit<Recepcion, "id" | "fechaHora" | "proveedor" | "producto">