package com.codeWarrior.codeArena.repository;

import com.codeWarrior.codeArena.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    User findByUserId(String userId);

    boolean existsByNickname(String nickname);

    boolean existsByuserId(String userId);
}
