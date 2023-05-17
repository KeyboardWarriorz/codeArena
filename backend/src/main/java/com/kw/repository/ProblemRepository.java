package com.kw.repository;

import com.kw.dto.ProblemDTO;
import com.kw.entity.Problem;
import com.kw.entity.Solved;
import com.kw.entity.SubCategory;
import com.kw.entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface ProblemRepository extends JpaRepository<Problem, Integer>, QuerydslPredicateExecutor<Problem> {
	
	List<Problem> findListByProblemId(String probleId);
	
	List<Problem> findListBySubcategory(SubCategory subcategory);
	
}
