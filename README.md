# Smart Inventory & Demand Forecasting System

Professional-level full-stack inventory management system with demand forecasting.

## Project Structure

```
.
├── backend/          # Spring Boot REST API
└── frontend/         # Angular 17+ Web App
```

## Tech Stack

### Backend
- Java 17
- Spring Boot 2.7.18
- Spring Security + JWT
- MongoDB
- Clean Architecture

### Frontend
- Angular 17+
- Angular Material
- Chart.js for forecasting visualization
- JWT authentication

### Features
- ✅ User authentication & authorization (JWT)
- ✅ Role-based access control (ADMIN, STAFF)
- ✅ Product inventory management (CRUD)
- ✅ Low-stock warnings
- ✅ Demand forecasting (Moving Average & Exponential Smoothing)
- ✅ RESTful APIs
- ✅ Responsive Angular Material UI
- ✅ Real-time data visualization

## Prerequisites

- JDK 17
- Node.js 18+
- Maven 3.6+
- MongoDB 4.4+

## Quick Start

### 1. Install MongoDB
```bash
# On Windows (with Chocolatey)
choco install mongodb

# Start MongoDB
mongod
```

### 2. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### 3. Frontend Setup
```bash
cd frontend
npm install
ng serve
```

Frontend runs on: `http://localhost:4200`

## API Documentation

See [backend/README.md](backend/README.md) for detailed API endpoints and sample requests.

## Architecture

### Backend (Clean Architecture)
- **Domain Layer**: Core business logic, framework-independent
- **Application Layer**: Use cases and orchestration
- **Infrastructure Layer**: External systems (MongoDB, JWT)
- **Presentation Layer**: REST APIs

### Frontend (Angular)
- **Core Module**: Singleton services (Auth, Interceptors, Guards)
- **Shared Module**: Reusable components, pipes, models
- **Feature Modules**: Lazy-loaded (Auth, Inventory, Forecasting, Dashboard)

## Development

### Backend Development
```bash
cd backend
mvn spring-boot:run
```

### Frontend Development
```bash
cd frontend
ng serve --open
```

### Run Tests
```bash
# Backend
cd backend
mvn test

# Frontend
cd frontend
ng test
```

## License

MIT License
