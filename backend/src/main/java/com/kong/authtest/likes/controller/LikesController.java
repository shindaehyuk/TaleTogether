package com.kong.authtest.likes.controller;

import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.likes.dto.LikesDtoRequest;
import com.kong.authtest.likes.service.CommunityLikeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@RequestMapping("/api/likes")
@RequiredArgsConstructor
@RestController
@Api(tags = "likes")
public class LikesController {

    private final CommunityLikeService communityLikeService;
    @PostMapping("/add")
    @ApiOperation(value = "좋아요 추가 API", notes = "communityId와 userId만 작성되며, userId(email)가 필요한 API", response = Boolean.class)
    public ResponseEntity<Boolean> addLikes(@RequestBody LikesDtoRequest likesDtoRequest, final Authentication authentication){
        likesDtoRequest.setUserId((String) authentication.getPrincipal());
        return ResponseEntity.ok(communityLikeService.register(likesDtoRequest));
    }

    @PostMapping("/remove")
    @ApiOperation(value = "좋아요 취소 API", notes = "communityId와 userId만 작성되며, userId(email)가 필요한 API", response = Boolean.class)
    public ResponseEntity<Boolean> cancel(@RequestBody  LikesDtoRequest likesDtoRequest, final Authentication authentication){
        likesDtoRequest.setUserId((String) authentication.getPrincipal());
        return ResponseEntity.ok(communityLikeService.delete(likesDtoRequest));
    }
}
