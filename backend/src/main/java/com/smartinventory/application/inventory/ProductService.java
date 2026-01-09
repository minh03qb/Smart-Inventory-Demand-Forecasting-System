package com.smartinventory.application.inventory;

import com.smartinventory.application.inventory.dto.ProductDTO;
import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);
    ProductDTO getProductById(String id);
    List<ProductDTO> getAllProducts();
    List<ProductDTO> getLowStockProducts();
    ProductDTO updateProduct(String id, ProductDTO productDTO);
    void deleteProduct(String id);
}
