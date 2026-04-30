package com.estore.catalog.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;


    @Column(nullable = false)
    private BigDecimal price;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}