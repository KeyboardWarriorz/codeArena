package com.kw.dto;

import com.kw.entity.Comment;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class CommentDTO {
	private Long commentId;
	private String content;
	private String nickName;
	private String profile_image;
	private String user_id;

	
	public CommentDTO(Comment comment) {
		this.commentId = comment.getCommentId();
		this.content = comment.getContent();
		this.nickName = comment.getUser().getNickname();
		this.profile_image = comment.getUser().getProfileImage();
		this.user_id = comment.getUser().getUserId();

	}
	

	
	
	
}
