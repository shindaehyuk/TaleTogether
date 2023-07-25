package com.kong.authtest.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class JwtTokenUtil {
    public String secretKey;
    public Integer expirationTime;
    public Algorithm cryptoAlgorithm;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "kong.com";

    public JwtTokenUtil(@Value("${jwt.secret}") String secretkey, @Value("${jwt.expiration}") Integer expirationTime) {
        this.secretKey = secretkey;
        this.expirationTime = expirationTime;
        this.cryptoAlgorithm = Algorithm.HMAC256(secretkey.getBytes());
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


    public String generateAccessToken(String userId) {
        final Instant now = Instant.now();
        return TOKEN_PREFIX + JWT.create()
                .withSubject(userId)
                .withExpiresAt(now.plusSeconds(expirationTime))
                .withIssuer(ISSUER)
                .sign(cryptoAlgorithm);
    }

    public String generateRefreshToken(String userId) {
        //RefreshToken은 약 30일
        int refreshExpiration = 2 * 24 * 30;
        final Instant now = Instant.now();
        ;
        return TOKEN_PREFIX + JWT.create()
                .withSubject(userId)
                .withExpiresAt(now.plusSeconds(expirationTime * refreshExpiration))
                .withIssuer(ISSUER)
                .sign(cryptoAlgorithm);
    }


}
