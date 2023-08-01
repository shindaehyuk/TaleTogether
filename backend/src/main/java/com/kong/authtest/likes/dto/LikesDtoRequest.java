package com.kong.authtest.likes.dto;

import com.kong.authtest.likes.model.Likes;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.parameters.P;

@Data
@NoArgsConstructor
public class LikesDtoRequest {
    private String userId;
    private Long communityId;

    public Likes toLikes(){
        return Likes.builder()
                .build();
    }
}
