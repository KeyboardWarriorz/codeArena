package com.kw.game.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuestionDto {
    private String type;
    private String question;
    private List<String> answer;
    private Integer answer_index;
    private String description;
}
