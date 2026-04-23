package com.estore.billing.service;

import com.estore.billing.entity.Order;
import com.estore.billing.entity.OrderItem;
import com.estore.billing.repository.OrderRepository;
import com.estore.billing.repository.OrderItemRepository;
import com.estore.shopping.entity.Cart;
import com.estore.shopping.entity.CartItem;
import com.estore.shopping.service.CartService;
import com.estore.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartService cartService;
    private final InventoryService inventoryService;

    @Transactional
    public Order createOrder(Long userId) {
        Cart cart = cartService.getCartByUserId(userId);

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Le panier est vide");
        }

        // Vérifier et réduire le stock
        for (CartItem cartItem : cart.getItems()) {
            boolean available = inventoryService.checkAndReduceStock(cartItem.getProductId(), cartItem.getQuantity());
            if (!available) {
                throw new RuntimeException("Stock insuffisant pour: " + cartItem.getProductName());
            }
        }

        // Créer la commande
        Order order = Order.builder()
                .userId(userId)
                .total(calculateTotal(cart))
                .build();

        Order savedOrder = orderRepository.save(order);

        // Créer les lignes de commande
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .order(savedOrder)
                    .productId(cartItem.getProductId())
                    .productName(cartItem.getProductName())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getPrice())
                    .build();
            orderItemRepository.save(orderItem);
            savedOrder.getItems().add(orderItem);
        }

        // Vider le panier
        cartService.clearCart(userId);

        return savedOrder;
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    private BigDecimal calculateTotal(Cart cart) {
        return cart.getItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}