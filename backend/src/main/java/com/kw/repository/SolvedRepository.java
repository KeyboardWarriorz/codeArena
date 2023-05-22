package com.kw.repository;

import com.kw.entity.Solved;
import com.kw.entity.User;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;


public interface SolvedRepository extends JpaRepository<Solved, Integer>, QuerydslPredicateExecutor<Solved> {
	
	int pageNumber = 1;  // 1부터 시작하는 페이지 번호
	int pageSize = 1;   // 페이지 크기
	Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
	
	List<Solved> findListByUser(User user);
	
	@Query(value="select s from Solved s where s.user.userId=?1 order by s.solvedId DESC")
	List<Solved> findListByUserOrderBysolvedIdDesc(String userId);
	
	@Query(value="select s from Solved s where s.user.userId=?1 order by s.solvedId" ,nativeQuery = false)
	List<Solved> findListByUserOrderBysolvedIdDesc(String userId, Pageable pageable);
	
	@Query(value="select s from Solved s where s.user.userId=?1 and s.problem.subcategory.category.categoryId=?2 order by s.solvedId" ,nativeQuery = false)
	List<Solved> findListByUserOrderBysolvedIdDescWhereCate(String userId, Long categoryId, Pageable pageable);
	
	@Query(value="select count(s) from Solved s where s.user.userId=?1 and s.problem.subcategory.category.categoryId=?2 and s.success=?3" ,nativeQuery = false)
	int CountSolCate(String userId, Long categoryId, int success);
	
	
	@Query(value="select count(s) from Solved s where s.user.userId=?1 and s.success=?2" ,nativeQuery = false)
	int countSolve(String userId, int success);
	
	
	@Query(value="select s from Solved s where s.user.userId=?1 and s.problem.problemId=?2")
	Solved findProAndUser(String userId, Long problemId);

	@Query(value="select s from Solved s where s.user.userId=?1 and s.problem.problemId=?2")
	Solved findByUserAndProblem(String userId, Long problemId);
}
