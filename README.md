# API de Productos

## Descripción

Esta API expone un conjunto de endpoints que permiten consultar, crear y administrar productos almacenados en una base de datos Firebase Firestore. Los endpoints están disponibles en el prefijo `/api`.

## Endpoints

| Método | Ruta                   | Descripción                                                                                 | Parámetros            | Cuerpo                                        | Respuesta                                    | Código de estado              |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------------- | -------------------------------------------- | ----------------------------- |
| `GET`  | `/api/products`        | Obtiene todos los productos. Se puede filtrar por categoría utilizando la query `category`. | `category` (opcional) | N/A                                           | `message` y `data` con la lista de productos | `200` o `404` (no encontrado) |
| `GET`  | `/api/products/:id`    | Obtiene un producto por su ID.                                                              | `id` (en la ruta)     | N/A                                           | `message` y `data` con el producto           | `200` o `404`                 |
| `POST` | `/api/products/create` | Crea un nuevo producto.                                                                     | N/A                   | JSON con `category`, `name`, `stock`, `price` | `201` con el objeto creado                   |

### Ejemplo de uso con **curl**

```bash
# Obtener todos los productos
curl -X GET http://localhost:3000/api/products

# Obtener productos de la categoría "electronics"
curl -X GET "http://localhost:3000/api/products?category=electronics"

# Obtener un producto por ID
curl -X GET http://localhost:3000/api/products/abc123

# Crear un nuevo producto
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"category":"electronics","name":"Smartphone","stock":10,"price":499.99}' \
  http://localhost:3000/api/products/create
```

### Ejemplo con **fetch** (JavaScript)

```js
// Obtener productos
fetch("http://localhost:3000/api/products")
  .then((r) => r.json())
  .then(console.log);

// Crear producto
fetch("http://localhost:3000/api/products/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    category: "electronics",
    name: "Laptop",
    stock: 5,
    price: 999.99,
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

## Requisitos de la solicitud

Para crear un producto, el cuerpo de la petición debe contener:

| Campo      | Tipo   | Requerido |
| ---------- | ------ | --------- |
| `category` | string | Sí        |
| `name`     | string | Sí        |
| `stock`    | number | Sí        |
| `price`    | number | Sí        |

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <repo-url>
cd nodejs-proyecto-final

# Instalar dependencias
npm install

# Configurar variables de entorno
# Copie .env.example a .env y rellene los valores
cp .env.example .env

# Iniciar el servidor
npm run dev
```

La API se ejecutará en `http://localhost:3000`.

## Notas

- Los datos se almacenan en Firebase Firestore. Asegúrese de que las credenciales de Firebase estén configuradas correctamente en las variables de entorno.
