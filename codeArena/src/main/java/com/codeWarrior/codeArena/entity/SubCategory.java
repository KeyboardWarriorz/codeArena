package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer subcategory_id;

    @ManyToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    Integer category_id;
    String content;
    String subcategory_name;
}
