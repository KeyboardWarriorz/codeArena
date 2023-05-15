package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="word_id")
    Integer wordId;
    String name;
    String description;
}
