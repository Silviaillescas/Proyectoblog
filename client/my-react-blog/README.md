# Flowers Blog 

Este es un proyecto de un blog de administración de flores desarrollado como una aplicación web utilizando React, Vite y Node.js, con un backend basado en Express y una base de datos MySQL. Permite visualizar, crear, actualizar y eliminar publicaciones sobre flores, así como administrar usuarios y mantener un área de administración protegida.


## Tabla de Contenidos
- [Tecnologías](#tecnologías)
- [Características](#características)
- [Requerimientos Previos](#requerimientos-previos)
- [Instrucciones de Instalación](#instrucciones-de-instalación)
- [Instrucciones de Ejecución](#instrucciones-de-ejecución)
- [Rutas y Funcionalidades](#rutas-y-funcionalidades)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)


## Tecnologías
- **Frontend:** React, Vite, Styled Components
- **Backend:** Node.js, Express
- **Base de Datos:** MySQL
- **Gestión de Estados:** Hooks personalizados de React
- **Manejo de Autenticación:** bcrypt para hashing de contraseñas

## Características
- **Funcionalidad de Blog:** Visualiza las publicaciones de flores con sus respectivos datos (nombre, color, temporada, etc.).
- **Área de Administración:** Interfaz protegida por autenticación, accesible solo para usuarios con permisos.
- **CRUD de Publicaciones:** Crear, leer, actualizar y eliminar publicaciones desde el área de administración.
- **Responsivo:** Adaptable para dispositivos móviles y escritorio.
- **Manejo de Autenticación:** Implementa inicio de sesión para el área de administración con un hash seguro.

## Requerimientos Previos
- Node.js (versión 14.0 o superior)
- MySQL (o un contenedor con Docker)
- npm para la gestión de dependencias

## Instrucciones de Instalación
1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/Silviaillescas/serverproy_blog.git
Accede al directorio raíz del proyecto:
bash

cd serverproy_blog
Instala las dependencias tanto para el backend como para el frontend:
bash


# Backend
cd server
npm install

# Frontend
cd ../client
npm install
Configura la base de datos MySQL con un esquema adecuado:
Crea una base de datos llamada flowersblog.
Configura un archivo .env en el directorio server con las siguientes variables:
bash

DB_HOST=<tu_host_de_mysql>
DB_USER=<tu_usuario_de_mysql>
DB_PASSWORD=<tu_contraseña_de_mysql>
DB_NAME=flowersblog
Ejecuta el script SQL para crear las tablas necesarias o configúralas manualmente.

Instrucciones de Ejecución
Backend
Conéctate al servidor a través de SSH usando el siguiente comando:
bash

ssh web.uvg
Dirígete al directorio del backend:
bash

cd 22376/Proyectoblog/server/serverproy_blog
Inicia el backend con:
bash

npm start
Frontend
Inicia el frontend desde el directorio client:
bash

cd client
npm run dev
Accede a la aplicación web desde tu navegador en http://localhost:5173.

Rutas y Funcionalidades
API (Backend)
GET /posts: Obtiene todas las publicaciones de flores.
POST /posts: Crea una nueva publicación.
PUT /posts/:id: Actualiza una publicación existente.
DELETE /posts/:id: Elimina una publicación por su ID.
POST /users: Crea un nuevo usuario con contraseña cifrada.
POST /auth/login: Realiza el inicio de sesión y devuelve un token de autenticación.

Frontend
Ruta /: Visualiza el blog público.
Ruta /admin: Accede al área de administración, donde podrás gestionar todas las publicaciones.
Ruta /login: Página de inicio de sesión para acceder al área de administración y gestionar las publicaciones.
Ruta /signup: Crea un nuevo usuario para acceder al área de administración.

Contribuciones
Las contribuciones son bienvenidas. Para contribuir:
Crea un fork del proyecto.
Clona tu fork.
Crea una rama para tu feature o corrección.
Envía un pull request.