package com.kong.authtest.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class JwtTokenUtil {
    public static String secretKey;
    public static Integer expirationTime;

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secretkey, @Value("${jwt.expiration}") Integer expirationTime){
        this.secretKey = secretkey;
        this.expirationTime = expirationTime;
    }

}
