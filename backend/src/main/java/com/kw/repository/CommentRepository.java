package com.kw.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.kw.dto.CommentDTO;
import com.kw.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>, QuerydslPredicateExecutor<Comment> {

	
	
   
    @Query(value = "SELECT a FROM Comment a WHERE a.article.articleId = ?1 order by a.createdTime desc", nativeQuery = false)
    List<CommentDTO> selectComment(Long articleId);
  
    //댓글 총 개수 
    @Query(value = "SELECT COUNT(a) FROM Comment a WHERE a.article.articleId = ?1", nativeQuery = false)
    Long selectCommentCount(Long articleId);
    
    //findByCommentId
    Comment findByCommentId(Long commentId);
    
    void deleteByArticleArticleId(Long articleId);
    
}
