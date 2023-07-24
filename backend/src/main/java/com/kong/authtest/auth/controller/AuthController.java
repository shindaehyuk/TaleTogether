package com.kong.authtest.auth.controller;

import com.kong.authtest.auth.service.RedisService;
import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.auth.util.JwtTokenUtil;
import com.kong.authtest.user.dto.UserDto;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final TokenService tokenService;
    private final RedisService redisService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody final UserDto userDto) {
        String userId = userDto.getUserId();
        String password = userDto.getPassword();
        User user = userService.getUserByUserId(userId);
        if (passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.ok().body(tokenService.generateTokens(userId));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/refresh/{userId}")
    public ResponseEntity<?> refresh(HttpServletRequest request, @PathVariable final String userId) {
        if (request.getHeader(JwtTokenUtil.HEADER_STRING).equals(redisService.getToken(userId)))
            return ResponseEntity.ok().body(tokenService.generateTokens(userId));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    //@GetMapping("/logout/{userId}")
    //public ResponseEntity<?> logout(@PathVariable final String userId) {
    //}

}
