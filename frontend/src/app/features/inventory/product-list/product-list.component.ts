import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';
import { ProductDTO } from '../../../shared/models/product.model';
import { AuthService } from '../../../core/auth/auth.service';
import { ProductFormDialogComponent } from './product-form-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Inventory Management</span>
      <span class="spacer"></span>
      <button mat-button (click)="logout()">Logout</button>
    </mat-toolbar>

    <div class="container">
      <div class="header-actions">
        <h1>Products</h1>
        <div>
          <button mat-raised-button color="accent" (click)="openCreateDialog()" style="margin-right: 10px;">
            <mat-icon>add</mat-icon>
            Add Product
          </button>
          <button mat-raised-button color="primary" (click)="toggleLowStock()">
            <mat-icon>{{ showLowStock ? 'list' : 'warning' }}</mat-icon>
            {{ showLowStock ? 'Show All' : 'Show Low Stock' }}
          </button>
        </div>
      </div>

      <mat-card>
        <mat-card-content>
          <table mat-table [dataSource]="displayedProducts" class="full-width">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Product Name</th>
              <td mat-cell *matCellDef="let product">{{ product.name }}</td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let product">\${{ product.price.toFixed(2) }}</td>
            </ng-container>

            <ng-container matColumnDef="currentStock">
              <th mat-header-cell *matHeaderCellDef>Current Stock</th>
              <td mat-cell *matCellDef="let product">{{ product.currentStock }}</td>
            </ng-container>

            <ng-container matColumnDef="minStock">
              <th mat-header-cell *matHeaderCellDef>Min Stock</th>
              <td mat-cell *matCellDef="let product">{{ product.minStock }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let product">
                <mat-chip-set>
                  <mat-chip [color]="product.lowStock ? 'warn' : 'primary'" highlighted>
                    {{ product.lowStock ? 'Low Stock' : 'In Stock' }}
                  </mat-chip>
                </mat-chip-set>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let product">
                <button mat-icon-button color="primary" (click)="openEditDialog(product)" matTooltip="Edit">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteProduct(product)" matTooltip="Delete">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div *ngIf="displayedProducts.length === 0" class="no-data">
            <mat-icon>inbox</mat-icon>
            <p>No products found</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .no-data mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 10px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: ProductDTO[] = [];
  displayedProducts: ProductDTO[] = [];
  displayedColumns: string[] = ['name', 'price', 'currentStock', 'minStock', 'status', 'actions'];
  showLowStock = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.showLowStock) {
      this.productService.getLowStockProducts().subscribe({
        next: (products) => {
          this.displayedProducts = products;
        },
        error: (err) => {
          console.error('Error loading low stock products:', err);
          this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.productService.getAllProducts().subscribe({
        next: (products) => {
          this.products = products;
          this.displayedProducts = products;
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
        }
      });
    }
  }

  toggleLowStock(): void {
    this.showLowStock = !this.showLowStock;
    this.loadProducts();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '500px',
      data: { product: null, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.createProduct(result).subscribe({
          next: () => {
            this.snackBar.open('Product created successfully!', 'Close', { duration: 3000 });
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error creating product:', err);
            this.snackBar.open('Error creating product', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openEditDialog(product: ProductDTO): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '500px',
      data: { product: { ...product }, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && product.id) {
        this.productService.updateProduct(product.id, result).subscribe({
          next: () => {
            this.snackBar.open('Product updated successfully!', 'Close', { duration: 3000 });
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error updating product:', err);
            this.snackBar.open('Error updating product', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteProduct(product: ProductDTO): void {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      if (product.id) {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.snackBar.open('Product deleted successfully!', 'Close', { duration: 3000 });
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error deleting product:', err);
            this.snackBar.open('Error deleting product', 'Close', { duration: 3000 });
          }
        });
      }
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
