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
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepository categoryRep;

    @Autowired
    private SubCategoryRepository subCategoryRep;

    /**
     * 카테고리 아이디에 해당하는 카테고리 이름 조회하기
     * */
    @Override
    public String selectNameById(Long categoryId){
        Category category = categoryRep.findByCategoryId(categoryId);
        return category.getCategoryName();
    }

    /**
     * 카테고리에 해당하는 강의 목록 조회하기
     * */
    @Override
    public List<Map<String, Object>> selectById(Long categoryId) {
        List<SubCategory> subCategory = subCategoryRep.selectById(categoryId); //카테고리ID에 해당하는 서브 카테고리 리스트
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

}
