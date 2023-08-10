package com.kong.authtest.user.service;

import com.kong.authtest.user.dto.*;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service("UserService")
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public UserCreateResponse addUser(UserCreateRequest userCreateRequest) {
        CheckDuplicated(userCreateRequest);
        return new UserCreateResponse(userRepository.save(userCreateRequest.toUser(passwordEncoder)));
    }

    @Transactional
    public UserUpdateResponse updateUser(String userId, UserUpdateRequest userUpdateRequest) {
        User user = getUserByUserId(userId);

        checkMemberRequestNull(userUpdateRequest, user);
        user.update(userUpdateRequest.toUser());

        return new UserUpdateResponse(userRepository.save(user));

    }

    @Transactional
    public UserUpdatePasswordResponse updateUserPassword(String userId, UserUpdatePasswordRequest userUpdatePasswordRequest) {
        User user = getUserByUserId(userId);

        log.info("why {}", user.getUserId());

        user.updatePassword(userUpdatePasswordRequest.toUser(passwordEncoder));
        return new UserUpdatePasswordResponse(userRepository.save(user));
    }


    @Transactional
    public Boolean userDelete(String userId) {
        userRepository.delete(getUserByUserId(userId));
        return true;
    }


    private static void checkMemberRequestNull(UserUpdateRequest userUpdateRequest, User user) {

        if (Objects.isNull(userUpdateRequest.getName())) {
            userUpdateRequest.setName(user.getName());
        }
    }


    public User getUserByName(String userName) {
        return userRepository.findUserByName(userName).
                orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }

    public UserDtoResponse userDetail(String userId){
        return new UserDtoResponse(getUserByUserId(userId));

    }

    public User getUserByUserId(String userId) {
        return userRepository.findUserByUserId(userId).
                orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

    }

    public Boolean CheckDuplicated(UserDuplicateCheckRequest userDuplicateCheckRequest) {
        return userRepository.findUserByUserId(userDuplicateCheckRequest.getUserId()).isPresent();
    }


    private void CheckDuplicated(UserCreateRequest userCreateRequest) {
        userRepository.findUserByUserId(userCreateRequest.getUserId())
                .ifPresent(m -> {
                    throw new IllegalArgumentException("이미 존재 하는 회원입니다.");
                });
    }
}
