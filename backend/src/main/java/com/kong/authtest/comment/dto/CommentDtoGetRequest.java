package com.kong.authtest.comment.dto;

import com.kong.authtest.comment.model.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDtoGetRequest {
    private Long commentId;

    public Comment toComment() {
        return Comment.builder()
                .commentId(this.commentId)
                .build();
    }
}
