package com.kong.authtest.auth;

import com.kong.authtest.auth.dto.PJTNameUserDetails;
import com.kong.authtest.auth.service.PJTNameUserDetailsService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    PJTNameUserDetailsService userDetailsService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        System.out.println("authenticate가 실행이 됩니까?");
        final String username = authentication.getPrincipal().toString();
        final String password = authentication.getCredentials().toString();

        final PJTNameUserDetails user = userDetailsService.loadUserByUsername(username);
        // 인증 오류 발생
        if (user == null || !user.getPassword().equals(password)) {
            throw new BadCredentialsException("id or password Wrong");
        }

        // 얘는 jwtToken과 무슨 관계인지
        return new UsernamePasswordAuthenticationToken(username, password, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
