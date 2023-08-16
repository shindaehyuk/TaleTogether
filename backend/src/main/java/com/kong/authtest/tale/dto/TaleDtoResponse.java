package com.kong.authtest.tale.dto;

import com.kong.authtest.tale.model.Tale;
import lombok.Data;

@Data
public class TaleDtoResponse {
    private Long taleId;

    private String title;

    private String titleImage;


    public TaleDtoResponse(Tale tale) {
        this.taleId = tale.getTaleId();
        this.title = tale.getTitle();
        this.titleImage = tale.getTitleImage();
    }
}
