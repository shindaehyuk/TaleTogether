package com.kong.authtest.auth.Controller;

import com.kong.authtest.auth.JwtTokenUtil;
import com.kong.authtest.user.dto.UserDto;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody final UserDto userDto){
        String userId = userDto.getUserId();
        String password = userDto.getPassword();
        User user = userService.getUserByUserId(userId);
        if(passwordEncoder.matches(password,user.getPassword())){
            final var ret = new HashMap<String, Object>();
            ret.put("accessToken", jwtTokenUtil.generateAccessToken(userId));
            ret.put("refreshToken", jwtTokenUtil.generateRefreshToken(userId));
            return ResponseEntity.ok().body(ret);
        }
        return ResponseEntity.badRequest().build();
    }

}
