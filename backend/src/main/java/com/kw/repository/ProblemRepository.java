package com.kw.repository;

import com.kw.entity.Problem;
import com.kw.entity.SubCategory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProblemRepository extends JpaRepository<Problem, Integer>, QuerydslPredicateExecutor<Problem> {
	
	List<Problem> findListByProblemId(Long problemId);
	
	List<Problem> findListBySubcategory(SubCategory subcategory);
	
}
