package com.kong.authtest.taleUser.controller;

import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.tale.dto.TaleDtoGetResponse;
import com.kong.authtest.taleUser.dto.UserTaleRequest;
import com.kong.authtest.taleUser.dto.UserTaleResponse;
import com.kong.authtest.taleUser.service.UserTaleService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserTaleController {

    private final UserTaleService userTaleService;

    @PostMapping("/taleUser/register")
    public ResponseEntity<UserTaleResponse> addUserToTale(@RequestBody UserTaleRequest userTaleRequest, final Authentication authentication) {
        userTaleRequest.setUserId((String) authentication.getPrincipal());
        return ResponseEntity.ok(userTaleService.addUserToTale(userTaleRequest));
    }
}
