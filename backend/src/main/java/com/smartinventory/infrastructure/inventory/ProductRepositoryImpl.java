package com.smartinventory.infrastructure.inventory;

import com.smartinventory.domain.inventory.Product;
import com.smartinventory.domain.inventory.ProductRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ProductRepositoryImpl implements ProductRepository {
    private final ProductMongoRepository mongoRepository;

    public ProductRepositoryImpl(ProductMongoRepository mongoRepository) {
        this.mongoRepository = mongoRepository;
    }

    @Override
    public Product save(Product product) {
        return mongoRepository.save(product);
    }

    @Override
    public Optional<Product> findById(String id) {
        return mongoRepository.findById(id);
    }

    @Override
    public List<Product> findAll() {
        return mongoRepository.findAll();
    }

    @Override
    public void deleteById(String id) {
        mongoRepository.deleteById(id);
    }
}
