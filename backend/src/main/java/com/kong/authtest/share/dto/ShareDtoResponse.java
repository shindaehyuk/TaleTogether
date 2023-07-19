package com.kong.authtest.share.dto;

import com.kong.authtest.share.model.Share;
import lombok.Data;

@Data
public class ShareDtoResponse {
    private String content;
    public ShareDtoResponse(Share share){this.content = share.getContent();}
}
