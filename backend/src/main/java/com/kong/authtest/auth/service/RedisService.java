package com.kong.authtest.auth.service;

import com.kong.authtest.auth.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, Object> redisTemplate;
    @Value("${jwt.expiration}")
    private int expiration;

    public String getToken(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    public void storeAccessToken(String token) {
        String msg = "logout";
        redisTemplate.opsForValue().set(token, msg);
        redisTemplate.expire(token, expiration, TimeUnit.SECONDS);
    }

    public void storeRefreshToken(String userId, String token) {
        redisTemplate.opsForValue().set(userId, token);
    }

    public void deleteToken(String userId) {
        redisTemplate.opsForValue().getAndDelete(userId);
    }

}
