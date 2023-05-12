package com.codeWarrior.codeArena.repository;

import com.codeWarrior.codeArena.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
