package com.kong.authtest.auth.service;

import com.kong.authtest.user.dto.UserDto;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@Slf4j
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
            HashMap<String, Object> stringObjectHashMap = tokenService.generateTokens(userId);
            return stringObjectHashMap;
        }
        return null;
    }

    public String testLogin(final UserDto userDto) {
        String userId = userDto.getUserId();
        String password = userDto.getPassword();
        User user = userService.getUserByUserId(userId);
        if (passwordEncoder.matches(password, user.getPassword())) {
            String token = tokenService.generateAccessToken(userId);
            return token;
        }
        return null;
    }

    // client에서 받은 refreshToken이 유효하면, 새 access, refresh 토큰 발급.
    public HashMap<String, Object> refresh(final String reqToken, final String userId) {
        if (reqToken.equals(redisService.getToken(userId)))
            return tokenService.generateTokens(userId);
        return null;
    }

    // logout한 user의 refreshToken을 지우고, AccessToken을 redis에 등록해 로그아웃된 계정의 토큰으로 로그인 및 토큰발급 방지 
    public void logout(final String token, final String userId) {
        redisService.deleteToken(userId);
        redisService.storeAccessToken(token);
    }
}
