package com.codeWarrior.codeArena.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer comment_id;
    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    Integer article_id;
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    Integer user_id;
    @ManyToOne(targetEntity = Board.class, fetch = FetchType.LAZY)
    Integer board_id;
    String content;
    @CreationTimestamp
    Date createdTime;

}
