package com.kong.authtest.likes.dto;

import com.kong.authtest.likes.model.CommunityLike;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LikesDtoRequest {
    private String userId;
    private Long communityId;

    public CommunityLike toLikes(){
        return CommunityLike.builder()
                .build();
    }
}
