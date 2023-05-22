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
	private String Tier;
	private String access_token;
	private String refresh_token;

	public UserDTO(String userId, String nickname, int point, String profile_image) {
		this.userId = userId;
		this.nickname = nickname;
		this.point = point;
		this.profile_image = profile_image;
	}

	public UserDTO(String userId, String nickname, int point, String profile_image, String tier) {
		this.userId = userId;
		this.nickname = nickname;
		this.profile_image = profile_image;
		this.point = point;
		this.Tier = tier;
	}

	public UserDTO(String userId, String nickname, int point, String profile_image, String access_token, String refresh_token) {
		this.userId = userId;
		this.nickname = nickname;
		this.point = point;
		this.profile_image = profile_image;
		this.access_token = access_token;
		this.refresh_token = refresh_token;
	}
}