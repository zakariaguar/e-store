package com.estore.inventory.controller;

import com.estore.inventory.entity.Inventory;
import com.estore.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/{productId}")
    public ResponseEntity<Integer> getStock(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getStock(productId));
    }

    // ADMIN - Ajouter du stock
    @PostMapping("/admin")
    public ResponseEntity<Inventory> addStock(@RequestBody Inventory inventory) {
        inventoryService.updateStock(inventory.getProductId(), inventory.getQuantity());
        return ResponseEntity.status(HttpStatus.CREATED).body(inventory);
    }

    @PutMapping("/admin/update")
    public ResponseEntity<Inventory> updateStock(@RequestBody Inventory inventory) {
        inventoryService.updateStock(inventory.getProductId(), inventory.getQuantity());
        return ResponseEntity.ok(inventory);
    }
}