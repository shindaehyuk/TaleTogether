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
    private final TokenService tokenService;
    @PostMapping("/taleUser/register")
    public ResponseEntity<?> addUserToTale(@RequestBody UserTaleRequest userTaleRequest, final Authentication authentication){
        try {
            userTaleRequest.setUserId((String) authentication.getPrincipal());
            return ResponseEntity.ok(userTaleService.addUserToTale(userTaleRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("addUserToTale 오류");
        }
    }

}
