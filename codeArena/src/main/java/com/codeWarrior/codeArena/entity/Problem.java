package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="problem_id")
    Integer problemId;
    @ManyToOne(targetEntity = SubCategory.class, fetch = FetchType.LAZY)
    @JoinColumn(name="subcategory_id")
    Integer subcategoryId;
    String title;
    String question;
    @Column(name="answer_index")
    Integer answerIndex;
    @Column(name="answer_1")
    String answer1;
    @Column(name="answer_2")
    String answer2;
    @Column(name="answer_3")
    String answer3;
    @Column(name="answer_4")
    String answer4;
}
