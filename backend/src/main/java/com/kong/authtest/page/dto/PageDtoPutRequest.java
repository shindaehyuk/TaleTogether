package com.kong.authtest.page.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageDtoPutRequest {
    private String content;
    private String image;
    private int sequence;
    private Long pageId;
}
