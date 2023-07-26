package com.kong.authtest.auth.dto;

import com.kong.authtest.user.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class PJTNameUserDetails implements UserDetails {

<<<<<<< HEAD:backend/src/main/java/com/kong/authtest/auth/dto/PJTNameUserDetails.java
    private final int id;
    private final String userId;
    private final String password;
    private final String name;
    private final Collection<GrantedAuthority> authorities = new ArrayList<>();
=======
    private Long id;
    private String userId;
    private String password;
    private String name;
    private Collection<GrantedAuthority> authorities = new ArrayList<>();
>>>>>>> 46f6ed9c5d1fe8e363dc1c19787bfa25e2cde5d9:backend/src/main/java/com/kong/authtest/auth/PJTNameUserDetails.java

    public PJTNameUserDetails(User user) {
        this.id = user.getId();
        this.userId = user.getUserId();
        this.password = user.getPassword();
        this.name = user.getName();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
