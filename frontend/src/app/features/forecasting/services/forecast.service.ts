import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ForecastRequest, ForecastResponse } from '../../../shared/models/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private readonly API_URL = `${environment.apiUrl}/forecasting`;

  constructor(private http: HttpClient) {}

  getForecast(request: ForecastRequest): Observable<ForecastResponse> {
    return this.http.post<ForecastResponse>(`${this.API_URL}/forecast`, request);
  }
}
