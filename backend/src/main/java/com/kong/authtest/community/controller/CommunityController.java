package com.kong.authtest.community.controller;

import com.kong.authtest.community.dto.CommunityDtoGetRequest;
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
@Slf4j
@RestController
@CrossOrigin("*")
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping
    public ResponseEntity<CommunityDtoResponse> register(@RequestBody CommunityDtoRequest communityDtoRequest){
        return ResponseEntity.ok(communityService.register(communityDtoRequest));
    }

    @PostMapping("/info")
    public ResponseEntity<CommunityDtoGetResponse> getCommunityInfo(@RequestBody CommunityDtoGetRequest communityDtoGetRequest){
        return ResponseEntity.ok(communityService.getCommunityInfo(communityDtoGetRequest));
    }

    @PostMapping("/com")
    public ResponseEntity<CommunityDtoResponse> getInfo(@RequestBody CommunityDtoGetRequest communityDtoGetRequest){
        return ResponseEntity.ok(communityService.getInfo(communityDtoGetRequest));

    }
}
