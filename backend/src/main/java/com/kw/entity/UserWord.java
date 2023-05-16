package com.kw.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="User_Word")
public class UserWord {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "user_word_id")
    @SequenceGenerator(name ="user_word_id" , allocationSize = 1 , sequenceName = "user_word_id")
    private Long userWordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    private Word word;
}
