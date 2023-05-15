package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="subcategory_id")
    Integer subcategoryId;

    @ManyToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    Integer categoryId;
    String content;
    @Column(name="subcategory_name")
    String subcategoryName;
}
