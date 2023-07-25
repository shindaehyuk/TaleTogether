package com.kong.authtest.auth.service;

import com.kong.authtest.user.dto.UserDto;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final RedisService redisService;
    private final TokenService tokenService;


    // client에서 받은 id에 일치하는 password가 있으면 access,refresh 토큰 발급.
    public HashMap<String, Object> login(final UserDto userDto) {
        String userId = userDto.getUserId();
        String password = userDto.getPassword();
        User user = userService.getUserByUserId(userId);
        if (passwordEncoder.matches(password, user.getPassword())) {
            return tokenService.generateTokens(userId);
        }
        return null;
    }

    // client에서 받은 refreshToken이 유효하면, 새 access, refresh 토큰 발급.
    public HashMap<String, Object> refresh(final String reqToken, final String userId) {
        if (reqToken.equals(redisService.getToken(userId)))
            return tokenService.generateTokens(userId);
        return null;
    }

    public void logout(final String token, final String userId) {
        redisService.deleteToken(userId);
        redisService.storeAccessToken(token);
    }
}
