import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const productSchema = z.object({
  codigo: z.string().min(1, "El código es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  nombreLaboratorio: z.string().min(1, "El laboratorio es requerido"),
  estado: z.enum(["Activo", "Inactivo"]),
});

export const productValidator = zValidator(
  "json",
  productSchema,
  (result, c) => {
    if (!result.success) {
      const errorMessages = result.error.errors.map((error) => ({
        field: error.path[0],
        message: error.message,
      }));
      return c.json({ messages: errorMessages }, 400);
    }
  }
);
