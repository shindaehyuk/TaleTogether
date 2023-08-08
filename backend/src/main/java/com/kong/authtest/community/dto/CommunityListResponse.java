package com.kong.authtest.community.dto;

import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.community.model.Community;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
