package com.kw.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kw.dto.ProblemDTO;
import com.kw.dto.SolvedDTO;
import com.kw.entity.Problem;
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
	
	/**
	 * 푼 문제인지 아닌지 체크
	 * */
	@Override
	public List<SolvedDTO> selectSolved_user(String userId, int success) {
		
//		User user = userRep.findByUserId(userId);
		
		List<Solved> sol = solRep.findListByUserOrderBysolvedIdDesc(userId);
		
		List<SolvedDTO> lst = new ArrayList<SolvedDTO>();
		ProblemDTO P_dto = new ProblemDTO();
		for(Solved s : sol) {
			if(lst.size() >= 6) {
				return lst;
			}
			Problem p = s.getProblem();
			int problem_type = 0;
			if(s.getSuccess() == success) {	
					// OX 문제일 경우
					if(p.getAnswer3() == null) {
						problem_type = 1;
					}
					P_dto = new ProblemDTO(p.getProblemId(),p.getTitle(),p.getQuestion(),p.getAnswerIndex(),p.getAnswer1(),p.getAnswer2(),p.getAnswer3(),p.getAnswer4(),problem_type,p.getSubcategory());
					SolvedDTO dto = new SolvedDTO(s.getSolvedId(), P_dto, s.getSuccess());
					lst.add(dto);	
				}
			}
		return lst;
		}
	}

