import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'inventory',
    loadChildren: () => import('./features/inventory/inventory.routes').then(m => m.INVENTORY_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'forecasting',
    loadChildren: () => import('./features/forecasting/forecasting.routes').then(m => m.FORECASTING_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];
