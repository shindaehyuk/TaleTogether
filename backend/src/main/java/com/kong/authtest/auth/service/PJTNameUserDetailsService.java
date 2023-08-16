package com.kong.authtest.auth.service;

import com.kong.authtest.auth.dto.PJTNameUserDetails;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PJTNameUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public PJTNameUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            return new PJTNameUserDetails(userService.getUserByName(username));
        } catch (Exception e) {
            throw new BadCredentialsException("id or password Wrong");
        }
    }
}
