package com.kong.authtest.user.dto;

import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateRequest {


    @Email
    private String userId;
    /**
     * 한글은 2~8 자   영어는 2~ 12자 까지 입력 가능
     */
    @Pattern(regexp = "^[가-힣]{2,8}|[a-zA-Z]{2,12}$", message = "올바르지 않은 이름 형식입니다.")
    private String name;

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$", message = "비밀번호는 영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하이어야 합니다.")
    private String password;

    public User toUser(PasswordEncoder passwordEncoder) {
        return User.builder()
                .userId(this.userId)
                .name(this.name)
                .password(passwordEncoder.encode(this.password))
                .build();

    }


}
