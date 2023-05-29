package com.kw.dto;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.kw.entity.Article;

import lombok.Getter;

@Getter
public class ArticleListDTO {
    private Long articleId;
    private String title;
    private String nickname;
    private Date createdTime;
    private String boardName;
    private String content;
    private Long totalComment;
    private String profile_image;
    private String userId;
    private String tier;

    
    public ArticleListDTO(Article article, Long totalComment, String tier) {
    	if(article != null) {
        	this.articleId = article.getArticleId();
        	this.title = article.getTitle();
        	this.nickname = article.getUser().getNickname();
        	this.createdTime = article.getCreatedTime();
        	this.boardName = article.getBoard().getBoardName();
        	this.content = article.getContent();
        	this.profile_image = article.getUser().getProfileImage();
        	this.userId = article.getUser().getUserId();
        	this.totalComment = totalComment;
            this.tier = tier;
    	}
    }


	public static ArticleListDTO convertToDTO(Article article, Long totalComment, String tier) {
        return new ArticleListDTO(article, totalComment, tier);
    }
}