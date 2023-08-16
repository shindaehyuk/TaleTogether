package com.kong.authtest.user.dto;

import com.kong.authtest.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdatePasswordRequest {

    private String password;

    public User toUser(PasswordEncoder passwordEncoder){
        return User.builder()
                .password(passwordEncoder.encode(this.password)).build();
    }
}
