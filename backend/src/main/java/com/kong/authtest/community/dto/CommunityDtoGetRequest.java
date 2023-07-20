package com.kong.authtest.community.dto;

import com.kong.authtest.community.model.Community;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommunityDtoGetRequest {
    private Long communityId;
    public Community toCommunity(){
        return Community.builder()
                .communityId(this.communityId)
                .build();
    }
}


// community 의 content 를 불러오는 작업

// community id