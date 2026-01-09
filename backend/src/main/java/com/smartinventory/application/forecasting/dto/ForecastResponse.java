package com.smartinventory.application.forecasting.dto;

public class ForecastResponse {
    private String productId;
    private double forecastedQuantity;
    private String algorithm;

    public ForecastResponse() {}

    public ForecastResponse(String productId, double forecastedQuantity, String algorithm) {
        this.productId = productId;
        this.forecastedQuantity = forecastedQuantity;
        this.algorithm = algorithm;
    }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public double getForecastedQuantity() { return forecastedQuantity; }
    public void setForecastedQuantity(double forecastedQuantity) { this.forecastedQuantity = forecastedQuantity; }
    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }
}
