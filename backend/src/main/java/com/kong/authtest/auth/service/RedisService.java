package com.kong.authtest.auth.service;

import com.kong.authtest.auth.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

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
        redisTemplate.opsForValue().set(token, "logout", expiration);
    }

    public void storeRefreshToken(String userId, String token) {
        redisTemplate.opsForValue().set(userId, token);
    }

    public void deleteToken(String userId) {
        redisTemplate.opsForValue().getAndDelete(userId);
    }

}
