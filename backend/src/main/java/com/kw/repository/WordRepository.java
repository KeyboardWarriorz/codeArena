package com.kw.repository;

import com.kw.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface WordRepository extends JpaRepository<Word, Integer>, QuerydslPredicateExecutor<Word> {
}
