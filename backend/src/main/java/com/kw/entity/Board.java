package com.kw.entity;

import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "board_id")
    @SequenceGenerator(name ="board_id" , allocationSize = 1 , sequenceName = "board_id")
    private Long boardId;

    private String boardName;
}
