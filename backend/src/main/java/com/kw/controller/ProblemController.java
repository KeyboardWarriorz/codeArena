package com.kw.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.kw.entity.Solved;
import com.kw.service.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kw.dto.ProblemDTO;
import com.kw.dto.SolvedDTO;
import com.kw.service.ProblemService;
import com.kw.service.SolvedService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProblemController {
	private final UserService userService;
	private final ProblemService proservice;
	private final SolvedService solveservice;

	@GetMapping("/ProblemSet/{userId}")
	public ResponseEntity<?> selectAllQ(HttpServletRequest req, @PathVariable("userId") String userId, Pageable pageable){
		List<ProblemDTO> data = new ArrayList<ProblemDTO>();
		Map<String, Object> response = new HashMap<>();
		Map<String, Object> dat = new HashMap<>();
		int total = 0;
		if (req.getParameter("category_id").equals("0")){
			data = proservice.select_pro_All(userId, pageable);
			total = proservice.count_Pro();
		}else {
			data = proservice.select_pro_category_user(userId, Long.parseLong(req.getParameter("category_id")),pageable);
			total = proservice.count_Pro_cate(Long.parseLong(req.getParameter("category_id")));
		}
		dat.put("Problem",data);
		dat.put("totalProblem",total);
		response.put("data",dat);

		return new ResponseEntity(response,HttpStatus.OK);
	}

	@GetMapping("/problem/{problemId}")
	public ResponseEntity<?> OnePro(@PathVariable("problemId") String problemId) {

		ProblemDTO pro = proservice.select_pro(problemId);

		return new ResponseEntity(pro, HttpStatus.OK);
	}

	@GetMapping("/ProblemSet/{userId}/{success}")
	public ResponseEntity<?> selectSuccess(HttpServletRequest req, @PathVariable("userId") String userId,@PathVariable("success") int success, Pageable pageable){
		List<SolvedDTO> data = new ArrayList<>();
		Map<String, Object> response = new HashMap<>();
		Map<String, Object> dat = new HashMap<>();
		int total = 0;
		String Cate = req.getParameter("category_id");
		// 전체 조회
		if (Cate.equals("0")){
			data = solveservice.selectSolved_user_all(userId, success,pageable);
			total = solveservice.countSol(userId, success);
		}
		// 그 외 카테고리 지정
		else {
			data = solveservice.selectSolved_user_all_cate(userId, success,Cate,pageable);
			total = solveservice.countSolCate(userId,Cate, success);
		}
		dat.put("Problem",data);
		dat.put("totalProblem",total);
		response.put("data",dat);

		return ResponseEntity.ok(response);
	}

	/**
	 * 사용자가 푼 문제 결과와 점수를 저장하고, 누적 점수를 리턴
	 * */
	@PostMapping("/problemAnswer/{user_id}")
	public ResponseEntity<?> updatePoint(@PathVariable("user_id") String userId, @RequestBody Map<String, Object> request){
		Integer success = Integer.valueOf(request.get("success").toString());
		Long problemId = Long.valueOf(request.get("problem_id").toString());

		Map<String, Object> response = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		boolean result = false;

		try {
			// 1. Solved DB에 userId와 problemId에 해당하는 튜플 존재하는 지 확인
			Solved solved = solveservice.checkSolved(userId, problemId);

			if(solved == null){ // 2-1. 없으면 solved DB에 생성
				solveservice.insertSolved(userId, problemId, success);
				if(success == 2) result = true; //맞췄을 때
			} else{ // 2-2. 있으면 solved DB success 값 업데이트
				result = solveservice.updateSuccess(solved, success);
			}
			// 3. Users DB에서 userId에 해당하는 포인트에 추가 포인트를 더함
			if(result) {  // 포인트가 누적될 때
				userService.addUserPoint(userId, 10);
			}
			// 4. 리턴 할 누적 값
			Integer point = userService.selectPoint(userId);
			data.put("point", point);
			data.put("result", result);
			response.put("message", "답안 제출 성공");
			response.put("data", data);
		} catch (Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("답안 제출 실패");
		}
		return new ResponseEntity(response, HttpStatus.OK);
	}

}
