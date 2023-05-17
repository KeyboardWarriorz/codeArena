package com.kw.repository;

import com.kw.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface WordRepository extends JpaRepository<Word, Integer>, QuerydslPredicateExecutor<Word> {

	/**
	 * 단어에 대한 설명 가져오기 
	 * */
	@Query(value="select w from Word w where w.name = ?1")
	Word selectByName(String name);

}
