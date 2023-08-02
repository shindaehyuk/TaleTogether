package com.kong.authtest.comment.dto;

import com.kong.authtest.comment.model.Comment;
import lombok.Data;

@Data
public class CommentDtoResponse {
    private String content;
    private String userId;
    private Long commentId;

    public CommentDtoResponse(Comment comment) {
        this.content = comment.getContent().getContent();
        this.userId = comment.getUser().getUserId();
        this.commentId = comment.getCommentId();
    }
}
