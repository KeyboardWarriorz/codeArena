package com.kw.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.kw.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kw.dto.ArticleDTO;
import com.kw.dto.ArticleListDTO;
import com.kw.dto.CommentDTO;
import com.kw.entity.Article;
import com.kw.entity.Board;
import com.kw.entity.User;

@Service
@Transactional
public class ArticleServiceImpl implements ArticleService{


	@Autowired
	private ArticleRepository articleRep;
	@Autowired
	private CommentRepository commentRep;
	@Autowired
	private UserRepository userRep;
	@Autowired
	private BoardRepository boardRep;
	@Autowired
	private UserService userService;

	@Override
	public List<ArticleListDTO> selectArticle(Pageable pageable,Long boardId) {
		Page<Article> articlePageList = articleRep.findByBoard_BoardIdWithPagingAndSum(boardId, pageable);
		List<ArticleListDTO> articleDTOList = new ArrayList<>();


		for(Article article : articlePageList) {
			Long articleId = article.getArticleId();
			Long CommentTotal = commentRep.selectCommentCount(articleId);
			String tier = userService.getTier(article.getUser().getPoint()) ;
			ArticleListDTO articleDTO = ArticleListDTO.convertToDTO(article, CommentTotal, tier);
			System.out.println(articleDTO);
			articleDTOList.add(articleDTO);
		}
		return articleDTOList;
	}


	//게시글 상세조회
	@Override
	public ArticleDTO selectArticleOne(Long articleId) {
		Article articleOne = articleRep.selectArticleOne(articleId);
		List<CommentDTO> comment = commentRep.selectComment(articleId);
		for (CommentDTO commentDTO : comment) {
			commentDTO.setTier(userService.getTier(userRep.findByUserId(commentDTO.getUser_id()).getPoint()));
		}
		Long CommentCnt = commentRep.selectCommentCount(articleId);
		String tier = userService.getTier(articleOne.getUser().getPoint());
		return new ArticleDTO(articleOne,comment,CommentCnt, tier);
	}


	@Override
	public Long totalArticleCount(Long boardId) {
		Long totalArticle = articleRep.selectBoardTotalCount(boardId);
		return totalArticle;
	}

	@Override
	public Integer insertArticle( Map<String, Object> param) {
		Integer code = 1;
		Board board = boardRep.findByBoardId(Long.valueOf(String.valueOf(param.get("board_id"))));
		User user = userRep.findByUserId((String)param.get("user_id"));

		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);

		Date truncatedDate = calendar.getTime();

		Article article =
				new Article(null,
						user, board, (String)param.get("title")
						, (String)param.get("content"),
						truncatedDate);

		if(article != null) {

			articleRep.save(article);
			return code;
		} else {
			code = 0;
			return code;
		}

	}


	@Override
	public Integer deleteArticle(Long articleId) {
		Integer code = 1;
		Article article = articleRep.selectArticleOne(articleId);

		if(article != null) {
			commentRep.deleteByArticleArticleId(articleId);
			articleRep.delete(article);
		} else {
			code = 0;
		}
		return code;
	}

	@Override
	public List<ArticleListDTO> searchArticle(String keyword, Pageable pageable) {

		Page<Article> articlePageList = articleRep.findByContentContainingOrTitleContaining(keyword,keyword, pageable);
		List<ArticleListDTO> articleDTOList = new ArrayList<>();

		for(Article article : articlePageList) {
			Long articleId = article.getArticleId();
			Long CommentTotal = commentRep.selectCommentCount(articleId);
			String tier = userService.getTier(article.getUser().getPoint());
			ArticleListDTO articleDTO = ArticleListDTO.convertToDTO(article, CommentTotal, tier);
			articleDTOList.add(articleDTO);
		}
		return articleDTOList;
	}

	@Override
	public Long searchArticleCnt(String keyword) {
		Long count = articleRep.searchArticleCnt(keyword);
		return count;
	}

}
