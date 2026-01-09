import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductDTO } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.isEdit ? 'Edit Product' : 'Add New Product' }}</h2>
    <mat-dialog-content>
      <form #productForm="ngForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Product Name</mat-label>
          <input matInput [(ngModel)]="product.name" name="name" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Price ($)</mat-label>
          <input matInput type="number" [(ngModel)]="product.price" name="price" required min="0" step="0.01">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Current Stock</mat-label>
          <input matInput type="number" [(ngModel)]="product.currentStock" name="currentStock" required min="0">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Minimum Stock</mat-label>
          <input matInput type="number" [(ngModel)]="product.minStock" name="minStock" required min="0">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!productForm.valid">
        {{ data.isEdit ? 'Update' : 'Create' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    mat-dialog-content {
      min-width: 400px;
      padding: 20px;
    }

    mat-dialog-actions {
      padding: 15px 20px;
    }
  `]
})
export class ProductFormDialogComponent {
  product: ProductDTO;

  constructor(
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: ProductDTO | null, isEdit: boolean }
  ) {
    this.product = data.product ? { ...data.product } : {
      id: undefined,
      name: '',
      price: 0,
      currentStock: 0,
      minStock: 0,
      lowStock: false
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.product);
  }
}
