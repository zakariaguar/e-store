package com.estore.billing.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore  // ← Ajoute cette ligne
    private Order order;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    private String productName;

    private Integer quantity;

    private BigDecimal price;

    @Column(name = "image_url")
    private String imageUrl;
}