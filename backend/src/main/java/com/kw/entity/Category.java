package com.kw.entity;

import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "category_id")
    @SequenceGenerator(name ="category_id" , allocationSize = 1 , sequenceName = "category_id")
    private Long categoryId;

    private String categoryName;
}
