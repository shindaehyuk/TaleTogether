package com.kong.authtest.comment.dto;

import com.kong.authtest.comment.model.Comment;
import lombok.Data;

@Data
public class CommentDtoResponse {
    private String content;
    private Long userId;
    private Long commentId;
    public CommentDtoResponse(Comment comment){
        this.content = comment.getContent();
        this.userId = comment.getUser().getId();
        this.commentId = comment.getCommentId();
    }
}
