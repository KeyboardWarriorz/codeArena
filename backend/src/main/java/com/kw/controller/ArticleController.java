package com.kw.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kw.dto.ArticleDTO;
import com.kw.dto.ArticleListDTO;
import com.kw.service.ArticleService;

@RestController
@RequestMapping("/article")
public class ArticleController {
	
	@Autowired
	private ArticleService articleService;
	
	//게시글 목록 조회
	@RequestMapping("/articleList/{board-id}")
	public ResponseEntity<?> selectArticleAll(@PathVariable("board-id") Long boardId, Pageable pageable){
		
		Map<String, Object> response = new HashMap<>();
		List<ArticleListDTO> articleList = articleService.selectArticle(pageable,boardId );
		Long articleCnt = articleService.totalArticleCount(boardId);
				
		if(articleList.size() == 0) {	
			response.put("message", "게시판 글 리스트 조회 실패 " );
			response.put("statusCode", 500);
			
		}
		else {
			response.put("statusCode", 200);
			response.put("message", "게시판 글 리스트 조회 성공" );
			Map<String, Object> data = new HashMap<>();
	        data.put("articleList", articleList);
	        data.put("totalArticle", articleCnt);
	        response.put("data", data);
	        
		}
		return ResponseEntity.ok(response);
	}
	
	//게시글 상세조회 
	@RequestMapping("/detail/{article-id}")
	public ResponseEntity<?> selectArticleOne(@PathVariable("article-id") Long articleId){
		
		Map<String, Object> response = new HashMap<>();
		ArticleDTO article = articleService.selectArticleOne(articleId);
	
		System.out.println(article.toString());
		
		if(article.getArticleId() != null) {	
			response.put("statusCode", 200);
			response.put("message", "게시물 상세 조회 성공" );
	        response.put("data", article);

		}
		else {
			response.put("message", "게시물 상세 조회 실패" );
			response.put("statusCode", 500);
	        
		}	
		return ResponseEntity.ok(response);

	}
	
	
	@PostMapping()
	public ResponseEntity<?> insertArticle(@RequestBody Map<String, Object> param){
		
		Integer code = articleService.insertArticle(param);
		Map<String, Object> response = new HashMap<>();
		
		if(code == 1) {
			response.put("statusCode", 201);
			response.put("message", "게시물 생성 성공");
		}
		else {
			response.put("statusCode", 500 );
			response.put("message", "게시물 생성 실패");
		}
		return ResponseEntity.ok(response);

	}
	
	
	@DeleteMapping("/delete/{article-id}")
	public ResponseEntity<?> deleteArticle(@PathVariable("article-id") Long articleId){
		Map<String, Object> response = new HashMap<String, Object>();
		Integer code = articleService.deleteArticle(articleId);
		
		if(code == 1) {
			response.put("statusCode", 204);
			response.put("message", "게시물 삭제 성공");
		}
		else {
			response.put("statusCode", 500);
			response.put("message", "게시물 삭제 실패");
		}
		return ResponseEntity.ok(response);
	}
	
	
	
}
