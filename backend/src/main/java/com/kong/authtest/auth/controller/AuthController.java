package com.kong.authtest.auth.controller;

import com.kong.authtest.auth.service.AuthService;
import com.kong.authtest.auth.util.JwtTokenUtil;
import com.kong.authtest.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/refresh/{userId}")
    public ResponseEntity<?> refresh(HttpServletRequest request, @PathVariable final String userId) {
        HashMap<String, Object> token = authService.refresh(request.getHeader(JwtTokenUtil.HEADER_STRING), userId);
        if (token != null)
            return ResponseEntity.ok().body(token);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/logout/{userId}")
    public ResponseEntity<?> logout(HttpServletRequest request, @PathVariable final String userId) {
        authService.logout(request.getHeader(JwtTokenUtil.HEADER_STRING), userId);
        return ResponseEntity.ok().build();

    }

}
