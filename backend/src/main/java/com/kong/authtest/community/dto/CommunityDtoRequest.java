package com.kong.authtest.community.dto;

import com.kong.authtest.community.model.Community;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommunityDtoRequest {
    private String content;
    private Long userId;

    public Community toCommunity(){
        return Community.builder()
                .content(this.content)
                .build();
    }
}
