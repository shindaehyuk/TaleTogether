package com.kong.authtest.auth;

import com.kong.authtest.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PJTNameUserDetailsService implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public PJTNameUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            return new PJTNameUserDetails(userService.getUserByName(username));
        } catch (Exception e) {
            throw new BadCredentialsException("id or password Wrong");
        }
    }
}
