package com.smartinventory.infrastructure.inventory;

import com.smartinventory.domain.inventory.InventoryTransaction;
import com.smartinventory.domain.inventory.InventoryTransactionRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryTransactionMongoRepository extends MongoRepository<InventoryTransaction, String>, InventoryTransactionRepository {
    List<InventoryTransaction> findByProductId(String productId);
}
