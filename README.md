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


