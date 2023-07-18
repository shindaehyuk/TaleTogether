package com.kong.authtest.comment.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDtoRequest {
    private Long commentId;
    private String content;
    private Long shareId;
}
