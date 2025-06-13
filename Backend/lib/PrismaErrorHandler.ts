import { Prisma } from "../src/generated/prisma/index.js";


export function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return "Ya existe un registro con este valor único.";
      case "P2003":
        return "Violación de restricción de clave foránea.";
      case "P2005":
        return "El valor almacenado en la base de datos es inválido para este campo.";
      case "P2006":
        return "El valor proporcionado no es válido para este campo.";
      case "P2025":
        return "Operación fallida.";
      default:
        return "Ocurrió un error en la operación de la base de datos.";
    }
  }
  return "Ocurrió un error inesperado.";
}
