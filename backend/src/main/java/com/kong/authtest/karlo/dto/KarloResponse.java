package com.kong.authtest.karlo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KarloResponse {

    private String id;

    private String model_version;

    private Image[] images;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class Image{

        private String id;
        private BigInteger seed;
        private String image;

    }

}
