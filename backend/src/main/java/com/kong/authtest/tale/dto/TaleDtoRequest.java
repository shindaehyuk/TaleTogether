package com.kong.authtest.tale.dto;

import com.kong.authtest.tale.model.Tale;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaleDtoRequest {
    private Long userId;

    public Tale toTale() {
        return Tale.builder()
                .build();
    }
}
