package com.kw.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import com.kw.entity.Article;

public interface ArticleRepository extends JpaRepository<Article, Integer>, QuerydslPredicateExecutor<Article> {

	int pageNumber = 1;  // 1부터 시작하는 페이지 번호
	int pageSize = 1;   // 페이지 크기
	Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");  // 정렬 기준 설정 (예시로 작성한 createdAt 필드에 따라 내림차순 정렬)
	Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, sort);
	//게시글 리스트 
    @Query(value = "SELECT a FROM Article a WHERE a.board.boardId = ?1",nativeQuery = false)
     Page<Article> findByBoard_BoardIdWithPagingAndSum(Long boardId, Pageable pageable);
    
    //게시글 검색 리스트 
    @Query(value = "SELECT a FROM Article a WHERE a.title like %:keyword% or a.content like %:keyword%",nativeQuery = false)
     Page<Article> searchArticle(String keyword, Pageable pageable);
    
    //댓글 총 개수 
    @Query(value = "SELECT COUNT(a) FROM Comment a WHERE a.article.articleId = ?1", nativeQuery = false)
    Long selectCommentCount(Long articleId);
    
    //게시글 총 개수
    @Query(value = "SELECT COUNT(a) FROM Article a WHERE a.board.boardId = ?1",nativeQuery = false)
    Long selectBoardTotalCount(Long boardId);
    
    @Query(value = "SELECT a FROM Article a WHERE a.articleId = ?1",nativeQuery = false)
    Article selectArticleOne(Long articleId);
    
    
}
