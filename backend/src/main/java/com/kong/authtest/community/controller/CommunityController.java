package com.kong.authtest.community.controller;

import com.kong.authtest.community.dto.CommunityDtoGetResponse;
import com.kong.authtest.community.dto.CommunityDtoPutRequest;
import com.kong.authtest.community.dto.CommunityDtoRequest;
import com.kong.authtest.community.dto.CommunityDtoResponse;
import com.kong.authtest.community.service.CommunityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/community")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@Api(tags = "community")
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping
    @ApiOperation(value = "커뮤니티 작성 API", notes = "커뮤니티 글을 작성하기 위해 사용하는 API, title, content, userId, taleId가 필요하다", response = CommunityDtoResponse.class)
    public ResponseEntity<CommunityDtoResponse> register(@RequestBody CommunityDtoRequest communityDtoRequest) {
        return ResponseEntity.ok(communityService.register(communityDtoRequest));
    }

    @GetMapping("/info/{communityId}")
    @ApiOperation(value = "커뮤니티 정보 얻는 API", notes = "커뮤니티와 댓글 정보를 얻기위해 사용하는 API, communityId가 필요하다.", response = CommunityDtoGetResponse.class)
    public ResponseEntity<CommunityDtoGetResponse> getCommunityInfo(@PathVariable Long communityId) {
        return ResponseEntity.ok(communityService.getCommunityInfo(communityId));
    }

    @PutMapping("/modify")
    @ApiOperation(value = "커뮤니티 정보 수정 API", notes = "커뮤니티 정보를 수정하기위해 사용하는 API, taleId, content, title, communityId가 필요하다.", response = CommunityDtoResponse.class)
    public ResponseEntity<CommunityDtoResponse> modifyCommunityInfo(@RequestBody CommunityDtoPutRequest communityDtoPutRequest) {
        return ResponseEntity.ok(communityService.modify(communityDtoPutRequest));
    }

    @DeleteMapping("/delete/{communityId}")
    @ApiOperation(value = "커뮤니티 글을 삭제하기 위한 API", notes = "커뮤니티 글을 삭제하기 위한 API로 communityId가 필요하다. 커뮤니티에 달린 댓글들까지 같이 삭제된다. ", response = Boolean.class)
    public ResponseEntity<Boolean> delete(@PathVariable Long communityId) {
        communityService.delete(communityId);
        return ResponseEntity.ok(true);
    }

}
