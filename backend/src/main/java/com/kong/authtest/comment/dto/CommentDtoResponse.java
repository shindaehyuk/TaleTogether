package com.kong.authtest.comment.dto;

import com.kong.authtest.comment.model.Comment;
import lombok.Data;

@Data
public class CommentDtoResponse {
    private String content;
    private String userId;
    private String userName;
    private Long commentId;

    public CommentDtoResponse(Comment comment) {
        this.content = comment.getContent().getContent();
        this.userId = comment.getUser().getUserId();
        this.userName = comment.getUser().getName();
        this.commentId = comment.getCommentId();
    }
}
