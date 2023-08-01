package com.kong.authtest.karlo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KarloRequest {

    private String prompt;

    private String negative_prompt;

}
