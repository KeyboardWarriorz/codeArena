package com.kw.service;

import java.util.List;

import com.kw.entity.Solved;
import org.springframework.data.domain.Pageable;

import com.kw.dto.SolvedDTO;

public interface SolvedService {
	public List<SolvedDTO> selectSolved_user(String userId, int success);
	
	public List<SolvedDTO> selectSolved_user_all(String userId, int success, Pageable pageable);

	public int countSol(String userId, int success);
	
	public List<SolvedDTO> selectSolved_user_all_cate(String userId, int success, String category_id, Pageable pageable);

	public int countSolCate(String userId, String cateId, int success);

	Solved checkSolved(String userId, Long problemId);

	void insertSolved(String userId, Long problemId, Integer success);

	boolean updateSuccess(Solved solved, Integer success);
}
