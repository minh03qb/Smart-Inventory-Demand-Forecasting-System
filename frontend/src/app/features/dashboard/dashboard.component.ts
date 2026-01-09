import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../../core/auth/auth.service';
import { ProductService } from '../inventory/services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Smart Inventory Dashboard</span>
      <span class="spacer"></span>
      <span>Welcome, {{ username }}</span>
      <button mat-button (click)="logout()">Logout</button>
    </mat-toolbar>

    <div class="container">
      <h1>Dashboard</h1>

      <mat-grid-list cols="3" rowHeight="200px" gutterSize="20px">
        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon color="primary">inventory</mat-icon>
              <mat-card-title>Total Products</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <h2>{{ totalProducts }}</h2>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon color="warn">warning</mat-icon>
              <mat-card-title>Low Stock Items</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <h2>{{ lowStockCount }}</h2>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-icon color="accent">trending_up</mat-icon>
              <mat-card-title>Forecasting</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <h2>Active</h2>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>

      <div class="action-buttons">
        <button mat-raised-button color="primary" (click)="goToInventory()">
          <mat-icon>inventory</mat-icon>
          Manage Inventory
        </button>
        <button mat-raised-button color="accent" (click)="goToForecasting()">
          <mat-icon>show_chart</mat-icon>
          View Forecasts
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-card {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    .dashboard-card mat-card-header {
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .dashboard-card mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 10px;
    }

    .dashboard-card h2 {
      font-size: 48px;
      margin: 20px 0;
    }

    .action-buttons {
      display: flex;
      gap: 20px;
      margin-top: 30px;
      justify-content: center;
    }

    .action-buttons button {
      padding: 15px 30px;
    }

    .action-buttons mat-icon {
      margin-right: 8px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  username = '';
  totalProducts = 0;
  lowStockCount = 0;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.username = user?.username || 'User';
    
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.totalProducts = products.length;
        this.lowStockCount = products.filter(p => p.lowStock).length;
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
      }
    });
  }

  goToInventory(): void {
    this.router.navigate(['/inventory']);
  }

  goToForecasting(): void {
    this.router.navigate(['/forecasting']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
