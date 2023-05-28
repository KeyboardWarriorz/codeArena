package com.kw.dto;

import java.util.List;

import com.kw.entity.Article;
import com.kw.entity.User;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MypageDTO {
	// 유저 단어 문제
	
	private UserDTO user;
	private List<SolvedDTO> success_solved;
	private List<SolvedDTO> failed_solved;
	private List<WordDTO> user_word;
	private Long user_rank;
	public MypageDTO(UserDTO user, List<WordDTO> user_word) {
		this.user = user;
		this.user_word = user_word;
	}
	

}
