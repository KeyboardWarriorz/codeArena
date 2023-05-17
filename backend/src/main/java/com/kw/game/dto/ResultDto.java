package com.kw.game.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResultDto {
    private String type;
    private String content;
    private List<String> winner;
    private List<String> userList;
    private List<Integer> userScore;
}
