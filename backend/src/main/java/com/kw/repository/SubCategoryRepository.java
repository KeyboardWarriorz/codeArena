package com.kw.repository;

import com.kw.entity.Category;
import com.kw.entity.SubCategory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer>, QuerydslPredicateExecutor<SubCategory> {

	List<SubCategory> findListByCategory(Category category);

	/**
	 * 카테고리에 해당하는 강의 목록 조회하기
	 */
	@Query(value = "select s from SubCategory s where s.category.categoryId =?1")
	List<SubCategory> findListByCategoryId(Long categoryId);

	/**
	 * 개별 강의 내용 조회하기
	 * */
	SubCategory findBySubcategoryId(Long subcategoryId);
}
