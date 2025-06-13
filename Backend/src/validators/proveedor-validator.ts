
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { Estado, TipoIdentificacion } from '../generated/prisma/index.js';

const proveedorSchema = z.object({
    tipoIdentificacion: z.nativeEnum(TipoIdentificacion, {
        errorMap: () => ({ message: 'El tipo de identificación es inválido' })
    }),
    numeroIdentificacion: z.string().min(1, 'El número de identificación es requerido'),
    nombre: z.string().min(1, 'El nombre es requerido'),
    direccion: z.string().min(1, 'La dirección es requerida'),
    nombreContacto: z.string().min(1, 'El nombre de contacto es requerido'),
    celularContacto: z.string().min(1, 'El celular de contacto es requerido'),
    estado: z.nativeEnum(Estado, {
        errorMap: () => ({ message: 'El estado es inválido' })
    }).optional().default('Activo'),
});

export const ProveedorValidator = zValidator("json", proveedorSchema, (result, c) => {
   if (!result.success) {
      if (!result.success) {
      const errorMessages = result.error.errors.map((error) => ({
        field: error.path[0],
        message: error.message,
      }));
      return c.json({ messages: errorMessages }, 400);
    }
  }
}); 


export default proveedorSchema;