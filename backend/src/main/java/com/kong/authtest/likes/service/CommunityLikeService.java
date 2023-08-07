package com.kong.authtest.likes.service;

import com.kong.authtest.community.model.Community;
import com.kong.authtest.community.repository.CommunityRepository;
import com.kong.authtest.likes.dto.LikesDtoRequest;
import com.kong.authtest.likes.model.CommunityLike;
import com.kong.authtest.likes.repository.CommunityLikeRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CommunityLikeService {
    private final CommunityLikeRepository communityLikeRepository;
    private final UserRepository userRepository;
    private final CommunityRepository communityRepository;

    @Transactional
    public Boolean register(LikesDtoRequest likesDtoRequest) {

        Optional<CommunityLike> likesByUser = communityLikeRepository.findLikesByUserAndCommunity(getUser(likesDtoRequest),getCommunity(likesDtoRequest.getCommunityId()));
        if (likesByUser.isPresent()){
            return false;
        }
        communityLikeRepository.save(likesDtoRequest.toLikes()
                .addCommunity(getCommunity(likesDtoRequest.getCommunityId()))
                .addUser(getUser(likesDtoRequest)));
        return true;
    }

    @Transactional
    public Boolean delete(LikesDtoRequest likesDtoRequest) {
        communityLikeRepository.deleteByUserAndCommunity(
                getUser(likesDtoRequest), getCommunity(likesDtoRequest.getCommunityId()));
        return true;
    }



    public Long getLikesCount(Long communityId){
        return communityLikeRepository.countByCommunity(getCommunity(communityId));
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
