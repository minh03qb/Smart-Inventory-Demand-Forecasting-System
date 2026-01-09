package com.smartinventory.application.inventory.dto;

public class ProductDTO {
    private String id;
    private String name;
    private double price;
    private int currentStock;
    private int minStock;
    private boolean lowStock;

    public ProductDTO() {}

    public ProductDTO(String id, String name, double price, int currentStock, int minStock, boolean lowStock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.currentStock = currentStock;
        this.minStock = minStock;
        this.lowStock = lowStock;
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
    public boolean isLowStock() { return lowStock; }
    public void setLowStock(boolean lowStock) { this.lowStock = lowStock; }
}
