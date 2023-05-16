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
//	private List<Article> article;
//	private List<Object> problem;
}
