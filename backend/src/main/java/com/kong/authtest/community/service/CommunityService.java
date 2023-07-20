package com.kong.authtest.community.service;

import com.kong.authtest.comment.dto.CommentDtoResponse;
import com.kong.authtest.community.dto.CommunityDtoGetResponse;
import com.kong.authtest.community.dto.CommunityDtoRequest;
import com.kong.authtest.community.dto.CommunityDtoResponse;
import com.kong.authtest.community.model.Community;
import com.kong.authtest.community.repository.CommunityRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;

    //    이것도 user의 id가 Long 형태로 바뀌어야 함
    @Transactional
    public CommunityDtoResponse register(CommunityDtoRequest communityDtoRequest) {
        return new CommunityDtoResponse(communityRepository.save(communityDtoRequest.toCommunity()
                .addUser(getUser(communityDtoRequest))));
    }

    public CommunityDtoGetResponse getCommunityInfo(Long communityId) {
        return new CommunityDtoGetResponse(findCommunityById(communityId));
    }

    public CommunityDtoResponse getInfo(Long communityId) {
        return new CommunityDtoResponse(findCommunityById(communityId));
    }

    private User getUser(CommunityDtoRequest communityDtoRequest) {
        return userRepository.findById(communityDtoRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("id 실수?"));
    }
    private Community findCommunityById(Long communityId) {
        return communityRepository.findById(communityId).orElseThrow(() -> new IllegalArgumentException("not found"));
    }
}
