package com.kong.authtest.comment.dto;

import com.kong.authtest.comment.model.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDtoRequest {
    private Long commentId;
    private String content;

    public Comment toComment(){
        return Comment.builder()
                .commentId(this.commentId)
                .content(this.content)
                .build();
    }
}
