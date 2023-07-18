package com.kong.authtest.share.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShareDtoRequest {
    private Long shareId;
    private String content;
}
