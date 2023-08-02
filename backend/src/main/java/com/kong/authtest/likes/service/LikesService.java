package com.kong.authtest.likes.service;

import com.kong.authtest.community.model.Community;
import com.kong.authtest.community.repository.CommunityRepository;
import com.kong.authtest.likes.dto.LikesDtoRequest;
import com.kong.authtest.likes.model.Likes;
import com.kong.authtest.likes.repository.LikesRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import com.kong.authtest.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class LikesService {
    private final LikesRepository likesRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;
    private final UserService userService;

    @Transactional
    public Boolean register(LikesDtoRequest likesDtoRequest) {

        Optional<Likes> likesByUser = likesRepository.findLikesByUserAndCommunity(getUser(likesDtoRequest),getCommunity(likesDtoRequest.getCommunityId()));
        if (likesByUser.isPresent()){
            return false;
        }
        likesRepository.save(likesDtoRequest.toLikes()
                .addCommunity(getCommunity(likesDtoRequest.getCommunityId()))
                .addUser(getUser(likesDtoRequest)));
        return true;
    }

    @Transactional
    public Boolean delete(LikesDtoRequest likesDtoRequest) {
        likesRepository.deleteByUserAndCommunity(
                getUser(likesDtoRequest), getCommunity(likesDtoRequest.getCommunityId()));
        return true;
    }

    public Long getLikesCount(Long communityId){
        return likesRepository.countByCommunity(getCommunity(communityId));
    }

    private User getUser(LikesDtoRequest likesDtoRequest) {
        return userRepository.findUserByUserId(likesDtoRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("user문제"));
    }

    private Community getCommunity(Long communityId) {
        return communityRepository.findById(communityId)
                .orElseThrow(() -> new IllegalArgumentException("id 실수?"));
    }
}
