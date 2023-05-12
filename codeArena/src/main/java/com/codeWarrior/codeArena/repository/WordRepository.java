package com.codeWarrior.codeArena.repository;

import com.codeWarrior.codeArena.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Integer> {
}
