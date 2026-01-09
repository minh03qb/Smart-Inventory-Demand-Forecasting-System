export interface InventoryTransaction {
  id?: string;
  productId: string;
  quantity: number;
  type: 'IMPORT' | 'EXPORT';
  timestamp?: string;
  note?: string;
}
