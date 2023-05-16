package com.kw.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "word_id")
    @SequenceGenerator(name ="word_id" , allocationSize = 1 , sequenceName = "word_id")
    private Long wordId;
    private String name;
    private String description;
}
