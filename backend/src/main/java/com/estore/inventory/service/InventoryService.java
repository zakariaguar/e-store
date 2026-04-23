package com.estore.inventory.service;

import com.estore.inventory.entity.Inventory;
import com.estore.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public int getStock(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .map(Inventory::getQuantity)
                .orElse(0);
    }

    @Transactional
    public void updateStock(Long productId, int quantity) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElse(Inventory.builder()
                        .productId(productId)
                        .quantity(0)
                        .build());

        inventory.setQuantity(quantity);
        inventoryRepository.save(inventory);
    }

    @Transactional
    public boolean checkAndReduceStock(Long productId, int requestedQuantity) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé en stock"));

        if (inventory.getQuantity() < requestedQuantity) {
            return false;
        }

        inventory.setQuantity(inventory.getQuantity() - requestedQuantity);
        inventoryRepository.save(inventory);
        return true;
    }
}