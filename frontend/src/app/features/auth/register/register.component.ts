import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <div class="register-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Register for Smart Inventory</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" required>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Role</mat-label>
              <mat-select formControlName="role">
                <mat-option value="STAFF">Staff</mat-option>
                <mat-option value="ADMIN">Admin</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" class="full-width" 
                    [disabled]="!registerForm.valid || loading">
              {{ loading ? 'Registering...' : 'Register' }}
            </button>

            <div *ngIf="error" class="error-message">{{ error }}</div>

            <p class="login-link">
              Already have an account? <a routerLink="/auth/login">Login here</a>
            </p>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    mat-card {
      max-width: 400px;
      width: 100%;
      margin: 20px;
    }

    mat-form-field {
      margin-bottom: 16px;
    }

    .error-message {
      color: #f44336;
      margin-top: 10px;
      text-align: center;
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['STAFF', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      
      const { username, password, role } = this.registerForm.value;
      const request = {
        username,
        password,
        roles: [role]
      };

      this.authService.register(request).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = err.error?.message || 'Registration failed. Please try again.';
          this.loading = false;
        }
      });
    }
  }
}
