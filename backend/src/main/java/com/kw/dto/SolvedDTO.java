package com.kw.dto;


import com.kw.entity.Problem;
import com.kw.entity.Solved;
import com.kw.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolvedDTO {
	private Long solvedId;
	private ProblemDTO problem; 
	private Integer success;
}
