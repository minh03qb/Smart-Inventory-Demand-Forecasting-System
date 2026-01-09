package com.smartinventory.application.inventory;

import com.smartinventory.application.inventory.dto.ProductDTO;
import com.smartinventory.domain.inventory.Product;
import com.smartinventory.domain.inventory.ProductRepository;
import com.smartinventory.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    private ProductDTO toDTO(Product product) {
        return new ProductDTO(
            product.getId(),
            product.getName(),
            product.getPrice(),
            product.getCurrentStock(),
            product.getMinStock(),
            product.isLowStock()
        );
    }

    private Product toEntity(ProductDTO dto) {
        return new Product(
            dto.getId(),
            dto.getName(),
            dto.getPrice(),
            dto.getCurrentStock(),
            dto.getMinStock()
        );
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = toEntity(productDTO);
        Product saved = productRepository.save(product);
        return toDTO(saved);
    }

    @Override
    public ProductDTO getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));
        return toDTO(product);
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getLowStockProducts() {
        return productRepository.findAll().stream()
                .filter(Product::isLowStock)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO updateProduct(String id, ProductDTO productDTO) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));
        
        existing.setName(productDTO.getName());
        existing.setPrice(productDTO.getPrice());
        existing.setCurrentStock(productDTO.getCurrentStock());
        existing.setMinStock(productDTO.getMinStock());
        
        Product updated = productRepository.save(existing);
        return toDTO(updated);
    }

    @Override
    public void deleteProduct(String id) {
        if (!productRepository.findById(id).isPresent()) {
            throw new NotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}
