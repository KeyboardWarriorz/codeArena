package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class Solved {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer solved_id;
    @ManyToOne(targetEntity = User.class, fetch =FetchType.LAZY)
    String user_id;
    @ManyToOne(targetEntity = Problem.class, fetch = FetchType.LAZY)
    Integer problem_id;
    Integer success;

}

