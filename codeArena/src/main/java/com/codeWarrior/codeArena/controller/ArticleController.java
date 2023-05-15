package com.codeWarrior.codeArena.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.codeWarrior.codeArena.repository.ArticleRepository;
import com.codeWarrior.codeArena.service.ArticleService;
import com.querydsl.jpa.impl.JPAQueryFactory;



@RestController
@RequestMapping("/board")
public class ArticleController {
	
	@Autowired
	private ArticleService articleService;
	
	@Autowired
	private ArticleRepository articleRepo;
	
	@Autowired
	private JPAQueryFactory jpaFactory;
	
	private final static int PAGE_COUNT=10; //한 페이지당 개수 
	private final static int BLOCK_COUNT=4; //몇개씩 번호를 뿌리는거..?

	/**
	 * 전체 검색 페이지
	 * @RequestParam(defaultValue = "1")가 없으면 now page가 null로 error 발생 
	 * (nowPage가 없을 때)페이지번호가 없을 때는 1부터 가지고 가라...
	 * 
	 * */
	@RequestMapping("/{board-id}")	
	public ResponseEntity list(final Pageable pageable) {
	
		ResponseEntity articleList = articleService.selectAll(pageable);
		return articleList;
	}
	
}














