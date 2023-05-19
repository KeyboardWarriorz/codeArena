
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
    private Long articleId;
    private String title;
    private String nickname;
    private Date createdTime;
    private String boardName;
    private String content;
    private List<CommentDTO> comment;

 
    
    public ArticleDTO(Article article, List<CommentDTO> comment) {
    	if(article != null) {
        	this.articleId = article.getArticleId();
        	this.title = article.getTitle();
        	this.nickname = article.getUser().getNickname();
        	this.createdTime = article.getCreatedTime();
        	this.boardName = article.getBoard().getBoardName();
        	this.content = article.getContent();
        	this.comment = comment;
    	}
    }
    

}