package com.kong.authtest.likes.dto;

import com.kong.authtest.likes.model.CommunityLike;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikesResponse {

    private String userId;

    public LikesResponse(CommunityLike communityLike){
        this.userId = communityLike.getUser().getUserId();
    }


}
