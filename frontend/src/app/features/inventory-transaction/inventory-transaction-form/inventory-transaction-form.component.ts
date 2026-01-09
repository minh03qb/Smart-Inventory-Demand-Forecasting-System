import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InventoryTransactionService } from '../services/inventory-transaction.service';
import { ProductService } from '../../inventory/services/product.service';
import { ProductDTO } from '../../../shared/models/product.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-inventory-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './inventory-transaction-form.component.html',
  styleUrls: ['./inventory-transaction-form.component.scss']
})
export class InventoryTransactionFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  loading = false;
  errorMessage = '';
  products: ProductDTO[] = [];
  types = [
    { value: 'IMPORT', label: 'Import' },
    { value: 'EXPORT', label: 'Export' }
  ];

  constructor(
    private fb: FormBuilder,
    private transactionService: InventoryTransactionService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      type: ['EXPORT', Validators.required],
      note: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    // If STAFF, restrict to EXPORT only and disable type field
    if (!this.isAdmin()) {
      this.form.patchValue({ type: 'EXPORT' });
      this.form.get('type')?.disable();
      this.types = [{ value: 'EXPORT', label: 'Export' }];
    }
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    this.errorMessage = '';
    // Include disabled field value for STAFF users
    const formValue = this.form.getRawValue();
    this.transactionService.create(formValue).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/inventory-transaction']);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.message || 'An error occurred while saving transaction';
      }
    });
  }

  getSelectedProduct(): ProductDTO | undefined {
    const productId = this.form.get('productId')?.value;
    return this.products.find(p => p.id === productId);
  }

  goBack(): void {
    this.router.navigate(['/inventory-transaction']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }
}
