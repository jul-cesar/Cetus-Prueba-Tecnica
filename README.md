# Sistema de Gestión de Productos Farmacéuticos

## Especificación Técnica

### Base de Datos
- **Motor**: PostgreSQL - NeonDB
- **Versión**: 17
- **ORM**: Prisma (v6.9.0)

### Backend
- **Lenguaje**: TypeScript (v5.8.3)
- **Entorno de ejecución**: Node.js (v20.x)
- **Framework**: Hono (v4.7.11)
- **Gestor de paquetes**: PNPM
- **Validación de datos**: Zod (v3.25.64)

### Frontend
- **Framework**: React (v19.1.0)
- **Lenguaje**: TypeScript
- **Gestor de estado**: React Query (v4.39.2)
- **Gestor de paquetes**: PNPM
- **Framework CSS**: Tailwind CSS
- **Componentes UI**: Shadcn UI

### Infraestructura
- **Contenerización**: Docker / Docker Compose
- **Servidor web (Frontend)**: Serve
- **Servidor de aplicaciones (Backend)**: Node.js con @hono/node-server

## Manual de Instalación

### Requisitos Previos
1. Docker y Docker Compose instalados en el sistema
2. Git instalado (opcional, para clonar el repositorio)

### Paso 1: Obtener el código fuente
```bash
# Clonar el repositorio (o descargar el código fuente)
git clone <URL_DEL_REPOSITORIO>
cd Cetus-Prueba
```

### Paso 2: Configurar variables de entorno
1. Crea un archivo `.env` en la carpeta Backend:

DATABASE_URL="postgresql://neondb_owner:npg_6cWzhVIwH4dF@ep-sweet-sun-a5iav3xl-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"


### Paso 3: Desplegar con Docker Compose


# Construir e iniciar los contenedores
docker-compose up -d

# Paso 4: Acceder a la aplicación


Frontend: http://localhost:3000
Backend API: http://localhost:3001


Estructura del Proyecto

Cetus-Prueba/
├── Frontend/           # Aplicación React
├── Backend/            # API REST con Node.js
│   ├── api/            # Punto de entrada de la API
│   ├── prisma/         # Esquema de la base de datos
│   └── src/            # Código fuente del backend
└── docker-compose.yml  # Configuración de Docker Compose


### Desarrollo Local sin Docker

# Backend

cd Backend
pnpm install
pnpm prisma generate
pnpm run dev


# Frontend
cd Frontend
pnpm install --legacy-peer-deps
pnpm run dev


### DDL
-- #####################################################################
-- # SCRIPT DDL (Data Definition Language) - CETUS TECHNOLOGY
-- #####################################################################
-- Este script representa el esquema final de la base de datos,
-- consolidando todas las migraciones generadas por Prisma.
-- Versión actualizada para incluir 'numeroFactura'.
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

-- #####################################################################
-- FIN DEL SCRIPT DDL
-- #####################################################################

