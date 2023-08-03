package com.kong.authtest.user.dto;

import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {

    private String userId;
    private String name;

    public User toUser(){
        return User.builder()
                .userId(this.userId)
                .name(this.name)
                .build();
    }
}
