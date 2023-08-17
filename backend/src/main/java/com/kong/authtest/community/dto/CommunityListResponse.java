package com.kong.authtest.community.dto;

import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.community.model.Community;
import com.kong.authtest.likes.model.CommunityLike;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommunityListResponse {
    private Long communityId;
    private String title;
    private String content;
    private String userId;
    private String taleTitle;
    private String taleImage;
    private long likeCount;
    private long commentCount;
    private long communityCount;

    public CommunityListResponse(Community community) {
        this.title = community.getTitle();
        this.communityId = community.getCommunityId();
        this.content = community.getContent().getContent();
        this.userId = community.getUser().getUserId();
        this.taleTitle = community.getTale().getTitle();
        this.taleImage = community.getTale().getTitleImage();
        this.likeCount = community.getCommunityLikeList().stream().count();
        this.commentCount = community.getCommentList().stream().map(CommentDtoResponse::new).count();

    }

    public CommunityListResponse(CommunityLike communityLike) {
        Community community = communityLike.getCommunity(); // CommunityLike 객체에서 Community 객체를 얻는다고 가정합니다.
        this.title = community.getTitle();
        this.communityId = community.getCommunityId();
        this.content = community.getContent().getContent();
        this.userId = community.getUser().getUserId();
        this.taleTitle = community.getTale().getTitle();
        this.taleImage = community.getTale().getTitleImage();
        this.likeCount = community.getCommunityLikeList().stream().count();
        this.commentCount = community.getCommentList().stream().map(CommentDtoResponse::new).count();
    }

}
