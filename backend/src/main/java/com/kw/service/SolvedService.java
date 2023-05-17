package com.kw.service;

import java.util.List;

import com.kw.dto.SolvedDTO;

public interface SolvedService {
	public List<SolvedDTO> selectSolved_user(String userId, int success);
}
