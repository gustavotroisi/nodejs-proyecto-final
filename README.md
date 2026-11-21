# API de Productos

## Descripción

Esta API permite consultar y administrar productos. Los datos de productos se almacenan en Firebase Firestore. Las rutas de productos usan el prefijo `/api`; la autenticación usa el prefijo `/auth`.

## Endpoints

| Método | Ruta | Descripción | Parámetros | Cuerpo | Respuesta y estados |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/api/products` | Obtiene todos los productos; puede filtrar por categoría. | `category` (query, opcional) | No aplica | `200`: `message` y `data`; `404`: no se encontraron productos; `500`: error interno. |
| `GET` | `/api/products/:id` | Obtiene un producto por ID. | `id` (ruta) | No aplica | `200`: `message` y `data`; `404`: producto no encontrado. |
| `POST` | `/api/products/create` | Crea un producto. Requiere autenticación. | No aplica | JSON con `category`, `name`, `stock`, `price` | `201`: `message` y `data`; `400`: datos faltantes; `401`/`403`: token ausente o inválido; `500`: error al crear. |
| `DELETE` | `/api/products/:id` | Elimina un producto por ID. Requiere autenticación. | `id` (ruta) | No aplica | `200`: `message` y `data` con el ID; `404`: producto no encontrado; `401`/`403`: token ausente o inválido; `500`: error interno. |
| `POST` | `/auth/login` | Verifica las credenciales y devuelve un JWT. | No aplica | JSON con `email` y `password` | `200`: `token`; `401`: credenciales incorrectas. |

### Autenticación

Para obtener un token, envía las credenciales a `/auth/login`. El usuario configurado actualmente para desarrollo es `admin@gmail.com` con contraseña `123456`. Incluye el token en las rutas protegidas con el encabezado:

```http
Authorization: Bearer <token>
```

## Ejemplos con curl

```bash
# Obtener todos los productos
curl http://localhost:3000/api/products

# Filtrar productos por categoría
curl "http://localhost:3000/api/products?category=electronics"

# Obtener un producto por ID
curl http://localhost:3000/api/products/abc123

# Iniciar sesión y obtener un token
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"123456"}' \
  http://localhost:3000/auth/login

# Crear un producto (reemplaza <token> por el JWT obtenido)
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"category":"electronics","name":"Smartphone","stock":10,"price":499.99}' \
  http://localhost:3000/api/products/create

# Eliminar un producto (requiere token)
curl -X DELETE \
  -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/products/abc123
```

### Ejemplo con fetch (JavaScript)

```js
// Iniciar sesión
const loginResponse = await fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "admin@gmail.com", password: "123456" }),
});
const { token } = await loginResponse.json();

// Consultar productos
const productsResponse = await fetch("http://localhost:3000/api/products");
console.log(await productsResponse.json());

// Crear producto
const createResponse = await fetch("http://localhost:3000/api/products/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    category: "electronics",
    name: "Laptop",
    stock: 5,
    price: 999.99,
  }),
});
console.log(await createResponse.json());

// Eliminar producto
const deleteResponse = await fetch("http://localhost:3000/api/products/abc123", {
  method: "DELETE",
  headers: { Authorization: `Bearer ${token}` },
});
console.log(await deleteResponse.json());
```

## Requisitos del cuerpo para crear un producto

| Campo | Tipo | Requerido |
| --- | --- | --- |
| `category` | `string` | Sí |
| `name` | `string` | Sí |
| `stock` | `number` | Sí |
| `price` | `number` | Sí |

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <repo-url>
cd nodejs-proyecto-final

# Instalar dependencias
npm install

# Configurar variables de entorno
# Copia .env.example a .env y completa los valores
cp .env.example .env

# Iniciar el servidor
npm run dev
```

El servidor escucha en `http://localhost:3000`.

## Notas

- Configura las credenciales de Firebase y `JWT_SECRET_KEY` en las variables de entorno.
- Las rutas `POST /api/products/create` y `DELETE /api/products/:id` requieren un JWT válido.
