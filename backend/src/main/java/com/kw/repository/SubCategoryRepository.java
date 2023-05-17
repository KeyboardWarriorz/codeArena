package com.kw.repository;

import com.kw.entity.Category;
import com.kw.entity.SubCategory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer>, QuerydslPredicateExecutor<SubCategory> {

	List<SubCategory> findListByCategory(Category category);
}
