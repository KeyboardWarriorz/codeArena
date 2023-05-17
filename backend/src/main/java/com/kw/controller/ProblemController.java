package com.kw.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kw.dto.ProblemDTO;
import com.kw.service.ProblemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProblemController {
	
	private final ProblemService proservice;
	
	
	@GetMapping("/ProblemSet")
	public ResponseEntity<?> selectAllQ(HttpServletRequest req){
		int page = Integer.parseInt(req.getParameter("page"));
		List<ProblemDTO> data = new ArrayList<ProblemDTO>();
		if (req.getParameter("category_id") == null){			
			data = proservice.select_pro();
		}else {
			System.out.println("cate = " +  req.getParameter("category_id"));
			data = proservice.select_pro_category(Long.parseLong(req.getParameter("category_id")));

		}
		
		return new ResponseEntity(data,HttpStatus.OK);
	}
	

}
