package com.kong.authtest.comment.dto;

import com.kong.authtest.comment.model.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDtoRequest {
    private String content;
    private Long shareId;
    private Long userId;

    public Comment toComment(){
        return Comment.builder()
                .content(this.content)
                .build();
    }
}
