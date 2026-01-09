package com.smartinventory.application.inventory;

import com.smartinventory.application.inventory.dto.InventoryTransactionDTO;
import com.smartinventory.domain.inventory.InventoryTransaction;
import com.smartinventory.domain.inventory.InventoryTransactionRepository;
import com.smartinventory.domain.inventory.Product;
import com.smartinventory.domain.inventory.ProductRepository;
import com.smartinventory.exception.BadRequestException;
import com.smartinventory.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryTransactionServiceImpl implements InventoryTransactionService {
    private final InventoryTransactionRepository transactionRepository;
    private final ProductRepository productRepository;

    public InventoryTransactionServiceImpl(
            InventoryTransactionRepository transactionRepository,
            ProductRepository productRepository) {
        this.transactionRepository = transactionRepository;
        this.productRepository = productRepository;
    }

    private InventoryTransactionDTO toDTO(InventoryTransaction entity) {
        return new InventoryTransactionDTO(
                entity.getId(),
                entity.getProductId(),
                entity.getQuantity(),
                entity.getType(),
                entity.getTimestamp(),
                entity.getNote()
        );
    }

    private InventoryTransaction toEntity(InventoryTransactionDTO dto) {
        return new InventoryTransaction(
                dto.getId(),
                dto.getProductId(),
                dto.getQuantity(),
                dto.getType(),
                dto.getTimestamp() != null ? dto.getTimestamp() : LocalDateTime.now(),
                dto.getNote()
        );
    }

    @Override
    public InventoryTransactionDTO createTransaction(InventoryTransactionDTO dto) {
        // Tìm sản phẩm
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + dto.getProductId()));

        // Validate và cập nhật tồn kho
        if (dto.getType() == InventoryTransaction.TransactionType.EXPORT) {
            // Xuất kho: kiểm tra tồn kho đủ không
            if (product.getCurrentStock() < dto.getQuantity()) {
                throw new BadRequestException(
                        "Insufficient stock. Current: " + product.getCurrentStock() + ", Required: " + dto.getQuantity());
            }
            product.setCurrentStock(product.getCurrentStock() - dto.getQuantity());
        } else {
            // Nhập kho: tăng tồn kho
            product.setCurrentStock(product.getCurrentStock() + dto.getQuantity());
        }

        // Lưu cập nhật sản phẩm
        productRepository.save(product);

        // Lưu giao dịch
        InventoryTransaction entity = toEntity(dto);
        entity.setTimestamp(LocalDateTime.now());
        InventoryTransaction saved = transactionRepository.save(entity);
        return toDTO(saved);
    }

    @Override
    public List<InventoryTransactionDTO> getTransactionsByProductId(String productId) {
        return transactionRepository.findByProductId(productId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryTransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
