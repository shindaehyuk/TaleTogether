package com.kong.authtest.auth;

import com.auth0.jwt.JWTVerifier;
import com.kong.authtest.user.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil = null;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(jwtTokenUtil.getHeaderString());
        System.out.println(header);
        try{
            JWTVerifier verifier = jwtTokenUtil.getVerifier();
            SecurityContextHolder.getContext().setAuthentication();
            return;
        } catch (Exception e) {

            throw new RuntimeException(e);
        }

    }

//    @Transactional(readOnly = true)
//    public Authentication getAutehtication(HttpServletRequest request) throws Exception{
//        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
//        if(token != null){
//            JWTVerifier verifier = jwtTokenUtil.getVerifier();
//
//        }
//
//    }


}
