package com.kong.authtest.user.dto;

import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdatePasswordResponse {

    private String password;

    public UserUpdatePasswordResponse(User user){
        this.password = user.getPassword();
    }
}
