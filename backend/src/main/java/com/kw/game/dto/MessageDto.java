package com.kw.game.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class MessageDto {
    private String type;
    private String message;
    private String fromLogin;

    public MessageDto() {
        this.type = "broadcast";
        this.message = "";
        this.fromLogin = "system";
    }
}
