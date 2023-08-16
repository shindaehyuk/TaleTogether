package com.kong.authtest.user.dto;

import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;

    @Email
    private String userId;

    @Pattern(regexp = "^[가-힣]{2,8}|[a-zA-Z]{2,12}$", message = "올바르지 않은 이름 형식입니다.")
    private String name;

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$", message = "비밀번호는 영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하이어야 합니다.")
    private String password;

    public User toUser(){
        return User.builder()
                .id(this.id)
                .userId(this.userId)
                .name(this.name)
                .build();
    }

}
