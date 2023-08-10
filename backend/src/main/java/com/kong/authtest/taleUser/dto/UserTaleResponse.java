package com.kong.authtest.taleUser.dto;

import com.kong.authtest.taleUser.domain.UserTale;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTaleResponse {

    private Long taleId;

    private String userId;

    public UserTaleResponse(UserTale userTale){
        this.taleId = userTale.getTale().getTaleId();
        this.userId = userTale.getUser().getUserId();
    }
}
