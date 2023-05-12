package com.codeWarrior.codeArena.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer article_id;
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    String user_id;
    @ManyToOne(targetEntity = Board.class, fetch = FetchType.LAZY)
    Integer board_id;
    String title;
    String content;
    @CreationTimestamp
    Date createdTime;
}


