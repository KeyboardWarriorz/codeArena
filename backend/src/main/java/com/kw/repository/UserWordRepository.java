package com.kw.repository;

import com.kw.entity.User;
import com.kw.entity.UserWord;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface UserWordRepository extends JpaRepository<UserWord, Integer>, QuerydslPredicateExecutor<UserWord> {
	
	@Query(value="select u from UserWord u where u.user.userId=?1 order by u.userWordId DESC")
	List<UserWord> findListOrderUser(String userId);
}
