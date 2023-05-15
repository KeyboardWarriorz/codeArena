package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="category_id")
    Integer categoryId;
    @Column(name="category_name")
    String categoryName;
}
