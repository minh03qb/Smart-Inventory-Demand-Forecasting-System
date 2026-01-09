package com.smartinventory.presentation.forecasting;

import com.smartinventory.application.forecasting.ForecastService;
import com.smartinventory.application.forecasting.dto.ForecastRequest;
import com.smartinventory.application.forecasting.dto.ForecastResponse;
import com.smartinventory.domain.forecasting.ExponentialSmoothingForecast;
import com.smartinventory.domain.forecasting.MovingAverageForecast;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/forecasting")
@CrossOrigin(origins = "*")
public class ForecastController {
    private final ForecastService forecastService;

    public ForecastController(ForecastService forecastService) {
        this.forecastService = forecastService;
    }

    @PostMapping("/forecast")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<ForecastResponse> getForecast(@Valid @RequestBody ForecastRequest request) {
        double forecastedQuantity;
        
        if ("MOVING_AVERAGE".equalsIgnoreCase(request.getAlgorithm())) {
            forecastService.setStrategy(new MovingAverageForecast(3));
        } else if ("EXPONENTIAL_SMOOTHING".equalsIgnoreCase(request.getAlgorithm())) {
            forecastService.setStrategy(new ExponentialSmoothingForecast(0.5));
        } else {
            // Default to Moving Average
            forecastService.setStrategy(new MovingAverageForecast(3));
        }
        
        forecastedQuantity = forecastService.forecastNext(request.getSalesHistory());
        
        ForecastResponse response = new ForecastResponse(
            request.getProductId(),
            forecastedQuantity,
            request.getAlgorithm()
        );
        
        return ResponseEntity.ok(response);
    }
}
