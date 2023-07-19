package com.kong.authtest.comment.service;

import com.kong.authtest.comment.dto.CommentDtoRequest;
import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.comment.repository.CommentRepository;
import com.kong.authtest.share.repository.ShareRepository;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ShareRepository shareRepository;
    
    public CommentDtoResponse register(CommentDtoRequest commentDtoRequest, Long userId, Long shareId){
        return new CommentDtoResponse(
                commentRepository
                        .save(commentDtoRequest
                        .toComment()
                        .addUserAndShare(
                                userRepository.findById(userId)
                                .orElseThrow(()-> new IllegalArgumentException("userId 문제")),
                                shareRepository.findById(shareId)
                                        .orElseThrow(()->new IllegalArgumentException("shareId 문제")))));
    }
}
