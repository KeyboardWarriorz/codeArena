package com.kw.game.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class GameScenarioDto {
    private Integer problemCategoryId;
    private Integer timeout;
    private Integer problem_cnt;

    public GameScenarioDto() {
        this.problem_cnt = 3;
        this.timeout = 10;
        this.problemCategoryId = 2;
    }
}
