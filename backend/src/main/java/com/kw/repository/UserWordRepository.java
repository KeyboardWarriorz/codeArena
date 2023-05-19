package com.kw.repository;

import com.kw.entity.UserWord;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface UserWordRepository extends JpaRepository<UserWord, Integer>, QuerydslPredicateExecutor<UserWord> {

	@Query(value="select u from UserWord u where u.user.userId=?1 order by u.userWordId DESC")
	List<UserWord> findListOrderUser(String userId);

	/**
	 * 사용자 단어 DB에서 name에 해당하는 값이 존재하는 지 체크
	 * */
	@Query(value="select u from UserWord u where u.word.name=?1 and u.user.userId=?2")
	UserWord selectByName(String name, String userId);

	/**
	 * 사용자 아이디와 단어 아이디에 해당하는 값이 존재하는 지 체크
	 * */
	@Query(value="select u from UserWord u where u.user.userId=?1 and u.word.wordId=?2")
	UserWord findByWordAndUser(String userId, Long word);
}
