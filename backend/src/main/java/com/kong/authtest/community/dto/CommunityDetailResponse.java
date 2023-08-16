package com.kong.authtest.community.dto;


import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.community.model.Community;
import com.kong.authtest.likes.model.CommunityLike;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
public class CommunityDetailResponse {

    private Long communityId;

    private String title;

    private String content;

    private Long taleId;
    private long likeCount;
    private long commentCount;

    public CommunityDetailResponse(Community community) {
        this.communityId = community.getCommunityId();
        this.title = community.getTitle();
        this.content = community.getContent().getContent();
        this.taleId = community.getTale().getTaleId();
        this.likeCount = community.getCommunityLikeList().stream().count();
        this.commentCount = community.getCommentList().stream().map(CommentDtoResponse::new).count();
    }


    public CommunityDetailResponse(CommunityLike communityLike) {
        Community community = communityLike.getCommunity();
        this.communityId = community.getCommunityId();
        this.title = community.getTitle();
        this.content = community.getContent().getContent();
        this.taleId = community.getTale().getTaleId();
    }
}
