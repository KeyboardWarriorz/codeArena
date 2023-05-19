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

    
    public ArticleListDTO(Article article) {
    	if(article != null) {
        	this.articleId = article.getArticleId();
        	this.title = article.getTitle();
        	this.nickname = article.getUser().getNickname();
        	this.createdTime = article.getCreatedTime();
        	this.boardName = article.getBoard().getBoardName();
        	this.content = article.getContent();
    	}
    }

    public ArticleListDTO(Article article,Long totalComment) {
    	this(article);
    	this.totalComment = totalComment;
    }

	

	public static ArticleListDTO convertToDTO(Article article, Long totalComment) {
        return new ArticleListDTO(article, totalComment);
    }
}