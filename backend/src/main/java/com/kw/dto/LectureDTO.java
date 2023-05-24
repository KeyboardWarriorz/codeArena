package com.kw.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LectureDTO {
	private Long subcategory_id;
	private String subcategory_name;
	private String category_name;
	private String content;
}
