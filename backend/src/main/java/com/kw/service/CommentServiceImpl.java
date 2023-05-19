package com.kw.service;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kw.dto.CommentDTO;
import com.kw.entity.Article;
import com.kw.entity.Comment;
import com.kw.entity.User;
import com.kw.repository.ArticleRepository;
import com.kw.repository.BoardRepository;
import com.kw.repository.CommentRepository;
import com.kw.repository.UserRepository;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRep;
	@Autowired
	private ArticleRepository articleRep;
	@Autowired
	private UserRepository userRep;

	
	@Override
	public List<CommentDTO> selectComment(Long articleId) {
		List<CommentDTO> commentDTOList = commentRep.selectComment(articleId);
		return commentDTOList;
	}

	@Override
	public Integer insertComment( Map<String, Object> param) {
		Integer code = 1;
		Date currentDate = new Date();
		currentDate.setSeconds(0);  // 초를 0으로 설정
		currentDate.setTime((currentDate.getTime() / (60 * 1000)) * (60 * 1000));  // 밀리초를 0으로 설정
		
		Long articleId = Long.parseLong(String.valueOf(param.get("article_id")));
		String userId = String.valueOf(param.get("user_id"));
		Article article = articleRep.selectArticleOne(articleId);
		User user = userRep.findByUserId(userId);
		System.out.println("user = "+ user.toString());
		
		Comment comment = new Comment(null, article, user, String.valueOf(param.get("content")), currentDate);
		
		Comment c = commentRep.save(comment);
		
		if(c != null) {
			return code;
		}
		else {
			code = 0;
			return code;
		}

	}

	@Override
	public Integer deleteComment(Long commentId) {
		Integer code = 1;
		Comment comment = commentRep.findByCommentId(commentId);
		System.out.println(comment.toString());
		if(comment != null) {
			commentRep.delete(comment);
			return code;
		}
		else {
			code = 0;
			return code;
		}
	}
}
