package com.kw.repository;

import com.kw.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ArticleRepository extends JpaRepository<Article, Integer>, QuerydslPredicateExecutor<Article> {

}
