package com.kw.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.kw.dto.ProblemDTO;
import com.kw.entity.Problem;
import com.kw.service.ProblemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProblemController {
	
	private final ProblemService proservice;
	
	
	@GetMapping("/ProblemSet/{userId}")
	public ResponseEntity<?> selectAllQ(HttpServletRequest req, @PathVariable("userId") String userId){
//		int page = Integer.parseInt(req.getParameter("page"));
		List<ProblemDTO> data = new ArrayList<ProblemDTO>();
		if (req.getParameter("category_id") == null){			
			data = proservice.select_pro_All(userId);
		}else {
			data = proservice.select_pro_category_user(userId, Long.parseLong(req.getParameter("category_id")));
		}
		
		return new ResponseEntity(data,HttpStatus.OK);
	}
	
	@GetMapping("/Problem/{problemId}")
	public ResponseEntity<?> OnePro(@PathVariable("problemId") String problemId) {

		ProblemDTO pro = proservice.select_pro(problemId);
		
		return new ResponseEntity(pro, HttpStatus.OK);
	}
}
