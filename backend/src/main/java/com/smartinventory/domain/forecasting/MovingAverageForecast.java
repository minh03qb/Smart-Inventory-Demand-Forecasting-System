package com.smartinventory.domain.forecasting;

import java.util.List;

public class MovingAverageForecast implements ForecastStrategy {
    private final int period;

    public MovingAverageForecast(int period) {
        this.period = period;
    }

    @Override
    public double forecast(List<Integer> salesHistory) {
        if (salesHistory == null || salesHistory.size() < period) {
            throw new IllegalArgumentException("Not enough data for moving average. Need at least " + period + " data points.");
        }
        int sum = 0;
        for (int i = salesHistory.size() - period; i < salesHistory.size(); i++) {
            sum += salesHistory.get(i);
        }
        return sum / (double) period;
    }
}
