package com.kw.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private String userId;
	private String nickname;
	private int point;
	private String profile_image;
}