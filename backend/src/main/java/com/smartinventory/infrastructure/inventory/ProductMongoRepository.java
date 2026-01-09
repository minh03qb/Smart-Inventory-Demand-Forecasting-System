package com.smartinventory.infrastructure.inventory;

import com.smartinventory.domain.inventory.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMongoRepository extends MongoRepository<Product, String> {
}
