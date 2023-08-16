package com.kong.authtest.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kong.authtest.auth.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class TokenService {
    private final JwtTokenUtil jwtTokenUtil;
    private final RedisService redisService;

    @Value("${jwt.expiration}")
    private int expiration;

    // access, refresh 토큰 생성, 반환
    public HashMap<String, Object> generateTokens(String userId) {
        final HashMap<String, Object> map = new HashMap<>();
        map.put("accessToken", generateAccessToken(userId));
        map.put("refreshToken", generateRefreshToken(userId));

        return map;
    }

    public String generateAccessToken(String userId) {
        String token = jwtTokenUtil.generateToken(userId, expiration);
        log.info("token {}",token);
        log.info("userId {}", jwtTokenUtil.getUserIdFromToken(token));

        return token;
    }

    public String generateRefreshToken(String userId) {
        // 약 30일
        int refreshExpiration = 2 * 24 * 30;
        String token = jwtTokenUtil.generateToken(userId, expiration * refreshExpiration);
        redisService.storeRefreshToken(userId, token);
        return token;
    }

    public String decodeUserId(String token){
        return JWT.decode(token.replace(JwtTokenUtil.TOKEN_PREFIX, "")).getSubject();
    }
}