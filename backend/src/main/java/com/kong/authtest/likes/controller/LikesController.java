package com.kong.authtest.likes.controller;

import com.kong.authtest.likes.dto.LikesDtoRequest;
import com.kong.authtest.likes.service.LikesService;
import com.kong.authtest.tale.dto.TaleDtoResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/likes")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@Api(tags = "likes")
public class LikesController {

    private final LikesService likesService;

    @PostMapping("/add")
    @ApiOperation(value = "좋아요 추가 API", notes = "communityId와 userId만 작성되며, userId(email)가 필요한 API", response = Boolean.class)
    public ResponseEntity<Boolean> addLikes(@RequestBody LikesDtoRequest likesDtoRequest){
        return ResponseEntity.ok(likesService.register(likesDtoRequest));
    }

    @PostMapping("/remove")
    @ApiOperation(value = "좋아요 취소 API", notes = "communityId와 userId만 작성되며, userId(email)가 필요한 API", response = Boolean.class)
    public ResponseEntity<Boolean> cancel(@RequestBody  LikesDtoRequest likesDtoRequest){
        return ResponseEntity.ok(likesService.delete(likesDtoRequest));
    }
}
