package com.kw.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kw.dto.ArticleDTO;
import com.kw.dto.ArticleListDTO;
import com.kw.dto.CommentDTO;
import com.kw.entity.Article;
import com.kw.repository.ArticleRepository;
import com.kw.repository.CommentRepository;

@Service
@Transactional
public class ArticleServiceImpl implements ArticleService{


	
	@Autowired
	private ArticleRepository articleRep;
	
	@Autowired
	private CommentRepository commentRep;
	
	
	
	@Override
	public List<ArticleListDTO> selectArticle(Pageable pageable,Long boardId) {
		Page<Article> articlePageList = articleRep.findByBoard_BoardIdWithPagingAndSum(boardId, pageable);
		List<ArticleListDTO> articleDTOList = new ArrayList<>();
		
				
		for(Article article : articlePageList) {
			Long articleId = article.getArticleId();
			Long CommentTotal = articleRep.selectCommentCount(articleId);
			ArticleListDTO articleDTO = ArticleListDTO.convertToDTO(article, CommentTotal);
			articleDTOList.add(articleDTO);
		}
		return articleDTOList;
	}

	

	@Override
	public ArticleDTO selectArticleOne(Long articleId) {
		Article articleOne = articleRep.selectArticleOne(articleId);
		List<CommentDTO> comment = commentRep.selectComment(articleId);

		return new ArticleDTO(articleOne,comment);
	}



	@Override
	public Long totalArticleCount(Long boardId) {
		Long totalArticle = articleRep.selectBoardTotalCount(boardId);
		return totalArticle;
	}
	
	

}
