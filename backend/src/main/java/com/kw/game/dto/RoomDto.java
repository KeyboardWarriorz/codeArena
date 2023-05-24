package com.kw.game.dto;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RoomDto {
    private String roomName;
    private Integer category_id;
    public Set<String> users;
    public String master;
    private Integer capacity;
    private GameScenarioDto gameScenarioDto;
    private boolean isPlaying;
}
