package com.kw.repository;

import com.kw.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer>, QuerydslPredicateExecutor<SubCategory> {
}
