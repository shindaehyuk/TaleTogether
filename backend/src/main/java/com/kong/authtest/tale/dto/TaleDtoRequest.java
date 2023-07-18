package com.kong.authtest.tale.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaleDtoRequest {
    private Long taleId;
    private String story;
    private Long id;
}
