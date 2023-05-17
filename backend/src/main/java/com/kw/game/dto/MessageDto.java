package com.kw.game.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageDto {
    private String type;
    private String message;
    private String fromLogin;
}
