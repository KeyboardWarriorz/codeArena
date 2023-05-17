package com.kw.repository;

import com.kw.dto.SolvedDTO;
import com.kw.entity.Solved;
import com.kw.entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface SolvedRepository extends JpaRepository<Solved, Integer>, QuerydslPredicateExecutor<Solved> {
	
	List<Solved> findListByUser(User user);
	
}
