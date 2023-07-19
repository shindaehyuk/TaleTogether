package com.kong.authtest.images.dto;

import com.kong.authtest.images.model.Images;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImagesDtoRequest {
    private Long imageId;
    private String imageName;
    private int sequence;

    public Images toImages(){
        return Images.builder()
                .imageId(this.imageId)
                .imageName(this.imageName)
                .sequence(this.sequence)
                .build();
    }
}
