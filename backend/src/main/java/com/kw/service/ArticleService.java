package com.kw.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kw.dto.ArticleDTO;
import com.kw.dto.ArticleListDTO;


public interface ArticleService {
	
	List<ArticleListDTO>  selectArticle(Pageable pageable,Long boardId);
	ArticleDTO selectArticleOne(Long articleId);
	Long totalArticleCount(Long boardId);
	Integer insertArticle(Map<String, Object> param);
	Integer deleteArticle(Long articleId);
	List<ArticleListDTO> searchArticle(String keyword, Pageable pageable); 
	Long searchArticleCnt(String keyword);
}
