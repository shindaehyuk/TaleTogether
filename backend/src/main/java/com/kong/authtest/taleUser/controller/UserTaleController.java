package com.kong.authtest.taleUser.controller;

import com.kong.authtest.taleUser.dto.UserTaleRequest;
import com.kong.authtest.taleUser.dto.UserTaleResponse;
import com.kong.authtest.taleUser.service.UserTaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserTaleController {

    private final UserTaleService userTaleService;

    @PostMapping("/taleUser/register")
    public ResponseEntity<UserTaleResponse> addUserToTale(@RequestBody UserTaleRequest userTaleRequest){
        return ResponseEntity.ok(userTaleService.addUserToTale(userTaleRequest));

    }
}
