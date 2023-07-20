package com.kong.authtest.community.dto;

import com.kong.authtest.community.model.Community;
import lombok.Data;

@Data
public class CommunityDtoResponse {
    private Long communityId;
    private String content;
    private Long userId;
    public CommunityDtoResponse(Community community){
//        this.communityId = community.getCommunityId();
        this.content = community.getContent();
        this.userId = community.getUser().getId();
    }
}
