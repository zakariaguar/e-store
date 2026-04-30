package com.estore.shopping.controller;

import com.estore.shopping.entity.Cart;
import com.estore.shopping.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestParam Long userId,
                                          @RequestParam Long productId,
                                          @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }

    @PutMapping("/update")
    public ResponseEntity<Cart> updateCartItem(@RequestParam Long cartItemId,
                                               @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateCartItem(cartItemId, quantity));
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long cartItemId) {
        cartService.removeCartItem(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}