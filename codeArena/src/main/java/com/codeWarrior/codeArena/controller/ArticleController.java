package com.codeWarrior.codeArena.controller;

import java.net.http.HttpHeaders;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codeWarrior.codeArena.entity.Article;
import com.codeWarrior.codeArena.reponse.ApiResponse;
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
	
	//@Autowired
	//private JPAQueryFactory jpaFactory;
	
	private final static int PAGE_COUNT=10; //한 페이지당 개수 
	private final static int BLOCK_COUNT=4; //몇개씩 번호를 뿌리는거..?

	/**
	 * 전체 검색 페이지
	 * @RequestParam(defaultValue = "1")가 없으면 now page가 null로 error 발생 
	 * (nowPage가 없을 때)페이지번호가 없을 때는 1부터 가지고 가라...
	 * 
	 * */
	
//	@RequestMapping("/{board-id}")	
//	public ApiResponse<List<Ar>> list(final Pageable pageable) {
//		
//		List<Article> article = articleService.selectAll();
//		
//		ApiResponse<List<Article>> response = new ApiResponse<List<Article>>();
//		//return 
//		
//	}	

	
	
}














