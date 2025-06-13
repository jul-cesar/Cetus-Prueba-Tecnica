/*
  Warnings:

  - The `estado` column on the `Producto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('Activo', 'Inactivo');

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "estado",
ADD COLUMN     "estado" "Estado" NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE "Proveedor" ADD COLUMN     "estado" "Estado" NOT NULL DEFAULT 'Activo';

-- DropEnum
DROP TYPE "EstadoProducto";
