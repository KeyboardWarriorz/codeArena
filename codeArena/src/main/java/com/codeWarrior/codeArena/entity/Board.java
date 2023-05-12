package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer board_id;
    String board_name;
}
