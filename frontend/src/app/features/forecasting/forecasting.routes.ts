import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

export const FORECASTING_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./forecast-view/forecast-view.component').then(m => m.ForecastViewComponent),
    canActivate: [adminGuard]
  }
];
