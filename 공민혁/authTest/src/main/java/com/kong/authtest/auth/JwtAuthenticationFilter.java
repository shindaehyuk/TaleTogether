package com.kong.authtest.auth;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
    private JwtTokenUtil jwtTokenUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = request.getHeader(jwtTokenUtil.getHeaderString());
        if (token != null) {
            try {
                Authentication authentication = getAutehtication(request);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return;
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        chain.doFilter(request, response);
    }

    @Transactional(readOnly = true)
    public Authentication getAutehtication(HttpServletRequest request) throws Exception {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        if (token != null) {
            JWTVerifier verifier = jwtTokenUtil.getVerifier();
            DecodedJWT decodedJWT = verifier.verify(token);
            String userId = decodedJWT.getSubject();
            if (userId != null) {
                User user = userService.getUserById(userId);
                if (user != null) {
                    // 얘는 왜 서비스 안거치고 가는지..
                    PJTNameUserDetails userDetails = new PJTNameUserDetails(user);
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userId, null, userDetails.getAuthorities());
                    jwtAuthentication.setDetails(userDetails);
                    return jwtAuthentication;
                }
            }
            return null;
        }
        return null;
    }

    //private String resolveToken(HttpServletRequest request) {
    //    String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
    //    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
    //        return bearerToken.substring(7);
    //    }
    //    return null;
    //}

}
