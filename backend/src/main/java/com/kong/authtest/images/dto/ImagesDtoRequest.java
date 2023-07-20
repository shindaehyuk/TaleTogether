package com.kong.authtest.images.dto;

import com.kong.authtest.images.model.Images;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImagesDtoRequest {
    private String imageName;
    private int sequence;
    private Long taleId;

    public Images toImages(){
        return Images.builder()
                .imageName(this.imageName)
                .sequence(this.sequence)
                .build();
    }
}
