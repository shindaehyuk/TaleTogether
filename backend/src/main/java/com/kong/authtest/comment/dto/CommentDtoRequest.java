package com.kong.authtest.comment.dto;

import com.kong.authtest.comment.model.Comment;
import com.kong.authtest.common.commonValidation.Content;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDtoRequest {
    private String content;
    private Long commuinityId;
    private Long userId;

    public Comment toComment(){
        return Comment.builder()
                .content(new Content(this.content))
                .build();
    }
}
