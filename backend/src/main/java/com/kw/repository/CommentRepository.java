package com.kw.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.kw.dto.CommentDTO;
import com.kw.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>, QuerydslPredicateExecutor<Comment> {

	
	
    //댓글 총 개수 
    @Query(value = "SELECT a FROM Comment a WHERE a.article.articleId = ?1", nativeQuery = false)
    List<CommentDTO> selectComment(Long articleId);
 
}
