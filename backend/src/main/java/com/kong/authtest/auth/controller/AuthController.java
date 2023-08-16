package com.kong.authtest.auth.controller;

import com.kong.authtest.auth.service.AuthService;
import com.kong.authtest.auth.util.JwtTokenUtil;
import com.kong.authtest.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody final UserDto userDto) {
        HashMap<String, Object> token = authService.login(userDto);
        if (token != null)
            return ResponseEntity.ok().body(token);
        return ResponseEntity.badRequest().body("토큰이 null");
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, final Authentication authentication) {
        HashMap<String, Object> token = authService.refresh(request.getHeader(JwtTokenUtil.HEADER_STRING), (String) authentication.getPrincipal());
        if (token != null)
            return ResponseEntity.ok().body(token);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("token이 refresh안됨");
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, final Authentication authentication) {
        authService.logout(request.getHeader(JwtTokenUtil.HEADER_STRING), (String) authentication.getPrincipal());
        return ResponseEntity.ok().build();
    }

}
