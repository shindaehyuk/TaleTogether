package com.kong.authtest.tale.dto;

import com.kong.authtest.tale.model.Tale;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaleDtoRequest {
    private String userId;

    private String title;

    private String titleImage;

    public Tale toTale() {
        return Tale.builder()
                .title(this.title)
                .titleImage(this.titleImage)
                .build();
    }
}
