package com.smartinventory.domain.inventory;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private double price;
    private int currentStock;
    private int minStock;

    public Product() {}

    public Product(String id, String name, double price, int currentStock, int minStock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.currentStock = currentStock;
        this.minStock = minStock;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getCurrentStock() { return currentStock; }
    public void setCurrentStock(int currentStock) { this.currentStock = currentStock; }
    public int getMinStock() { return minStock; }
    public void setMinStock(int minStock) { this.minStock = minStock; }

    public boolean isLowStock() {
        return currentStock <= minStock;
    }
}
