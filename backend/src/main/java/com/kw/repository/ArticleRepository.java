package com.kw.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;


import com.kw.entity.Article;
import com.kw.entity.User;

public interface ArticleRepository extends JpaRepository<Article, Integer>, QuerydslPredicateExecutor<Article> {

	int pageNumber = 1;  // 1부터 시작하는 페이지 번호
	int pageSize = 10;   // 페이지 크기
	Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

	//게시글 리스트 
    @Query(value = "SELECT a FROM Article a WHERE a.board.boardId = ?1",nativeQuery = false)
     Page<Article> findByBoard_BoardIdWithPagingAndSum(Long boardId, Pageable pageable);
    
    //댓글 총 개수 
    @Query(value = "SELECT COUNT(a) FROM Comment a WHERE a.article.articleId = ?1", nativeQuery = false)
    Long selectCommentCount(Long articleId);
    
    //게시글 총 개수
    @Query(value = "SELECT COUNT(a) FROM Article a WHERE a.board.boardId = ?1",nativeQuery = false)
    Long selectBoardTotalCount(Long boardId);
    
    @Query(value = "SELECT a FROM Article a WHERE a.articleId = ?1",nativeQuery = false)
    Article selectArticleOne(Long articleId);
    
    
}
