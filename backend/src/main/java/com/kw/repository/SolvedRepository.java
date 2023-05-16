package com.kw.repository;

import com.kw.entity.Solved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface SolvedRepository extends JpaRepository<Solved, Integer>, QuerydslPredicateExecutor<Solved> {

}
