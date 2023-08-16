package com.kong.authtest.user.dto;

import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDtoResponse {


    private String userId;

    private String name;

    public UserDtoResponse(User user) {
        this.userId = user.getUserId();
        this.name = user.getName();
    }
}
