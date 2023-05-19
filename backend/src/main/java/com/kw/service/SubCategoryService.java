package com.kw.service;

import java.util.List;
import java.util.Map;

public interface SubCategoryService {
    /**
     * 카테고리 아이디에 해당하는 카테고리 이름 조회하기
     * */
    String selectCategoryName(Long categoryId);

    /**
     * 카테고리에 해당하는 강의 목록 조회하기
     * */
    List<Map<String, Object>> selectSubCategoryList(Long categoryId);

    /**
     * 개별 강의 내용 조회하기
     * */
    Map<String, String> selectBySubCategoryId(Long subcategoryId);


}
