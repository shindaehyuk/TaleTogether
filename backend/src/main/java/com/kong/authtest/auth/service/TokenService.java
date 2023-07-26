package com.kong.authtest.auth.service;

import com.auth0.jwt.JWT;
import com.kong.authtest.auth.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final JwtTokenUtil jwtTokenUtil;
    private final RedisService redisService;

    @Value("${jwt.expiration}")
    private int expiration;

    // access, refresh 토큰 생성, 반환
    public HashMap<String, Object> generateTokens(String userId) {
        final HashMap<String, Object> map = new HashMap<>();
        map.put("accessToken", generateAcessToken(userId));
        map.put("refreshToken", generateRefreshToken(userId));
        return map;
    }

    public String generateAcessToken(String userId) {
        return jwtTokenUtil.generateToken(userId, expiration);
    }

    public String generateRefreshToken(String userId) {
        // 약 30일
        int refreshExpiration = 2 * 24 * 30;
        String token = jwtTokenUtil.generateToken(userId, expiration * refreshExpiration);
        redisService.storeRefreshToken(userId, token);
        return token;
    }


}