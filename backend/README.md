# Smart Inventory Backend API

Spring Boot REST API with Clean Architecture, JWT authentication, and MongoDB.

## Project Structure

```
src/main/java/com/smartinventory/
├── domain/                 # Core business entities & interfaces
│   ├── auth/              # User, Role, UserRepository
│   ├── inventory/         # Product, ProductRepository
│   └── forecasting/       # ForecastStrategy, algorithms
├── application/           # Use cases, services, DTOs
│   ├── auth/              # AuthService, DTOs
│   ├── inventory/         # ProductService, DTOs
│   └── forecasting/       # ForecastService, DTOs
├── infrastructure/        # External implementations
│   ├── auth/              # JWT, MongoDB repositories
│   └── inventory/         # MongoDB repositories
├── presentation/          # REST controllers
│   ├── auth/              # AuthController
│   ├── inventory/         # ProductController
│   └── forecasting/       # ForecastController
├── config/                # Security, MongoDB configs
└── exception/             # Global exception handling
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Inventory Management
- `GET /api/inventory/products` - Get all products
- `GET /api/inventory/products/{id}` - Get product by ID
- `GET /api/inventory/products/low-stock` - Get low-stock products
- `POST /api/inventory/products` - Create product
- `PUT /api/inventory/products/{id}` - Update product
- `DELETE /api/inventory/products/{id}` - Delete product (ADMIN only)

### Forecasting
- `POST /api/forecasting/forecast` - Get demand forecast

## Sample API Requests

### Register
```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "password123",
  "roles": ["ADMIN"]
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "username": "admin",
  "roles": ["ADMIN"]
}
```

### Login
```json
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "username": "admin",
  "roles": ["ADMIN"]
}
```

### Create Product
```json
POST /api/inventory/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Laptop",
  "price": 999.99,
  "currentStock": 50,
  "minStock": 10
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "price": 999.99,
  "currentStock": 50,
  "minStock": 10,
  "lowStock": false
}
```

### Get Low Stock Products
```json
GET /api/inventory/products/low-stock
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "Mouse",
    "price": 29.99,
    "currentStock": 5,
    "minStock": 10,
    "lowStock": true
  }
]
```

### Forecast Demand
```json
POST /api/forecasting/forecast
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "salesHistory": [100, 120, 130, 90, 110, 115, 105],
  "algorithm": "MOVING_AVERAGE"
}
```

**Response:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "forecastedQuantity": 110.0,
  "algorithm": "MOVING_AVERAGE"
}
```

## Configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/smartinventory

jwt:
  secret: your-secret-key
  expiration: 86400000

server:
  port: 8080
```

## Security

- **Authentication**: JWT tokens (Bearer token in Authorization header)
- **Password Hashing**: BCrypt
- **Role-based Access**: 
  - ADMIN: Full access
  - STAFF: Read/Write access (cannot delete products)

## Forecasting Algorithms

### Moving Average
- Calculates average of last N periods
- Default period: 3
- Formula: `(x[n-2] + x[n-1] + x[n]) / 3`

### Exponential Smoothing
- Weighted average with smoothing factor (alpha)
- Default alpha: 0.5
- Formula: `F[t] = α * x[t-1] + (1-α) * F[t-1]`

## Error Responses

All errors follow this format:

```json
{
  "timestamp": "2026-01-09T12:34:56",
  "status": 404,
  "error": "Not Found",
  "message": "Product not found with id: 123",
  "path": "/api/inventory/products/123"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 204: No Content (Deleted)
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Build & Run

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Run tests
mvn test
```

## Production Checklist

- [ ] Use environment variables for sensitive configs
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Implement API documentation (Swagger)
- [ ] Add monitoring and health checks
- [ ] Implement database indexing
- [ ] Add comprehensive logging
- [ ] Enable CORS for specific origins only
