# README: Proyecto API REST con Implementación de JWT

## Descripción del Proyecto

Este proyecto desarrolla una API REST con seguridad basada en **JSON Web Token (JWT)** para autenticación y autorización. Incluye múltiples modelos y CRUD completos protegidos mediante validaciones y JWT.

---

## Funcionalidades Principales

1. **Seguridad con JWT**

   - Registro y Login con generación de tokens.
   - Validación de tokens para endpoints protegidos.

2. **CRUD de Modelos**

   - Tipos de Usuario
   - Medicamentos
   - Lotes
   - Movimientos de Inventario
   - Usuarios

3. **Relaciones entre Modelos**
   - `Lotes` se relaciona con `Medicamentos`.
   - `MovimientosInventario` se relaciona con `Lotes` y `Usuarios`.

---

## Configuración del Proyecto

### 1. Requisitos Previos

- Node.js v14 o superior.
- PostgreSQL o cualquier base de datos soportada por Sequelize.
- Postman (opcional para pruebas).

### 2. Instalación y Configuración

#### Clonar el Repositorio

```bash
git clone https://github.com/SHuan004/Hito5
cd Hito5
```

#### Instalar Dependencias

```bash
npm install
```

#### Configurar Variables de Entorno

Crea un archivo `.env` con:

```env
PORT=3000
JWT_SECRET="secret"
DATABASE_URL="postgres://postgres:root@localhost:5436/db_Hito5"

```

#### Iniciar el Proyecto

```bash
npm run dev
```

La API estará disponible en: `http://localhost:3000`

---

## Endpoints Clave

### **Autenticación**

#### Registro (`POST /auth/register`)

- **Entrada:**
  ```json
  {
    "rut": "12345678-9",
    "username": "usuario123",
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@example.com",
    "password": "securepassword123",
    "id_tipo_usuario": "id valido (Hay un seder de creacion de tipo de usuario en carpeta config)"
  }
  ```

#### Login (`POST /auth/login`)

- **Entrada:**
  ```json
  {
    "email": "juan.perez@example.com",
    "password": "securepassword123"
  }
  ```
- **Respuesta:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### **CRUD: TiposUsuario**

- **Nota:** Todos los endpoints de este CRUD requieren un token JWT en el encabezado `Authorization`:

- **Crear (`POST /tipos-usuario`):**

  ```json
  {
    "nombre": "Bodeguero"
  }
  ```

- **Leer Todos (`GET /tipos-usuario`):**
  Respuesta:

  ```json
  [
    {
      "id_tipo_usuario": "12345",
      "nombre": "Bodeguero"
    }
  ]
  ```

- **Leer por ID (`GET /tipos-usuario/:id`):**
  Respuesta:

  ```json
  {
    "id_tipo_usuario": "12345",
    "nombre": "Bodeguero"
  }
  ```

- **Actualizar (`PUT /tipos-usuario/:id`):**

  ```json
  {
    "nombre": "Usuario Regular"
  }
  ```

- **Eliminar (`DELETE /tipos-usuario/:id`):**
  Respuesta:
  ```json
  {
    "message": "Tipo de usuario eliminado."
  }
  ```

### **CRUD: Medicamentos**

- **Nota:** Todos los endpoints de este CRUD requieren un token JWT en el encabezado `Authorization`:

  ```
  Authorization: Bearer <token>
  ```

- **Crear (`POST /medicamentos`):**

  ```json
  {
    "nombre": "Paracetamol",
    "descripcion": "Medicamento para el dolor y fiebre.",
    "presentacion": "Tabletas",
    "concentracion": "500mg"
  }
  ```

- **Leer Todos (`GET /medicamentos`):**
  Respuesta:

  ```json
  [
    {
      "id_medicamento": "12345",
      "nombre": "Paracetamol",
      "descripcion": "Medicamento para el dolor y fiebre.",
      "presentacion": "Tabletas",
      "concentracion": "500mg"
    }
  ]
  ```

- **Leer por ID (`GET /medicamentos/:id`):**
  Respuesta:

  ```json
  {
    "id_medicamento": "12345",
    "nombre": "Paracetamol",
    "descripcion": "Medicamento para el dolor y fiebre.",
    "presentacion": "Tabletas",
    "concentracion": "500mg"
  }
  ```

- **Actualizar (`PUT /medicamentos/:id`):**

  ```json
  {
    "descripcion": "Medicamento usado para fiebre."
  }
  ```

- **Eliminar (`DELETE /medicamentos/:id`):**
  Respuesta:
  ```json
  {
    "message": "Medicamento eliminado."
  }
  ```

---

## Recursos

1. **Dependencias Principales:**

   - `jsonwebtoken`: Manejo de tokens JWT.
   - `bcrypt`: Encriptación de contraseñas.
   - `sequelize`: ORM para base de datos.
   - `joi`: Validación de datos de entrada.

2. **Documentación:**
   - [Node.js](https://nodejs.org/)
   - [Sequelize](https://sequelize.org/)
   - [JWT](https://jwt.io/)
   - [Joi](https://joi.dev/)

---

## Autor

Este proyecto forma parte del Hito 5 del curso de Desarrollo Backend.

---
