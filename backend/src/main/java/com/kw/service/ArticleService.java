package com.kw.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kw.dto.ArticleDTO;
import com.kw.dto.ArticleListDTO;

@Service
public interface ArticleService {
	
	List<ArticleListDTO>  selectArticle(Pageable pageable,Long boardId);
	ArticleDTO selectArticleOne(Long articleId);
}
