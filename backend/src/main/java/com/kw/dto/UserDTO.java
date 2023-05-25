package com.kw.dto;

import lombok.*;

import java.util.Objects;

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
	private String tier;
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
		this.tier = tier;
	}

	public UserDTO(String userId, String nickname, int point, String profile_image, String access_token, String refresh_token) {
		this.userId = userId;
		this.nickname = nickname;
		this.point = point;
		this.profile_image = profile_image;
		this.access_token = access_token;
		this.refresh_token = refresh_token;
	}
	@Override
	public int hashCode() {
		return Objects.hash(userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null || getClass() != obj.getClass()) {
			return false;
		}
		UserDTO other = (UserDTO) obj;
		return Objects.equals(userId, other.userId);
	}

}