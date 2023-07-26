package com.kong.authtest.auth;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kong.authtest.auth.dto.PJTNameUserDetails;
import com.kong.authtest.auth.service.RedisService;
import com.kong.authtest.auth.util.JwtTokenUtil;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserService userService;
    private final RedisService redisService;
    private final JwtTokenUtil jwtTokenUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        if (token != null) {
            try {
                // 이미 로그아웃 된 상태면 접속 못하게함.
                if ("logout".equals(redisService.getToken(token))) {
                    logger.info("logout되어 만료된 토큰입니다.");
                    throw new JWTDecodeException("logout되어 만료된 토큰입니다.");
                }
                Authentication authentication = getAuthentication(token);
                // securityContextHolder에 로그인한 인증 정보 넣음.
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            // 잘못된 jwt인 경우.
            catch (JWTDecodeException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid JWT");
                return;
            }
            // jwt의 유효기간이 만료된 경우
            catch (TokenExpiredException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Expired JWT");
                return;
            } catch (Exception ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

        }
        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(String token) throws Exception {
        JWTVerifier verifier = jwtTokenUtil.getVerifier();
        // "Bearer "제거한 string (순수 Token)을 decode.
        DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
        String userId = decodedJWT.getSubject();
        if (userId != null) {
            User user = userService.getUserByUserId(userId);
            if (user != null) {
                PJTNameUserDetails userDetails = new PJTNameUserDetails(user);
                // 얻어온 user 정보를 바탕으로 authentication 생성.
                UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userId, null, userDetails.getAuthorities());
                jwtAuthentication.setDetails(userDetails);
                return jwtAuthentication;
            }
        }
        return null;
    }

}