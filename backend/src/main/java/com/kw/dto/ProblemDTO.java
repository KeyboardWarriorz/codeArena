package com.kw.dto;

import com.kw.entity.SubCategory;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProblemDTO {
    private Long problemId;

    private String title;
    private String question;

    private Integer answerIndex;

    private String answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private String solution;
    private int problem_type;
    
    private SubCategory subcategory;
    
    private int check;

	public ProblemDTO(Long problemId, String title, String question, Integer answerIndex, String answer1,
			String answer2, String answer3, String answer4, int problem_type) {
		this.problemId = problemId;
		this.title = title;
		this.question = question;
		this.answerIndex = answerIndex;
		this.answer1 = answer1;
		this.answer2 = answer2;
		this.answer3 = answer3;
		this.answer4 = answer4;
		this.problem_type = problem_type;
	}
	
	public ProblemDTO(Long problemId, String title, String question, Integer answerIndex, String answer1,
			String answer2, String answer3, String answer4, int problem_type, SubCategory subcategory) {
		this.problemId = problemId;
		this.title = title;
		this.question = question;
		this.answerIndex = answerIndex;
		this.answer1 = answer1;
		this.answer2 = answer2;
		this.answer3 = answer3;
		this.answer4 = answer4;
		this.problem_type = problem_type;
		this.subcategory = subcategory;
	}

	public ProblemDTO(Long problemId, String title, String question, Integer answerIndex, String answer1,
			String answer2, String answer3, String answer4, String solution, int problem_type,
			SubCategory subcategory) {
		this.problemId = problemId;
		this.title = title;
		this.question = question;
		this.answerIndex = answerIndex;
		this.answer1 = answer1;
		this.answer2 = answer2;
		this.answer3 = answer3;
		this.answer4 = answer4;
		this.solution = solution;
		this.problem_type = problem_type;
		this.subcategory = subcategory;
	}
    
    
}
