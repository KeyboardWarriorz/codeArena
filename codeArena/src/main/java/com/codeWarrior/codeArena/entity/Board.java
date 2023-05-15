package com.codeWarrior.codeArena.entity;

import javax.persistence.*;

@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="board_id")
    Integer boardId;
    @Column(name="board_name")
    String boardName;
}
