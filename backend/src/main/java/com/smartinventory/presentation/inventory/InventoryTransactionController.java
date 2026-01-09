package com.smartinventory.presentation.inventory;

import com.smartinventory.application.inventory.InventoryTransactionService;
import com.smartinventory.application.inventory.dto.InventoryTransactionDTO;
import com.smartinventory.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/inventory/transactions")
@CrossOrigin(origins = "*")
public class InventoryTransactionController {
    private final InventoryTransactionService transactionService;

    public InventoryTransactionController(InventoryTransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<InventoryTransactionDTO> createTransaction(@Valid @RequestBody InventoryTransactionDTO dto, Authentication authentication) {
        // STAFF can only create EXPORT transactions
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        
        boolean isStaff = roles.contains("ROLE_STAFF") && !roles.contains("ROLE_ADMIN");
        if (isStaff && dto.getType() != com.smartinventory.domain.inventory.InventoryTransaction.TransactionType.EXPORT) {
            throw new BadRequestException("STAFF users can only create EXPORT transactions");
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).body(transactionService.createTransaction(dto));
    }

    @GetMapping("/product/{productId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<List<InventoryTransactionDTO>> getTransactionsByProduct(@PathVariable String productId) {
        return ResponseEntity.ok(transactionService.getTransactionsByProductId(productId));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<List<InventoryTransactionDTO>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }
}
