package com.kw.controller;

import com.kw.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    /**
     * 카테고리에 해당하는 강의 목록 조회하기
     * status 201 : "강의 목록 조회 성공"
     * */
    @GetMapping("/{categoryId}")
    public ResponseEntity<?> selectById(@PathVariable("categoryId") Long categoryId){
        Map<String, Object> response = new HashMap<>();

        // 1. 카테고리 아이디에 해당하는 카테고리 이름 조회
        String categoryName = categoryService.selectNameById(categoryId);

        // 2. 카테고리 아이디에 해당하는 서브 카테고리 조회
        List<Map<String, Object>> subCategorylist = categoryService.selectById(categoryId);

        if(subCategorylist != null){ // 3-1. 해당하는 내용이 있을 때
            response.put("statusCode", 200);
            response.put("message", "강의 목록 조회 성공");
            Map<String, Object> data = new HashMap<>();
            data.put("category_name", categoryName);
            data.put("subcategory", subCategorylist);
            response.put("data", data);
        } else{ // 3-2. 해당하는 내용이 없을 떄
            response.put("status", 500);
        }
        return ResponseEntity.ok(response);
    }



}
