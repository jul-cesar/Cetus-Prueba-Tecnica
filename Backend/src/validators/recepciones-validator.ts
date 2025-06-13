import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const createRecepcionSchema = z.object({
  cantidad: z.number().positive("La cantidad debe ser un número positivo"),
  lote: z.string().min(1, "El lote es requerido"),
  registroINVIMA: z.string().min(1, "El registro INVIMA es requerido"),
  numeroFactura: z.string().min(1, "El número de factura es requerido"),
  fechaVencimiento: z.coerce.date({
    errorMap: () => ({
      message: "La fecha de vencimiento debe ser una fecha válida",
    }),
  }),
  productoEstadoDescripcion: z
    .string()
    .min(1, "La descripción del estado del producto es requerida"),
  proveedorId: z.string().uuid("El ID del proveedor debe ser un UUID válido"),
  productoId: z.string().uuid("El ID del producto debe ser un UUID válido"),
});

export const recepcionesValidator = zValidator(
  "json",
  createRecepcionSchema,
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
