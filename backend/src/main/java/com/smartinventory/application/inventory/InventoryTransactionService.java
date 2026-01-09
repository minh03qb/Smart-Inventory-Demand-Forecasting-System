package com.smartinventory.application.inventory;

import com.smartinventory.application.inventory.dto.InventoryTransactionDTO;
import java.util.List;

public interface InventoryTransactionService {
    InventoryTransactionDTO createTransaction(InventoryTransactionDTO dto);
    List<InventoryTransactionDTO> getTransactionsByProductId(String productId);
    List<InventoryTransactionDTO> getAllTransactions();
}
