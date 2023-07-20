package com.kong.authtest.tale.dto;

import com.kong.authtest.tale.model.Tale;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaleDtoGetRequest {
    private Long taleId;

    public Tale toTale() {
        return Tale.builder()
                .taleId(this.getTaleId())
                .build();
    }
}
