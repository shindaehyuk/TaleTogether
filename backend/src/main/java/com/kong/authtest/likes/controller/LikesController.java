package com.kong.authtest.likes.controller;

import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.likes.dto.LikesDtoRequest;
import com.kong.authtest.likes.service.CommunityLikeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@RequestMapping("/api/likes")
@RequiredArgsConstructor
@RestController
@Api(tags = "likes")
public class LikesController {

    private final CommunityLikeService communityLikeService;
    private final TokenService tokenService;
    @PostMapping("/add")
    @ApiOperation(value = "좋아요 추가 API", notes = "communityId와 userId만 작성되며, userId(email)가 필요한 API", response = Boolean.class)
    public ResponseEntity<?> addLikes(@RequestBody LikesDtoRequest likesDtoRequest, @RequestHeader(HEADER_STRING) String token){
        try {
            likesDtoRequest.setUserId(tokenService.decodeUserId(token));
            return ResponseEntity.ok(communityLikeService.register(likesDtoRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("addLikes 오류");

        }
    }

    @PostMapping("/remove")
    @ApiOperation(value = "좋아요 취소 API", notes = "communityId와 userId만 작성되며, userId(email)가 필요한 API", response = Boolean.class)
    public ResponseEntity<?> cancel(@RequestBody  LikesDtoRequest likesDtoRequest, @RequestHeader(HEADER_STRING) String token){
        try {
            likesDtoRequest.setUserId(tokenService.decodeUserId(token));
            return ResponseEntity.ok(communityLikeService.delete(likesDtoRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("likecancle 오류");

        }
    }
}
