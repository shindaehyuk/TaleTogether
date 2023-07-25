package com.kong.authtest.auth;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
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

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    //public JwtAuthenticationFilter(
    //        @Autowired  final UserService userService,
    //        @Autowired  final JwtTokenUtil jwtTokenUtil) {
    //    this.userService = userService;
    //    this.jwtTokenUtil = jwtTokenUtil;
    //}

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = request.getHeader(jwtTokenUtil.getHeaderString());
        if (token != null) {
            try {
                Authentication authentication = getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (JWTDecodeException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid JWT");
                return;
            }
        }
        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(String token) throws JWTDecodeException {
        if (token != null) {
            JWTVerifier verifier = jwtTokenUtil.getVerifier();
            DecodedJWT decodedJWT = verifier.verify(token.replace(jwtTokenUtil.getTokenPrefix(), ""));
            String userId = decodedJWT.getSubject();
            if (userId != null) {
                User user = userService.getUserByUserId(userId);
                if (user != null) {
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

}
