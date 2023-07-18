package com.kong.authtest.images.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImagesDtoRequest {
    private Long imageId;
    private String imageName;
    private Long taleId;
    private int sequence;
}
