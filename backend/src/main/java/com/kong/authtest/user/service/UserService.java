package com.kong.authtest.user.service;

import com.kong.authtest.user.dto.UserCreateRequest;
import com.kong.authtest.user.dto.UserCreateResponse;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("UserService")
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public UserCreateResponse addUser(UserCreateRequest userCreateRequest) {
        CheckDuplicated(userCreateRequest);
        return new UserCreateResponse(userRepository.save(userCreateRequest.toUser(passwordEncoder)));
    }

    public User getUserByName(String userName) {
        return userRepository.findUserByName(userName).
                orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }

    public User getUserByUserId(String userId) {
        return userRepository.findUserByUserId(userId).
                orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }


    private void CheckDuplicated(UserCreateRequest userCreateRequest) {
        userRepository.findUserByUserId(userCreateRequest.getUserId())
                .ifPresent(m -> {
                    throw new IllegalArgumentException("이미 존재 하는 회원입니다.");
                });
    }
}
