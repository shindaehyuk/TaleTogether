package com.kong.authtest.auth.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.HashMap;

@Component
public class JwtTokenUtil {
    public String secretKey;
    public Integer expirationTime;
    public Algorithm cryptoAlgorithm;
    private final RedisTemplate<String, Object> redisTemplate;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "kong.com";

    public JwtTokenUtil(@Value("${jwt.secret}") String secretkey, @Value("${jwt.expiration}") Integer expirationTime, RedisTemplate<String, Object> redisTemplate) {
        this.secretKey = secretkey;
        this.expirationTime = expirationTime;
        this.cryptoAlgorithm = Algorithm.HMAC256(secretkey.getBytes());
        this.redisTemplate = redisTemplate;
    }

    public String getHeaderString() {
        return HEADER_STRING;
    }

    public String getTokenPrefix() {
        return TOKEN_PREFIX;
    }

    public JWTVerifier getVerifier() {
        return JWT
                .require(cryptoAlgorithm)
                .withIssuer(ISSUER)
                .build();
    }

    public HashMap<?, ?> generateTokens(String userId) {
        final HashMap<String, Object> map = new HashMap<>();
        map.put("accessToken", generateAccessToken(userId));
        map.put("refreshToken", generateAndStoreRefreshToken(userId));
        return map;
    }

    public String generateAccessToken(String userId) {
        final Instant now = Instant.now();
        return TOKEN_PREFIX + JWT.create()
                .withSubject(userId)
                .withExpiresAt(now.plusSeconds(expirationTime))
                .withIssuer(ISSUER)
                .sign(cryptoAlgorithm);
    }

    public String generateAndStoreRefreshToken(String userId) {
        String token = generateRefreshToken(userId);
        storeRefreshToken(userId, token);
        return token;
    }

    public String generateRefreshToken(String userId) {
        //RefreshToken은 약 30일
        int refreshExpiration = 2 * 24 * 30;
        final Instant now = Instant.now();
        return TOKEN_PREFIX + JWT.create()
                .withSubject(userId)
                .withExpiresAt(now.plusSeconds(expirationTime * refreshExpiration))
                .withIssuer(ISSUER)
                .sign(cryptoAlgorithm);
    }

    public void storeAccessToken(String token) {
        redisTemplate.opsForValue().set(token, "logout", expirationTime);
    }

    public void storeRefreshToken(String userId, String token) {
        redisTemplate.opsForValue().set(userId, token);
    }

    public void deleteRefreshToken(String userId) {
        redisTemplate.opsForValue().getAndDelete(userId);
    }

    public String getRefreshToken(String userId) {
        return (String) redisTemplate.opsForValue().get(userId);
    }

}
