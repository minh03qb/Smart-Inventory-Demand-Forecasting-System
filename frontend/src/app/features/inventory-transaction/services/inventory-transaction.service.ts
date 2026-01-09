import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryTransaction } from '../models/inventory-transaction.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InventoryTransactionService {
  private apiUrl = `${environment.apiUrl}/inventory/transactions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<InventoryTransaction[]> {
    return this.http.get<InventoryTransaction[]>(this.apiUrl);
  }

  create(data: Partial<InventoryTransaction>): Observable<InventoryTransaction> {
    return this.http.post<InventoryTransaction>(this.apiUrl, data);
  }
}
