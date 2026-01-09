import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { InventoryTransactionService } from '../services/inventory-transaction.service';
import { InventoryTransaction } from '../models/inventory-transaction.model';
import { ProductService } from '../../inventory/services/product.service';
import { ProductDTO } from '../../../shared/models/product.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-inventory-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './inventory-transaction-list.component.html',
  styleUrls: ['./inventory-transaction-list.component.scss']
})
export class InventoryTransactionListComponent implements OnInit {
  transactions: InventoryTransaction[] = [];
  products: ProductDTO[] = [];
  loading = false;
  displayedColumns: string[] = ['productName', 'type', 'quantity', 'timestamp', 'note'];

  constructor(
    private transactionService: InventoryTransactionService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loadTransactions();
      },
      error: () => {
        this.products = [];
        this.loadTransactions();
      }
    });
  }

  loadTransactions() {
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  getProductName(productId: string): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : productId;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
