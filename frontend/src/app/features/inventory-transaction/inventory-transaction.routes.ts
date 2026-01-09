import { Routes } from '@angular/router';
import { InventoryTransactionListComponent } from './inventory-transaction-list/inventory-transaction-list.component';
import { InventoryTransactionFormComponent } from './inventory-transaction-form/inventory-transaction-form.component';

export const inventoryTransactionRoutes: Routes = [
  { path: '', component: InventoryTransactionListComponent },
  { path: 'new', component: InventoryTransactionFormComponent },
];
