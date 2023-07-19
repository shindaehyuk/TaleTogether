package com.kong.authtest.share.controller;

import com.kong.authtest.share.dto.ShareDtoRequest;
import com.kong.authtest.share.dto.ShareDtoResponse;
import com.kong.authtest.share.service.ShareService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/share")
@RequiredArgsConstructor
@Slf4j
@RestController
@CrossOrigin("*")
public class ShareController {

    private final ShareService shareService;

    @PostMapping
    public ResponseEntity<ShareDtoResponse> register(@RequestBody ShareDtoRequest shareDtoRequest, Long userId){
        return ResponseEntity.ok(shareService.register(shareDtoRequest, userId));
    }
}
