package com.kw.repository;

import com.kw.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface CategoryRepository extends JpaRepository<Category, Long>, QuerydslPredicateExecutor<Category> {

    /**
     * 카테고리 아이디에 해당하는 내역 조회
     * */
    Category findByCategoryId(Long categoryId);
}
