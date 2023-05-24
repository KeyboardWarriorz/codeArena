package com.kw.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.kw.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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

	@Autowired
	private ProblemRepository proRep;

	/**
	 * 푼 문제인지 아닌지 체크
	 */
	@Override
	public List<SolvedDTO> selectSolved_user(String userId, int success) {

//		User user = userRep.findByUserId(userId);

		List<Solved> sol = solRep.findListByUserOrderBysolvedIdDesc(userId);

		List<SolvedDTO> lst = new ArrayList<SolvedDTO>();
		ProblemDTO P_dto = new ProblemDTO();
		for (Solved s : sol) {
			if (lst.size() >= 6) {
				return lst;
			}
			Problem p = s.getProblem();
			int problem_type = 0;
			if (s.getSuccess() == success) {
				// OX 문제일 경우
				if (p.getAnswer3() == null) {
					problem_type = 1;
				}
				P_dto = new ProblemDTO(p.getProblemId(), p.getTitle(), p.getQuestion(), p.getAnswerIndex(),
						p.getAnswer1(), p.getAnswer2(), p.getAnswer3(), p.getAnswer4(), problem_type,
						p.getSubcategory());
				SolvedDTO dto = new SolvedDTO(s.getSolvedId(), P_dto, s.getSuccess());
				lst.add(dto);
			}
		}
		return lst;
	}

	/**
	 * 푼 문제 가져오기
	 */
	@Override
	public List<SolvedDTO> selectSolved_user_all(String userId, int success, Pageable pageable) {

		List<Solved> sol = solRep.findListByUserOrderBysolvedIdDesc(userId, pageable);

		List<SolvedDTO> lst = new ArrayList<SolvedDTO>();
		ProblemDTO P_dto = new ProblemDTO();
		for (Solved s : sol) {
			Problem p = s.getProblem();
			int problem_type = 0;
			if (s.getSuccess() == success) {
				// OX 문제일 경우
				if (p.getAnswer3() == null) {
					problem_type = 1;
				}
				P_dto = new ProblemDTO(p.getProblemId(), p.getTitle(), p.getQuestion(), p.getAnswerIndex(),
						p.getAnswer1(), p.getAnswer2(), p.getAnswer3(), p.getAnswer4(), problem_type,
						p.getSubcategory());
				SolvedDTO dto = new SolvedDTO(s.getSolvedId(), P_dto, s.getSuccess());
				lst.add(dto);
			}
		}
		return lst;
	}

	/**
	 * 카테고리별 맞은 문제 가져오기
	 */
	@Override
	public List<SolvedDTO> selectSolved_user_all_cate(String userId, int success, String category_id, Pageable pageable) {

		List<Solved> sol = solRep.findListByUserOrderBysolvedIdDescWhereCate(userId, Long.parseLong(category_id),pageable);

		List<SolvedDTO> lst = new ArrayList<SolvedDTO>();
		ProblemDTO P_dto = new ProblemDTO();
		for (Solved s : sol) {
			Problem p = s.getProblem();
			int problem_type = 0;
			if (s.getSuccess() == success) {
				// OX 문제일 경우
				if (p.getAnswer3() == null) {
					problem_type = 1;
				}
				P_dto = new ProblemDTO(p.getProblemId(), p.getTitle(), p.getQuestion(), p.getAnswerIndex(),
						p.getAnswer1(), p.getAnswer2(), p.getAnswer3(), p.getAnswer4(), problem_type,
						p.getSubcategory());
				SolvedDTO dto = new SolvedDTO(s.getSolvedId(), P_dto, s.getSuccess());
				lst.add(dto);
			}
		}
		return lst;
	}

	@Override
	public int countSol(String userId, int success) {
		return solRep.countSolve(userId, success);
	}

	@Override
	public int countSolCate(String userId, String cateId, int success) {
		return solRep.CountSolCate(userId,Long.parseLong(cateId), success);
	}

	/**
	 * Solved DB에 userId와 problemId에 해당하는 튜플이 존재하는 지 확인
	 * */
	@Override
	public boolean checkSolved(String userId, Long problemId){
		Solved solved = solRep.findByUserAndProblem(userId, problemId);
		if (solved == null) {
			return false;
		}
		return true;
	}
	/**
	 * Solved DB에 등록하기
	 * */
	@Override
	public void insertSolved(String userId, Long problemId, Integer success){
		User user = userRep.findByUserId(userId);
		Problem problem = proRep.findByProblemId(problemId);
		Solved solved = new Solved(null, user, problem, success);
		solRep.save(solved);
	}

	/**
	 * Success 값 업데이트
	 * */
	@Override
	public boolean updateSuccess(String userId, Long problemId, Integer success){
		Solved solved = solRep.findByUserAndProblem(userId, problemId);
		if(solved.getSuccess() == 2 && success == 1){ //getSuccess()가 fail일 때, 정답을 맞췄다면
			solved.setSuccess(success); //값 변경
			solRep.save(solved);
			return true;
		}
		return false;
	}

}
