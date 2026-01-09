import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { inventoryTransactionRoutes } from './inventory-transaction.routes';

@NgModule({
  imports: [
    RouterModule.forChild(inventoryTransactionRoutes)
  ]
})
export class InventoryTransactionModule {}
