import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForecastService } from '../services/forecast.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-forecast-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Demand Forecasting</span>
      <span class="spacer"></span>
      <button mat-button (click)="logout()">Logout</button>
    </mat-toolbar>

    <div class="container">
      <h1>Demand Forecasting</h1>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Generate Forecast</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="forecastForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width">
              <mat-label>Product ID</mat-label>
              <input matInput formControlName="productId" required>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Sales History (comma-separated)</mat-label>
              <input matInput formControlName="salesHistory" 
                     placeholder="e.g., 100,120,130,90,110,115,105" required>
              <mat-hint>Enter past sales quantities separated by commas</mat-hint>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Algorithm</mat-label>
              <mat-select formControlName="algorithm">
                <mat-option value="MOVING_AVERAGE">Moving Average</mat-option>
                <mat-option value="EXPONENTIAL_SMOOTHING">Exponential Smoothing</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="!forecastForm.valid || loading">
              <mat-icon>show_chart</mat-icon>
              {{ loading ? 'Calculating...' : 'Generate Forecast' }}
            </button>
          </form>

          <div *ngIf="forecastResult" class="result-section">
            <h2>Forecast Result</h2>
            <mat-card class="result-card">
              <mat-card-content>
                <div class="result-item">
                  <strong>Product ID:</strong> {{ forecastResult.productId }}
                </div>
                <div class="result-item">
                  <strong>Algorithm:</strong> {{ forecastResult.algorithm }}
                </div>
                <div class="result-item forecast-value">
                  <strong>Forecasted Quantity:</strong> 
                  <span class="value">{{ forecastResult.forecastedQuantity.toFixed(2) }}</span>
                </div>
              </mat-card-content>
            </mat-card>
          </div>

          <div *ngIf="error" class="error-message">{{ error }}</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    mat-form-field {
      margin-bottom: 16px;
    }

    button[type="submit"] mat-icon {
      margin-right: 8px;
    }

    .result-section {
      margin-top: 30px;
    }

    .result-card {
      background-color: #f5f5f5;
    }

    .result-item {
      padding: 10px 0;
      font-size: 16px;
    }

    .forecast-value {
      font-size: 20px;
      color: #1976d2;
      border-top: 2px solid #ddd;
      margin-top: 10px;
      padding-top: 20px;
    }

    .forecast-value .value {
      font-size: 32px;
      font-weight: bold;
      margin-left: 10px;
    }

    .error-message {
      color: #f44336;
      margin-top: 20px;
      padding: 10px;
      background-color: #ffebee;
      border-radius: 4px;
    }
  `]
})
export class ForecastViewComponent {
  forecastForm: FormGroup;
  loading = false;
  error = '';
  forecastResult: any = null;

  constructor(
    private fb: FormBuilder,
    private forecastService: ForecastService,
    private authService: AuthService,
    private router: Router
  ) {
    this.forecastForm = this.fb.group({
      productId: ['', Validators.required],
      salesHistory: ['', Validators.required],
      algorithm: ['MOVING_AVERAGE', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.forecastForm.valid) {
      this.loading = true;
      this.error = '';
      this.forecastResult = null;

      const formValue = this.forecastForm.value;
      const salesHistory = formValue.salesHistory
        .split(',')
        .map((s: string) => parseInt(s.trim(), 10))
        .filter((n: number) => !isNaN(n));

      const request = {
        productId: formValue.productId,
        salesHistory,
        algorithm: formValue.algorithm
      };

      this.forecastService.getForecast(request).subscribe({
        next: (result) => {
          this.forecastResult = result;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to generate forecast. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
