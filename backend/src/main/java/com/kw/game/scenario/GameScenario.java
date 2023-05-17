package com.kw.game.scenario;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GameScenario {
    private Integer problemCategoryId;
    private Integer room_capacity;
    private Integer timeout;
    private Integer problem_cnt;
}
