package com.kw.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kw.dto.CommentDTO;

@Service
public interface CommentService {

	List<CommentDTO> selectComment(Long articleId);
	Integer insertComment( Map<String, Object> param);
	Integer deleteComment(Long commentId);
}
