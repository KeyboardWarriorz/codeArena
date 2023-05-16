package com.kw.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Solved {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "solved_id")
    @SequenceGenerator(name ="solved_id" , allocationSize = 1 , sequenceName = "solved_id")
    private Long solvedId;

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="problem_id")
    private Problem problem;

    private Integer success;

}

