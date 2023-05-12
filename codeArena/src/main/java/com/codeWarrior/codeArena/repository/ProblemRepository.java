package com.codeWarrior.codeArena.repository;

import com.codeWarrior.codeArena.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Integer> {

}
