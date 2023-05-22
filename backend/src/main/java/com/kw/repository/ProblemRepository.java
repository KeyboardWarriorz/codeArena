package com.kw.repository;

import com.kw.entity.Problem;
import com.kw.entity.SubCategory;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProblemRepository extends JpaRepository<Problem, Integer>, QuerydslPredicateExecutor<Problem> {
	
	
	@Query(value = "SELECT a FROM Problem a ",nativeQuery = false)
	Page<Problem> findPageAll(Pageable pageable);
	
	Problem findListByProblemId(Long problemId);
	
	@Query(value="SELECT p FROM Problem p JOIN SubCategory sc ON p.subcategory.subcategoryId = sc.subcategoryId JOIN Category c ON sc.category.categoryId = c.categoryId WHERE c.categoryId = ?1",nativeQuery = false)
	Page<Problem> findListByProByCate(Long categoryId, Pageable pageable);
	
	@Query(value = "SELECT a FROM Problem a WHERE a.problemId = ?1",nativeQuery = false)
	Page<Problem> findListByProblemId(Long problemId, Pageable pageable);
	
	List<Problem> findListBySubcategory(SubCategory subcategory);
	
	@Query(value = "SELECT a FROM Problem a WHERE a.subcategory.subcategoryId = ?1",nativeQuery = false)
	Page<Problem> findListBySubcategory(Long subcategory, Pageable pageable);
	
	@Query(value = "SELECT COUNT(p) FROM Problem p JOIN SubCategory sc ON p.subcategory.subcategoryId = sc.subcategoryId JOIN Category c ON sc.category.categoryId = c.categoryId WHERE c.categoryId = ?1",nativeQuery = false)
	Integer countPro_cat(Long categoryId);
	
	@Query(value = "SELECT COUNT(a) FROM Problem a",nativeQuery = false)
	Integer countPro();
}
