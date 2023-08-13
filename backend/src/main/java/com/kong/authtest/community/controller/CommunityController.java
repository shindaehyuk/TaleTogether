package com.kong.authtest.community.controller;

import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.community.dto.*;
import com.kong.authtest.community.service.CommunityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@RequestMapping("/api/community")
@RequiredArgsConstructor
@Slf4j
@RestController
@Api(tags = "community")
public class CommunityController {

    private final CommunityService communityService;
    private final TokenService tokenService;

    @PostMapping("/register")
    @ApiOperation(value = "커뮤니티 작성 API", notes = "커뮤니티 글을 작성하기 위해 사용하는 API, title, content, userId, taleId가 필요하다", response = CommunityDtoResponse.class)
    public ResponseEntity<?> register(@RequestBody CommunityDtoRequest communityDtoRequest, @RequestHeader(HEADER_STRING) String token) {
        try {
            communityDtoRequest.setUserId(tokenService.decodeUserId(token));
            return ResponseEntity.ok(communityService.register(communityDtoRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("community register 오류");
        }
    }

    @GetMapping("/info/{communityId}")
    @ApiOperation(value = "커뮤니티 정보 얻는 API", notes = "커뮤니티와 댓글 정보를 얻기위해 사용하는 API, communityId가 필요하다.", response = CommunityDtoGetResponse.class)
    public ResponseEntity<?> getCommunityInfo(@PathVariable Long communityId) {
        try {
            return ResponseEntity.ok(communityService.getCommunityInfo(communityId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("getCommunityInfo 오류");
        }
    }

    @GetMapping("/all/{page}")
    @ApiOperation(value = "모든 커뮤니티 정보 얻는 API", notes = "모든 커뮤니티 정보를 얻는 API")
    public ResponseEntity<?> getAll(@PathVariable int page) {
        try {
            return ResponseEntity.ok(communityService.getAll(page));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("community getAll 오류");
        }
    }

    @GetMapping("/detail")
    @ApiOperation(value = "유저 아이디로 커뮤니티 디테일 정보 얻는 API", notes = "유저 아이디로 커뮤니티 디테일 정보 얻는 API")
    public ResponseEntity<?> getDetailByUserName(@RequestHeader(HEADER_STRING) String token) {
        try {
            return ResponseEntity.ok(communityService.getCommunityInfoByUserName(tokenService.decodeUserId(token)));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("community - getDetailByUserName 오류");
        }
    }

    @GetMapping("/likes")
    @ApiOperation(value = "유저 아이디로 좋아요한 커뮤니티 디테일 정보 얻는 API", notes = "유저 아이디로 좋아요한 커뮤니티 디테일 정보 얻는 API")
    public ResponseEntity<?> getLikeCommunityDetailByUserName(@RequestHeader(HEADER_STRING) String token) {
        try {
            return ResponseEntity.ok(communityService.getLikeCommunityByUserName(tokenService.decodeUserId(token)));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("getLikeCommunityDetailByUserName 오류");
        }
    }


    @PutMapping("/modify")
    @ApiOperation(value = "커뮤니티 정보 수정 API", notes = "커뮤니티 정보를 수정하기위해 사용하는 API, taleId, content, title, communityId가 필요하다.", response = CommunityDtoResponse.class)
    public ResponseEntity<?> modifyCommunityInfo(@RequestBody CommunityDtoPutRequest communityDtoPutRequest) {
        try {
            return ResponseEntity.ok(communityService.modify(communityDtoPutRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("modifyCommunityInfo 오류");
        }
    }

    @DeleteMapping("/delete/{communityId}")
    @ApiOperation(value = "커뮤니티 글을 삭제하기 위한 API", notes = "커뮤니티 글을 삭제하기 위한 API로 communityId가 필요하다. 커뮤니티에 달린 댓글들까지 같이 삭제된다. ", response = Boolean.class)
    public ResponseEntity<?> delete(@PathVariable Long communityId) {
        try {
            communityService.delete(communityId);
            return ResponseEntity.ok(true);
        }catch (Exception e){
            return ResponseEntity.badRequest().body("delete Community 오류");
        }
    }

}
