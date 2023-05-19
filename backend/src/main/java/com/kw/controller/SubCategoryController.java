package com.kw.controller;

import com.kw.service.SubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/subcategory")
@RequiredArgsConstructor
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    /**
     * 개별 강의 내용 조회하기
     * status: 200 "강의 조회 성공"
     * */
    @GetMapping("/{subcategory_id}")
    public ResponseEntity<?> selectById(@PathVariable("subcategory_id") Long subcategoryId){
        Map<String, Object> response = new HashMap<>();
        // 1. 서브카테고리 아이디에 해당하는 내용 조회하기
        Map<String, String> data = subCategoryService.selectBySubCategoryId(subcategoryId);

        if(data != null){ // 2-1. 해당 내용이 있을 때
            response.put("statusCode", 200);
            response.put("message", "강의 조회 성공");
            response.put("data", data);
        } else{  // 2-2. 해당 내용이 없을 때
            response.put("status", 500);
        }
        return ResponseEntity.ok(response);
    }
}
