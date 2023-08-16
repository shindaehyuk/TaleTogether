package com.kong.authtest.comment.service;

import com.kong.authtest.comment.dto.CommentDtoPutRequest;
import com.kong.authtest.comment.dto.CommentDtoRequest;
import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.comment.model.Comment;
import com.kong.authtest.comment.repository.CommentRepository;
import com.kong.authtest.community.repository.CommunityRepository;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;

    @Transactional
    public CommentDtoResponse register(CommentDtoRequest commentDtoRequest) {
        return new CommentDtoResponse(
                commentRepository
                        .save(commentDtoRequest
                                .toComment()
                                .addUserAndCommunity(
                                        userRepository.findUserByUserId(commentDtoRequest.getUserId())
                                                .orElseThrow(() -> new IllegalArgumentException("userId 문제")),
                                        communityRepository.findById(commentDtoRequest.getCommunityId())
                                                .orElseThrow(() -> new IllegalArgumentException("shareId 문제")))));
    }

    public CommentDtoResponse getInfo(Long commentId) {
        System.out.println(commentId);
        return new CommentDtoResponse(getComment(commentId));
    }

    @Transactional
    public CommentDtoResponse modifyComment(CommentDtoPutRequest commentDtoPutRequest) {
        return new CommentDtoResponse(getComment(commentDtoPutRequest.getCommentId())
                .updateComment(commentDtoPutRequest));
    }

    @Transactional
    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    private Comment getComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("오류ㄷㄷ"));
    }
}
