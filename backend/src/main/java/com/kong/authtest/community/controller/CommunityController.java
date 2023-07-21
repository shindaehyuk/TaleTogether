package com.kong.authtest.community.controller;

import com.kong.authtest.community.dto.CommunityDtoGetResponse;
import com.kong.authtest.community.dto.CommunityDtoRequest;
import com.kong.authtest.community.dto.CommunityDtoResponse;
import com.kong.authtest.community.dto.CommunityDtoPutRequest;
import com.kong.authtest.community.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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

    @PutMapping("/modify")
    public ResponseEntity<CommunityDtoResponse> modifyCommunityInfo(@RequestBody CommunityDtoPutRequest communityDtoPutRequest){
        return ResponseEntity.ok(communityService.modify(communityDtoPutRequest));
    }

    @DeleteMapping("/delete/{communityId}")
    public ResponseEntity<Boolean> delete(@PathVariable Long communityId){
        communityService.delete(communityId);
        return ResponseEntity.ok(true);
    }

}
