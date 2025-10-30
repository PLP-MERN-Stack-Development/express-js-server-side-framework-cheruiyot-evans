# 🛠️ Express.js + MongoDB RESTful API

A fully functional RESTful API built with **Express.js** and **MongoDB**, implementing standard CRUD operations, middleware (logging, authentication, validation), and robust error handling.

This project demonstrates clean API design, modular routing, and data persistence using **Mongoose**.

---

## 🚀 Features

- Standard **CRUD** operations for `products`
- **MongoDB** data persistence with Mongoose
- **Middleware** for:

  - Logging (method, URL, timestamp)
  - Authentication via API key
  - Request body validation

- **Error handling** with descriptive messages
- **Query filtering**, **pagination**, and **statistics** endpoints
- Environment variables via **dotenv**

---

## 📁 Project Structure

```
├── config/
│   └── db.js
├── middleware/
│   └── index.js
├── models/
│   └── Product.js
├── routes/
│   └── productRoutes.js
├── server.js
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone and install dependencies

```bash
git clone <your-repo-url>
cd express-products-api
npm install
```

### 2️⃣ Configure environment variables

Create a `.env` file based on `.env.example`:

```
PORT=3000
API_KEY=secret123
MONGO_URI=mongodb://localhost:27017/productsdb
```

> 💡 Use your own MongoDB Atlas URI if running remotely.

### 3️⃣ Start the server

```bash
node server.js
```

Expected output:

```
✅ MongoDB connected successfully
✅ Server running on port 3000
```

---

## 🧪 API Endpoints

All endpoints require the following header:

```
x-api-key: secret123
```

| Method | Endpoint                    | Description                                         |
| ------ | --------------------------- | --------------------------------------------------- |
| GET    | `/api/products`             | List all products (supports filtering & pagination) |
| GET    | `/api/products/:id`         | Retrieve a specific product by ID                   |
| POST   | `/api/products`             | Create a new product                                |
| PUT    | `/api/products/:id`         | Update an existing product                          |
| DELETE | `/api/products/:id`         | Delete a product                                    |
| GET    | `/api/products/stats/count` | Get product count by category                       |

---

## 🧩 Product Schema

```js
{
  "name": String,
  "description": String,
  "price": Number,
  "category": String,
  "inStock": Boolean
}
```

---

## 🧰 Example Requests (using cURL)

### ➕ Create Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret123" \
  -d '{"name":"Laptop","description":"High-performance laptop","price":1200,"category":"electronics","inStock":true}'
```

### 📜 Get All Products

```bash
curl -H "x-api-key: secret123" http://localhost:3000/api/products
```

### 🔍 Get Single Product

```bash
curl -H "x-api-key: secret123" http://localhost:3000/api/products/<product_id>
```

### ✏️ Update Product

```bash
curl -X PUT http://localhost:3000/api/products/<product_id> \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret123" \
  -d '{"price":1350,"inStock":false}'
```

### ❌ Delete Product

```bash
curl -X DELETE http://localhost:3000/api/products/<product_id> \
  -H "x-api-key: secret123"
```

---

## 📊 Filtering & Pagination

### Filter by category

```
GET /api/products?category=electronics
```

### Paginate

```
GET /api/products?page=2&limit=5
```

### Get Stats

```
GET /api/products/stats/count
```

Response:

```json
[
  { "_id": "electronics", "count": 5 },
  { "_id": "furniture", "count": 2 }
]
```

---

## 🧱 Middleware Summary

| Middleware        | File                  | Purpose                             |
| ----------------- | --------------------- | ----------------------------------- |
| `logger`          | `middleware/index.js` | Logs each request with timestamp    |
| `authenticate`    | `middleware/index.js` | Checks for valid `x-api-key` header |
| `validateProduct` | `middleware/index.js` | Validates product body fields       |

---

## 🐞 Error Handling

- 400 → Validation errors
- 401 → Unauthorized (missing/invalid API key)
- 404 → Product not found
- 500 → Server or database errors

---

## 🧰 Technologies Used

- **Node.js** (v18+)
- **Express.js**
- **MongoDB + Mongoose**
- **dotenv**
- **uuid**
- **body-parser**

---
