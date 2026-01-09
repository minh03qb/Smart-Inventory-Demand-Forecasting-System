import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductDTO } from '../../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = `${environment.apiUrl}/inventory/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.API_URL);
  }

  getProductById(id: string): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.API_URL}/${id}`);
  }

  getLowStockProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.API_URL}/low-stock`);
  }

  createProduct(product: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(this.API_URL, product);
  }

  updateProduct(id: string, product: ProductDTO): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(`${this.API_URL}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
