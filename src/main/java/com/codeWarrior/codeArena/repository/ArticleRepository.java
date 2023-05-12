package com.codeWarrior.codeArena.repository;

import com.codeWarrior.codeArena.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

}
