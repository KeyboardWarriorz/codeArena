package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class User_Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer user_word_id;
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    String user_id;

    @ManyToOne(targetEntity = Word.class, fetch = FetchType.LAZY)
    String word_id;
}
