package com.smartinventory.application.forecasting.dto;

import java.util.List;

public class ForecastRequest {
    private String productId;
    private List<Integer> salesHistory;
    private String algorithm; // MOVING_AVERAGE or EXPONENTIAL_SMOOTHING

    public ForecastRequest() {}

    public ForecastRequest(String productId, List<Integer> salesHistory, String algorithm) {
        this.productId = productId;
        this.salesHistory = salesHistory;
        this.algorithm = algorithm;
    }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public List<Integer> getSalesHistory() { return salesHistory; }
    public void setSalesHistory(List<Integer> salesHistory) { this.salesHistory = salesHistory; }
    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }
}
