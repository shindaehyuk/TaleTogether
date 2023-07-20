package com.kong.authtest.community.dto;

import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.community.model.Community;
import lombok.Data;

import java.util.List;

@Data
public class CommunityDtoGetResponse {
    private long communityId;
    private String content;
    private List<CommentDtoResponse> commentList;

    public CommunityDtoGetResponse(Community community){
        this.content = community.getContent();
        this.communityId = community.getCommunityId();
    }
}
