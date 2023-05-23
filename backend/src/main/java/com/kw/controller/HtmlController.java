package com.kw.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.kw.dto.LectureDTO;
import com.kw.service.SubCategoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequiredArgsConstructor
public class HtmlController {

    private final SubCategoryService subService;

    @GetMapping("/lecture/{subcategory_id}")
    public ResponseEntity<?> getHtmlContent(@PathVariable("subcategory_id") Long subcategory_id) throws IOException {

        if(!subService.CheckSubCate(subcategory_id)) {
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("강의 조회 실패");
        }
        Resource resource = new ClassPathResource(subService.selectSubcategoryPath(subcategory_id));
        String sub_name = subService.selectSubcategoryName(subcategory_id);
        String category_name = subService.selectCategoryName(subService.selectSubcategoryNum(subcategory_id));
        String path = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        LectureDTO dto = new LectureDTO(sub_name,category_name,path);
        return new ResponseEntity(dto, HttpStatus.OK);
    }
}