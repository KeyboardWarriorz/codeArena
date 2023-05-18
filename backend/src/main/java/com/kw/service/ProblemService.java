package com.kw.service;

import java.util.List;

import com.kw.dto.ProblemDTO;
import com.kw.entity.Problem;

public interface ProblemService {
	public List<ProblemDTO> select_pro();

	public List<ProblemDTO> select_pro_category(Long category);

	public List<ProblemDTO> select_random_problem(Long category, Integer problem_cnt);

	public ProblemDTO select_pro(String problemId);
}
