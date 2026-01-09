# Smart Inventory Frontend

Angular 17+ frontend application for the Smart Inventory & Demand Forecasting System.

## Tech Stack

- Angular 17+ (Standalone Components)
- Angular Material
- Chart.js & ng2-charts
- RxJS
- TypeScript 5.2+

## Project Structure

```
src/app/
├── core/                   # Singleton services, interceptors, guards
│   ├── auth/              # AuthService
│   ├── interceptors/      # HTTP interceptors (JWT)
│   └── guards/            # Route guards (auth)
├── shared/                # Reusable components, pipes, models
│   └── models/            # TypeScript interfaces
├── features/              # Feature modules (lazy-loaded)
│   ├── auth/              # Login, Register
│   ├── dashboard/         # Dashboard with metrics
│   ├── inventory/         # Product management
│   └── forecasting/       # Demand forecasting
├── app.config.ts          # App configuration
├── app.routes.ts          # Routing configuration
└── app.component.ts       # Root component
```

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
npm install
```

## Development

Run development server:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`

## Build

Build for production:

```bash
npm run build
# or
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

## Features

### Authentication
- JWT-based authentication
- Login and registration forms
- Auth guard for protected routes
- HTTP interceptor for automatic token injection

### Inventory Management
- Product CRUD operations
- Low-stock warnings
- Responsive data tables

### Demand Forecasting
- Interactive forecast charts
- Multiple algorithms (Moving Average, Exponential Smoothing)
- Historical data visualization

### Dashboard
- Key metrics display
- Real-time updates
- Material Design UI

## API Configuration

Update API URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## Testing

Run unit tests:

```bash
npm test
# or
ng test
```

## Code Quality

Run linter:

```bash
ng lint
```

## Deployment

### Build for Production

```bash
ng build --configuration production
```

### Deploy to Server

Upload contents of `dist/smart-inventory-frontend/` to your web server.

### Environment Variables

Update `src/environments/environment.prod.ts` with production API URL.

## Architecture Decisions

### Standalone Components
- Using Angular 17+ standalone components for better tree-shaking
- Reduces bundle size and improves performance

### Lazy Loading
- Feature modules are lazy-loaded for optimal performance
- Improves initial load time

### Material Design
- Angular Material for consistent, professional UI
- Responsive and accessible components

### State Management
- Using RxJS BehaviorSubject for simple state management
- Can be upgraded to NgRx if needed

## Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit pull request

## License

MIT License
