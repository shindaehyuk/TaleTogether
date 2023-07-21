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
public class CommunityDtoPutRequest {

    private String title;
    @NotNull
    private String content;
    private Long communityId;
    private Long taleId;

}
