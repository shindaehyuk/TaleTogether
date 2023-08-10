package com.kong.authtest.taleUser.service;

import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.tale.repository.TaleRepository;
import com.kong.authtest.taleUser.domain.UserTale;
import com.kong.authtest.taleUser.dto.UserTaleRequest;
import com.kong.authtest.taleUser.dto.UserTaleResponse;
import com.kong.authtest.taleUser.repository.UserTaleRepository;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserTaleService {

    private final UserTaleRepository userTaleRepository;

    private final UserRepository userRepository;

    private final TaleRepository taleRepository;

    @Transactional
    public UserTaleResponse addUserToTale(UserTaleRequest userTaleRequest) {
        return new UserTaleResponse(userTaleRepository.save(UserTale.builder().
                tale(findTaleById(userTaleRequest))
                .user(findUserByUserId(userTaleRequest.getUserId()))
                .build()));

    }

    private User findUserByUserId(String userId) {
        return userRepository.findUserByUserId(userId).orElseThrow(() -> new NoSuchElementException("이런 멤버 없습니다"));

    }

    private Tale findTaleById(UserTaleRequest userTaleRequest) {
        return taleRepository.findById(userTaleRequest.getTaleId()).orElseThrow(() -> new NoSuchElementException("이런 Tale 없습니다."));
    }


}
