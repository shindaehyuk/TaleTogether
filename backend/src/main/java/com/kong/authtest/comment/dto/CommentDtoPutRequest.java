package com.kong.authtest.comment.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDtoPutRequest {
    private Long commentId;
    private String content;

}
