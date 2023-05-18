package com.kw.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "problem_id")
    @SequenceGenerator(name ="problem_id" , allocationSize = 1 , sequenceName = "problem_id")
    private Long problemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="subcategory_id")
    private SubCategory subcategory;

    private String title;
    private String question;

    private Integer answerIndex;

    private String answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private String solution;
}
