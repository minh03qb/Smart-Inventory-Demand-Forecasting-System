package com.smartinventory.domain.inventory;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "inventory_transactions")
public class InventoryTransaction {
    @Id
    private String id;
    private String productId;
    private int quantity;
    private TransactionType type; // IMPORT, EXPORT
    private LocalDateTime timestamp;
    private String note;

    public enum TransactionType {
        IMPORT, EXPORT
    }

    public InventoryTransaction() {}

    public InventoryTransaction(String id, String productId, int quantity, TransactionType type, LocalDateTime timestamp, String note) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.type = type;
        this.timestamp = timestamp;
        this.note = note;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
