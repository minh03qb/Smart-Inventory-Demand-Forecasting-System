package com.smartinventory.domain.inventory;

import java.util.List;
import java.util.Optional;

public interface InventoryTransactionRepository {
    InventoryTransaction save(InventoryTransaction transaction);
    List<InventoryTransaction> findByProductId(String productId);
    List<InventoryTransaction> findAll();
    Optional<InventoryTransaction> findById(String id);
}
