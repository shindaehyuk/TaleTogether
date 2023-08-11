package com.kong.authtest.taleUser.controller;

import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.taleUser.dto.UserTaleRequest;
import com.kong.authtest.taleUser.dto.UserTaleResponse;
import com.kong.authtest.taleUser.service.UserTaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserTaleController {

    private final UserTaleService userTaleService;
    private final TokenService tokenService;
    @PostMapping("/taleUser/register")
    public ResponseEntity<UserTaleResponse> addUserToTale(@RequestBody UserTaleRequest userTaleRequest, @RequestHeader(HEADER_STRING) String token){
        userTaleRequest.setUserId(tokenService.decodeUserId(token));
        return ResponseEntity.ok(userTaleService.addUserToTale(userTaleRequest));

    }
}
