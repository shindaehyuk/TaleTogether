package com.kong.authtest.community.controller;

import com.kong.authtest.community.dto.CommunityDtoGetResponse;
import com.kong.authtest.community.dto.CommunityDtoRequest;
import com.kong.authtest.community.dto.CommunityDtoResponse;
import com.kong.authtest.community.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/community")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping
    public ResponseEntity<CommunityDtoResponse> register(@RequestBody CommunityDtoRequest communityDtoRequest){
        return ResponseEntity.ok(communityService.register(communityDtoRequest));
    }

    @GetMapping("/info/{communityId}")
    public ResponseEntity<CommunityDtoGetResponse> getCommunityInfo(@PathVariable Long communityId){
        return ResponseEntity.ok(communityService.getCommunityInfo(communityId));
    }

}
