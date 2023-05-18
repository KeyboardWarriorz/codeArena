package com.kw.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kw.dto.CommentDTO;

@Service
public interface CommentService {

	List<CommentDTO> selectComment(Long articleId);
}
