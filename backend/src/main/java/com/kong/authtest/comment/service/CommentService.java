package com.kong.authtest.comment.service;

import com.kong.authtest.comment.dto.CommentDtoGetRequest;
import com.kong.authtest.comment.dto.CommentDtoRequest;
import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.comment.repository.CommentRepository;
import com.kong.authtest.community.repository.CommunityRepository;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;

    @Transactional
    public CommentDtoResponse register(CommentDtoRequest commentDtoRequest){
        return new CommentDtoResponse(
                commentRepository
                        .save(commentDtoRequest
                        .toComment()
                        .addUserAndCommunity(
                                userRepository.findById(commentDtoRequest.getUserId())
                                .orElseThrow(()-> new IllegalArgumentException("userId 문제")),
                                communityRepository.findById(commentDtoRequest.getShareId())
                                        .orElseThrow(()->new IllegalArgumentException("shareId 문제")))));
    }

    @Transactional
    public CommentDtoResponse getInfo(CommentDtoGetRequest commentDtoGetRequest){
        CommentDtoResponse commentDtoResponse = new CommentDtoResponse(commentDtoGetRequest.toComment().addUserAndCommunity(commentRepository.findById(commentDtoGetRequest.getCommentId()).get().getUser(), commentRepository.findById(commentDtoGetRequest.getCommentId()).get().getCommunity()));
        commentDtoResponse.setContent(commentRepository.findById(commentDtoGetRequest.getCommentId()).get().getContent());
        return commentDtoResponse;
    }
}
