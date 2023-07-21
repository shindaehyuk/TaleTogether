package com.kong.authtest.community.dto;

import com.kong.authtest.community.model.Community;
import lombok.Data;

@Data
public class CommunityDtoResponse {
    private Long communityId;
    private String content;
    private Long userId;
    private String title;
    private Long taleId;
    public CommunityDtoResponse(Community community){
        this.title = community.getTitle();
        this.communityId = community.getCommunityId();
        this.content = community.getContent().getContent();
        this.userId = community.getUser().getId();
        this.taleId = community.getTale().getTaleId();
    }
}
