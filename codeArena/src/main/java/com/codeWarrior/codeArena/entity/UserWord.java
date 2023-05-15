package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
@Table(name="User_Word")
public class UserWord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_word_id")
    Integer userWordId;
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    String userId;

    @ManyToOne(targetEntity = Word.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    String wordId;
}
