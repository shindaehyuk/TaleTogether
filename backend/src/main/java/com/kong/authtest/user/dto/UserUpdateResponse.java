package com.kong.authtest.user.dto;


import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateResponse {

    private String userId;
    private String name;

    public UserUpdateResponse(User user){
        this.userId = user.getUserId();
        this.name = user.getName();
    }
}
