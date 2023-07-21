package com.kong.authtest.comment.controller;

import com.kong.authtest.comment.dto.CommentDtoGetRequest;
import com.kong.authtest.comment.dto.CommentDtoPutRequest;
import com.kong.authtest.comment.dto.CommentDtoRequest;
import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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

    @GetMapping("/info/{postId}")
    public ResponseEntity<CommentDtoResponse> getComment(@PathVariable Long postId){
        return ResponseEntity.ok(commentService.getInfo(postId));
    }

    @PutMapping("/modify")
    public ResponseEntity<CommentDtoResponse> modifyComment(@RequestBody CommentDtoPutRequest commentDtoPutRequest){
        return ResponseEntity.ok(commentService.modifyComment(commentDtoPutRequest));
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Boolean> delete(@PathVariable Long commentId){
        commentService.delete(commentId);
        return ResponseEntity.ok(true);
    }
}
