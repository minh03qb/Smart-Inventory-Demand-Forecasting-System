export interface ForecastRequest {
  productId: string;
  salesHistory: number[];
  algorithm: 'MOVING_AVERAGE' | 'EXPONENTIAL_SMOOTHING';
}

export interface ForecastResponse {
  productId: string;
  forecastedQuantity: number;
  algorithm: string;
}
