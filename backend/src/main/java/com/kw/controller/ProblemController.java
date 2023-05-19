package com.kw.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.kw.dto.ProblemDTO;
import com.kw.service.ProblemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProblemController {
	
	private final ProblemService proservice;
	
	
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
	
	@GetMapping("/Problem/{problemId}")
	public ResponseEntity<?> OnePro(@PathVariable("problemId") String problemId) {

		ProblemDTO pro = proservice.select_pro(problemId);
		
		return new ResponseEntity(pro, HttpStatus.OK);
	}
}
