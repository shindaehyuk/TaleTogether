package com.kong.authtest.tale.dto;

import com.kong.authtest.tale.model.Tale;
import lombok.Data;

@Data
public class TaleDtoResponse {
    private Long taleId;

    public TaleDtoResponse (Tale tale){
        this.taleId = tale.getTaleId();
    }
}
