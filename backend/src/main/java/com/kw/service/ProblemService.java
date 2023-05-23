package com.kw.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.kw.dto.ProblemDTO;

public interface ProblemService {
	public List<ProblemDTO> select_pro_All(String userId, Pageable pageable);

	public List<ProblemDTO> select_pro_category_user(String userId, Long category, Pageable pageable);

	public List<ProblemDTO> select_pro_category( Long category);

	public List<ProblemDTO> select_random_problem(Long category, Integer problem_cnt);

	public ProblemDTO select_pro(String problemId);

	public Integer count_Pro();
	
	public Integer count_Pro_cate(Long category);

	Long getProblemId(Long subcategoryId);
}
