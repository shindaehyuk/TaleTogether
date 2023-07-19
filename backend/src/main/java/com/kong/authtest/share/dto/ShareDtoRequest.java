package com.kong.authtest.share.dto;

import com.kong.authtest.share.model.Share;
import com.kong.authtest.tale.model.Tale;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShareDtoRequest {
    private Long shareId;
    private String content;

    public Share toShare(){
        return Share.builder()
                .shareId(this.shareId)
                .content(this.content)
                .build();
    }
}
