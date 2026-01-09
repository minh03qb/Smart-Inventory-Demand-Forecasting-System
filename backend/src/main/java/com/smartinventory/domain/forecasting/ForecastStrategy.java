package com.smartinventory.domain.forecasting;

import java.util.List;

public interface ForecastStrategy {
    /**
     * @param salesHistory List of past sales quantities (ordered oldest to newest)
     * @return forecasted quantity for next period
     */
    double forecast(List<Integer> salesHistory);
}
