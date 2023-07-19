package com.kong.authtest.comment.dto;

import com.kong.authtest.comment.model.Comment;
import lombok.Data;

@Data
public class CommentDtoResponse {
    private String content;
    public CommentDtoResponse(Comment comment){this.content = comment.getContent();}
}
