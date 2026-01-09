package com.smartinventory.application.forecasting;

import com.smartinventory.domain.forecasting.ForecastStrategy;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ForecastService {
    private ForecastStrategy strategy;

    public ForecastService() {}

    public ForecastService(ForecastStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(ForecastStrategy strategy) {
        this.strategy = strategy;
    }

    public double forecastNext(List<Integer> salesHistory) {
        if (strategy == null) {
            throw new IllegalStateException("Forecast strategy not set");
        }
        return strategy.forecast(salesHistory);
    }
}
