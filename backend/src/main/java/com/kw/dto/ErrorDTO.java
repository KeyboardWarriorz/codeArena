package com.kw.dto;

import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDTO {

    private int errorCode;

    private String errorMessage;
}