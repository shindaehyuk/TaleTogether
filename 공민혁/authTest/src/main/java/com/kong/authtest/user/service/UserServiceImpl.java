package com.kong.authtest.user.service;

import com.kong.authtest.user.dto.UserDto;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service("UserService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Override

    public boolean addUser(UserDto userDto) {
        // 아이디 중복 체크.
        if (userRepository.findUserByUserId(userDto.getUserId()) == null) {
            userRepository.save(User.builder()
                    .name(userDto.getName())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .userId(userDto.getUserId())
                    .build());
            return true;
        }
        return false;
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findUserById(id).orElseThrow(() -> new IllegalArgumentException("asdasdsad"));
    }

    @Override
    public User getUserByUserId(String UserId) {
        return userRepository.findUserByUserId(UserId);
    }

    @Override
    public User getUserByName(String username) {
        return userRepository.findUserByName(username);
    }
}
