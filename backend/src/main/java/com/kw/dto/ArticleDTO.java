
package com.kw.dto;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.kw.entity.Article;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ArticleDTO {
    private Long article_id;
    private String title;
    private String nickname;
    private Date createdTime;
    private String boardName;
    private String content;
    private String user_id;
    private String profile_image;
    private Long commentTotal;
    private List<CommentDTO> comment;

 
    
    public ArticleDTO(Article article, List<CommentDTO> comment, Long commentTotal) {
    	if(article != null) {
        	this.article_id = article.getArticleId();
        	this.title = article.getTitle();
        	this.nickname = article.getUser().getNickname();
        	this.createdTime = article.getCreatedTime();
        	this.boardName = article.getBoard().getBoardName();
        	this.content = article.getContent();
        	this.profile_image = article.getUser().getProfileImage();
        	this.user_id = article.getUser().getUserId();
        	this.comment = comment;
        	this.commentTotal = commentTotal;
    	}
    }
    

}