package com.kong.authtest.images.dto;

import com.kong.authtest.images.model.Images;
import lombok.Data;

@Data
public class ImagesDtoResponse {
    private String imageName;
    private int sequence;

    public ImagesDtoResponse(Images images){
        this.imageName = images.getImageName();
        this.sequence = images.getSequence();
    }
}
