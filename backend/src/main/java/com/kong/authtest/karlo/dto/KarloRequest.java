package com.kong.authtest.karlo.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KarloRequest {

    private String prompt;

    private String negative_prompt;

}
