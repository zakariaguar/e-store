package com.estore.shopping.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    @JsonIgnore  // ← Ajoute cette annotation
    private Cart cart;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    private String productName;

    private Integer quantity;

    private BigDecimal price;
}