package com.kw.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kw.entity.Comment;
import com.kw.service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController{
	
	@Autowired
	CommentService commentservice;
	
	@PostMapping()
	public ResponseEntity<?> insertComment(@RequestBody Map<String, Object> param){
		Map<String, Object> response = new HashMap<String, Object>();
		
		Integer code = commentservice.insertComment(param);
		if(code == 1) {
			response.put("statusCode", 201);
			response.put("message", "댓글 등록 성공");
		}
		else {
			response.put("statusCode", 500);
			response.put("message", "댓글 등록 실패");
		}
		
		return ResponseEntity.ok(response);
		
		
	}
	
	@DeleteMapping("/delete/{comment-id}")
	public ResponseEntity<?> deleteComment(@PathVariable("comment-id") Long commentId){
		Map<String, Object> response = new HashMap<String, Object>();
		
		Integer code = commentservice.deleteComment(commentId);
		
		if(code == 1) {
			response.put("statusCode", 204);
			response.put("message", "댓글 삭제 성공");
		}
		else {
			response.put("statusCode", 500);
			response.put("message", "댓글 삭제 실패");
		}
		
		return ResponseEntity.ok(response);
		
		
	}
}