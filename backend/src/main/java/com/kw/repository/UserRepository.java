package com.kw.repository;

import com.kw.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String>, QuerydslPredicateExecutor<User> {

    User findByUserId(String userId);

    boolean existsByNickname(String nickname);

    boolean existsByuserId(String userId);

    @Query("SELECT COUNT(u) FROM User u WHERE u.point > (SELECT u2.point FROM User u2 WHERE u2.userId = :userId)")
    Long getUserRank(@Param("userId") String userId);

    @Query("SELECT u FROM User u ORDER BY u.point DESC")
    List<User> getUsersByRank();
}
