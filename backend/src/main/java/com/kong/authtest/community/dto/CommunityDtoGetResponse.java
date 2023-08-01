package com.kong.authtest.community.dto;

import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.community.model.Community;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CommunityDtoGetResponse {
    private long communityId;
    private String content;
    private String title;
    private List<CommentDtoResponse> commentList;
    private Long likes;

    public CommunityDtoGetResponse(Community community) {
        this.title = community.getTitle();
        this.content = community.getContent().getContent();
        this.communityId = community.getCommunityId();
        this.commentList = community.getCommentList().stream().map(CommentDtoResponse::new).collect(Collectors.toList());

    }
}
