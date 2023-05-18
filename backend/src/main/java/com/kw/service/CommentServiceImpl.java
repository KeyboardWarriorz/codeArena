package com.kw.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kw.dto.CommentDTO;
import com.kw.repository.CommentRepository;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRep;
	
	
	@Override
	public List<CommentDTO> selectComment(Long articleId) {
		List<CommentDTO> commentDTOList = commentRep.selectComment(articleId);
		return commentDTOList;
	}

}
