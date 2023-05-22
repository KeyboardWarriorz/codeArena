package com.kw.service;

import com.kw.entity.Category;
import com.kw.entity.SubCategory;
import com.kw.repository.CategoryRepository;
import com.kw.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class SubCategoryServiceImpl implements SubCategoryService{
    @Autowired
    private SubCategoryRepository subCategoryRep;

    @Autowired
    private CategoryRepository categoryRep;

    /**
     * 카테고리 아이디에 해당하는 카테고리 이름 조회하기
     * */
    @Override
    public String selectCategoryName(Long categoryId){
        Category category = categoryRep.findByCategoryId(categoryId);
        if(category == null){
            return null;
        }
        return category.getCategoryName();
    }

    /**
     * 카테고리에 해당하는 강의 목록 조회하기
     * */
    @Override
    public List<Map<String, Object>> selectSubCategoryList(Long categoryId) {
        List<SubCategory> subCategory = subCategoryRep.findListByCategoryId(categoryId); //카테고리ID에 해당하는 서브 카테고리 리스트
        List<Map<String, Object>> mapList = new ArrayList<>(); //id와 name만 저장하기 위해 Map 사용

        for (int i = 0; i < subCategory.size(); i++) {
            Long subCategoryId = subCategory.get(i).getSubcategoryId();
            String subCategoryName = subCategory.get(i).getSubcategoryName();

            Map<String, Object> map = new HashMap<>();
            map.put("subcategory_id", subCategoryId);
            map.put("subcategory_name", subCategoryName);
            mapList.add(map);
        }
        return mapList;
    }

    /**
     * 개별 강의 내용 조회하기
     * */
    @Override
    public Map<String, String> selectBySubCategoryId(Long subcategoryId){
        SubCategory subCategory = subCategoryRep.findBySubcategoryId(subcategoryId);

        if(subCategory == null){
            return null;
        }
        // 1. 카테고리 이름 조회하기
        String categoryName = subCategory.getCategory().getCategoryName();
        // 2. 서브 카테고리 이름, 콘텐츠 조회하기
        String subcategoryName = subCategory.getSubcategoryName();
        String content = subCategory.getContent();

        Map<String, String> map = new HashMap<>();
        map.put("subcategory_name", subcategoryName);
        map.put("category_name", categoryName);
        map.put("content", content);

        return map;
    }
    
    /**
     * 강의 내용 Path 
     * */
    @Override
    public String selectSubcategoryPath(Long subcategoryId) {
    	SubCategory subCategory = subCategoryRep.findBySubcategoryId(subcategoryId);
    	String subPath = subCategory.getContent();
    	return subPath;
    }
    
    /**
     * SubCategory 이름 
     * */
    @Override
    public String selectSubcategoryName(Long subcategoryId) {
    	SubCategory subCategory = subCategoryRep.findBySubcategoryId(subcategoryId);
    	String subName = subCategory.getSubcategoryName();
    	return subName;
    }
    
    /**
     * SubCategory의 Category_Id
     * */
    @Override
    public Long selectSubcategoryNum(Long subcategoryId) {
    	SubCategory subCategory = subCategoryRep.findBySubcategoryId(subcategoryId);
    	Long categoryId = subCategory.getCategory().getCategoryId();
    	return categoryId;
    }
}
