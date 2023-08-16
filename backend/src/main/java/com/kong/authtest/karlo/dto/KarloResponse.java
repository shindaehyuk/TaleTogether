package com.kong.authtest.karlo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KarloResponse {

    private String id;

    private String model_version;

    private String fileName;


    private List<Image> images = new ArrayList<>();


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Image {

        private String id;
        private BigInteger seed;
        private String image;
    }

}
