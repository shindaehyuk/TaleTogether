package com.kong.authtest.auth.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.HashMap;

@Component
public class JwtTokenUtil {
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "kong.com";
    private final Algorithm cryptoAlgorithm;


    public JwtTokenUtil(@Value("${jwt.secret}") String secretkey) {
        this.cryptoAlgorithm = Algorithm.HMAC256(secretkey.getBytes());
    }

    public JWTVerifier getVerifier() {
        return JWT
                .require(cryptoAlgorithm)
                .withIssuer(JwtTokenUtil.ISSUER)
                .build();
    }

    // userId를 Subject로 expiration을 가진 토큰 생성
    public String generateToken(String userId, int expiration) {
        final Instant now = Instant.now();
        return JwtTokenUtil.TOKEN_PREFIX + JWT.create()
                .withSubject(userId)
                .withExpiresAt(now.plusSeconds(expiration))
                .withIssuer(JwtTokenUtil.ISSUER)
                .sign(cryptoAlgorithm);
    }


}
