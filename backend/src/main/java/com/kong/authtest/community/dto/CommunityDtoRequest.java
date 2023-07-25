package com.kong.authtest.community.dto;

import com.kong.authtest.common.commonValidation.Content;
import com.kong.authtest.community.model.Community;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Data
@NoArgsConstructor
@Validated
public class CommunityDtoRequest {

    private String title;
    @NotNull
    private String content;
    private Long userId;
    private Long taleId;


    public Community toCommunity(){
        return Community.builder()
                .title(this.title)
                .content(new Content(this.content))
                .build();
    }
}
