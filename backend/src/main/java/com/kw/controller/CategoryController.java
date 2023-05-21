package com.kw.controller;

import com.kw.service.SubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    private final SubCategoryService subCategoryService;

    /**
     * 카테고리에 해당하는 강의 목록 조회하기
     * status 201 : "강의 목록 조회 성공"
     * */
    @GetMapping("/{category_id}")
    public ResponseEntity<?> selectById(@PathVariable("category_id") Long categoryId){
        Map<String, Object> response = new HashMap<>();

        // 1. 카테고리 아이디에 해당하는 카테고리 이름 조회
        String categoryName = subCategoryService.selectCategoryName(categoryId);

        if(categoryName == null){ // 2. 강의 카테고리가 존재하지 않을 때
            return ResponseEntity.status(401).body("강의 카테고리 조회 실패");
        } else{
            // 3. 카테고리 아이디에 해당하는 서브 카테고리 조회
            List<Map<String, Object>> subCategorylist = subCategoryService.selectSubCategoryList(categoryId);

            if(subCategorylist != null){ // 4-1. 해당하는 내용이 있을 때
                Map<String, Object> data = new HashMap<>();
                data.put("category_name", categoryName);
                data.put("subcategory", subCategorylist);
                response.put("data", data);
                response.put("statusCode", 200);
                response.put("message", "강의 목록 조회 성공");
            } else{ // 4-2. 해당하는 내용이 없을 떄
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("강의 목록 조회 실패");
            }
        }
        return ResponseEntity.ok(response);
    }

}
