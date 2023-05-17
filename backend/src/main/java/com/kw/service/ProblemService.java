package com.kw.service;

import java.util.List;

import com.kw.dto.ProblemDTO;

public interface ProblemService {
	public List<ProblemDTO> select_pro();
	
	public List<ProblemDTO> select_pro_id(String problemId);
	
	public List<ProblemDTO> select_pro_category(Long category);
}
