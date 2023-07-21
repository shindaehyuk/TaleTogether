package com.kong.authtest.auth.service;

import com.auth0.jwt.algorithms.Algorithm;
import com.kong.authtest.auth.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenService {
    private final JwtTokenUtil jwtTokenUtil;
    private final RedisTemplate<String, Object> redisTemplate;
    private final String secretKey;
    private final int expirationTime;
    private final Algorithm cryptoAlgorithm;

    public JwtTokenService(@Autowired JwtTokenUtil jwtTokenUtil, @Autowired RedisTemplate<String, Object> redisTemplate) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.redisTemplate = redisTemplate;
        this.secretKey = jwtTokenUtil.secretKey;


    }
}