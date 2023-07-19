package com.kong.authtest.comment.service;

import com.kong.authtest.comment.model.Comment;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {
    Long findCommentId(String comment);
    Comment findComment(Long commentId);
    Comment findShareComment(Long shareId);
    boolean createComment(Comment comment);
    boolean deleteComment(Long commentId);
    boolean updateComment(Comment comment);
}
