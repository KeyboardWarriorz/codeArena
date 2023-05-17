package com.kw.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kw.dto.SolvedDTO;
import com.kw.entity.Solved;
import com.kw.entity.User;
import com.kw.repository.SolvedRepository;
import com.kw.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SolvedServiceImpl implements SolvedService {

	@Autowired
	private SolvedRepository solRep;
	
	@Autowired
	private UserRepository userRep;
	
	@Override
	public List<SolvedDTO> selectSolved_user(String userId, int success) {
		
		User user = userRep.findByUserId(userId);
		
		List<Solved> sol = solRep.findListByUser(user);
		
		List<SolvedDTO> lst = new ArrayList<SolvedDTO>();
		for(Solved s : sol) {
			if(s.getSuccess() == success) {				
				SolvedDTO dto = new SolvedDTO(s.getSolvedId(), s.getProblem(), s.getSuccess());
				lst.add(dto);
			}
		}
		return lst;
	}

}
