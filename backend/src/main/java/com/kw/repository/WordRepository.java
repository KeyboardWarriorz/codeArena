package com.kw.repository;

import com.kw.entity.Word;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Integer>, QuerydslPredicateExecutor<Word> {

	/**
	 * 단어에 대한 설명 가져오기
	 * */
	@Query(value="select w from Word w where w.name = ?1")
	Word selectByWordName(String name);

	/**
	 * 사용자 단어 DB에서 name에 해당하는 값이 존재하는 지 체크
	 * */
	@Query(value="select w from Word w where w.name=?1")
	Word selectByName(String name);

	@Query(value = "SELECT w FROM Word w ORDER BY FUNCTION('RAND')")
	List<Word> getRandomWords(Pageable pageable);

}
