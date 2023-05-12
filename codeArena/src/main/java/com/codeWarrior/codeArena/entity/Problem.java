package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer problem_id;
    @ManyToOne(targetEntity = SubCategory.class, fetch = FetchType.LAZY)
    Integer subcategory_id;
    String title;
    String question;
    Integer answer_index;
    String answer_1;
    String answer_2;
    String answer_3;
    String answer_4;
}
