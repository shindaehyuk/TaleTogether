package com.kong.authtest.community.dto;

import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.community.model.Community;
import com.kong.authtest.likes.dto.LikesResponse;
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

    private List<LikesResponse> likesList;
    private Long taleId;
    private String taleTitle;
    private String taleTitleImage;
    private String userId;
    public CommunityDtoGetResponse(Community community) {
        this.title = community.getTitle();
        this.content = community.getContent().getContent();
        this.communityId = community.getCommunityId();
        this.commentList = community.getCommentList().stream().map(CommentDtoResponse::new).collect(Collectors.toList());
        this.likes = community.getCommunityLikeList().stream().count();
        this.likesList = community.getCommunityLikeList()
                .stream()
                .map(LikesResponse::new)
                .collect(Collectors.toList());
        this.taleId = community.getTale().getTaleId();
        this.taleTitle = community.getTale().getTitle();
        this.taleTitleImage = community.getTale().getTitleImage();
        this.userId = community.getUser().getUserId();
    }
}