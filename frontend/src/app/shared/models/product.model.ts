export interface Product {
  id?: string;
  name: string;
  price: number;
  currentStock: number;
  minStock: number;
  lowStock?: boolean;
}

export interface ProductDTO {
  id?: string;
  name: string;
  price: number;
  currentStock: number;
  minStock: number;
  lowStock?: boolean;
}
