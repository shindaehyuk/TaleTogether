package com.kong.authtest.user.dto;

import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {

    @NotBlank(message = "공백 입력 안돼")
    private String name;

    public User toUser(){
        return User.builder()
                .name(this.name)
                .build();
    }
}
