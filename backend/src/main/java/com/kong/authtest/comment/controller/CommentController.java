package com.kong.authtest.comment.controller;

import com.kong.authtest.comment.dto.CommentDtoGetRequest;
import com.kong.authtest.comment.dto.CommentDtoRequest;
import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/comment")
@RequiredArgsConstructor
@Slf4j
@RestController
@CrossOrigin("*")
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentDtoResponse> register(@RequestBody CommentDtoRequest commentDtoRequest){
        return ResponseEntity.ok(commentService.register(commentDtoRequest));
    }

//    @PostMapping("/info")
//    public ResponseEntity<CommentDtoResponse> getInfo(@RequestBody CommentDtoGetRequest commentDtoGetRequest){
//        return ResponseEntity.ok(commentService.getInfo(commentDtoGetRequest));
//    }
}
