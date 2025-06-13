
-- #####################################################################
-- # SCRIPT DDL (Data Definition Language) - CETUS TECHNOLOGY
-- #####################################################################
-- Este script representa el esquema final de la base de datos,
-- consolidando todas las migraciones generadas por Prisma.
--
-- #####################################################################


-- --- 1. CREACIÓN DE TIPOS ENUMERADOS (ENUMS) ---
-- Estos tipos definen los valores permitidos para ciertas columnas.

CREATE TYPE "TipoIdentificacion" AS ENUM ('CEDULA', 'NIT', 'CEDULA_EXTRANJERIA', 'NIT_EXTRANJERIA');

CREATE TYPE "Estado" AS ENUM ('Activo', 'Inactivo');


-- --- 2. CREACIÓN DE TABLAS ---
-- Se definen las tablas principales: Proveedor, Producto y Recepcion.

-- Tabla para almacenar la información de los proveedores.
CREATE TABLE "Proveedor" (
    "id" TEXT NOT NULL,
    "tipoIdentificacion" "TipoIdentificacion" NOT NULL,
    "numeroIdentificacion" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "nombreContacto" TEXT NOT NULL,
    "celularContacto" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- Tabla para almacenar el catálogo de productos.
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',
    "nombreLaboratorio" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- Tabla transaccional para registrar las recepciones de productos.
CREATE TABLE "Recepcion" (
    "id" TEXT NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numeroFactura" TEXT NOT NULL, -- CAMBIO: Se añadió el número de factura.
    "cantidad" INTEGER NOT NULL,
    "lote" TEXT NOT NULL,
    "registroINVIMA" TEXT NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "productoEstadoDescripcion" TEXT NOT NULL,
    "proveedorId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,

    CONSTRAINT "Recepcion_pkey" PRIMARY KEY ("id")
);


-- --- 3. CREACIÓN DE ÍNDICES ÚNICOS ---
-- Estos índices aseguran que no haya valores duplicados en columnas clave.

CREATE UNIQUE INDEX "Proveedor_numeroIdentificacion_key" ON "Proveedor"("numeroIdentificacion");

CREATE UNIQUE INDEX "Producto_codigo_key" ON "Producto"("codigo");


-- --- 4. CREACIÓN DE CLAVES FORÁNEAS (RELACIONES) ---
-- Estas restricciones enlazan las tablas y garantizan la integridad referencial.

-- Enlaza la tabla Recepcion con la tabla Proveedor.
ALTER TABLE "Recepcion" ADD CONSTRAINT "Recepcion_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Enlaza la tabla Recepcion con la tabla Producto.
ALTER TABLE "Recepcion" ADD CONSTRAINT "Recepcion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO "Producto" ("id", "codigo", "nombre", "descripcion", "estado", "nombreLaboratorio") VALUES
('58b737a7-a6a4-4ab7-bcdd-ab8dd958b054', 'PROD-001', 'Acetaminofén 500mg Caja x20', 'Analgésico y antipirético para el alivio del dolor y la fiebre.', 'Activo', 'Genfar'),
('bdbd5f61-35b8-4dcb-9991-3a95875f56c6', 'PROD-002', 'Ibuprofeno 800mg Caja x30', 'Antiinflamatorio no esteroideo (AINE) para dolores fuertes.', 'Activo', 'MK'),
('8067f8a9-c231-44d0-84f7-7aa6deb476ba', 'PROD-003', 'Loratadina 10mg Caja x10', 'Antihistamínico para el tratamiento de la rinitis alérgica.', 'Activo', 'La Santé'),
('079f2963-3e4f-4a96-8cd4-81e43583c785', 'PROD-004', 'Amoxicilina 500mg Suspensión', 'Antibiótico de amplio espectro. Producto descontinuado.', 'Inactivo', 'GSK');





-- #####################################################################
-- FIN DEL SCRIPT DDL
-- #####################################################################
