package com.smartinventory.domain.forecasting;

import java.util.List;

public class ExponentialSmoothingForecast implements ForecastStrategy {
    private final double alpha; // smoothing factor (0 < alpha <= 1)

    public ExponentialSmoothingForecast(double alpha) {
        if (alpha <= 0 || alpha > 1) {
            throw new IllegalArgumentException("Alpha must be in (0, 1]");
        }
        this.alpha = alpha;
    }

    @Override
    public double forecast(List<Integer> salesHistory) {
        if (salesHistory == null || salesHistory.isEmpty()) {
            throw new IllegalArgumentException("Sales history required");
        }
        double forecast = salesHistory.get(0);
        for (int i = 1; i < salesHistory.size(); i++) {
            forecast = alpha * salesHistory.get(i - 1) + (1 - alpha) * forecast;
        }
        return forecast;
    }
}
