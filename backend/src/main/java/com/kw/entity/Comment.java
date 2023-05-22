package com.kw.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Comments")

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "comment_id")
    @SequenceGenerator(name ="comment_id" , allocationSize = 1 , sequenceName = "comment_id")
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="article_id")
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    private String content;

    @CreationTimestamp
    private Date createdTime;

}
