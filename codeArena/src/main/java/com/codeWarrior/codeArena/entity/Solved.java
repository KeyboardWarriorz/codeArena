package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class Solved {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="solved_id")
    Integer solvedId;
    @ManyToOne(targetEntity = User.class, fetch =FetchType.LAZY)
    @JoinColumn(name="user_id")
    String userId;
    @ManyToOne(targetEntity = Problem.class, fetch = FetchType.LAZY)
    @JoinColumn(name="problem_id")
    Integer problemId;
    Integer success;

}

