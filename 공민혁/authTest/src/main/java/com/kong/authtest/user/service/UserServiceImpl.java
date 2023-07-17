package com.kong.authtest.user.service;

import com.kong.authtest.user.dto.UserDto;
import com.kong.authtest.user.model.User;
import com.kong.authtest.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("UserService")
public class UserServiceImpl implements UserService{
    UserRepository userRepository;

    BCryptPasswordEncoder passwordEncoder;

    @Override
    public boolean addUser(UserDto userDto) {
        // 아이디 중복 체크.
        if(userRepository.findUserById(userDto.getId()) == null){
            userRepository.save(User.builder()
                    .id(userDto.getId())
                    .department(userDto.getDepartment())
                    .name(userDto.getName())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .position(userDto.getPosition())
                    .build());
            return true;
        }
        return false;
    }

    @Override
    public User getUserById(String userId) {
        return userRepository.findUserById(userId);
    }

    @Override
    public User getUserByName(String username){
        return userRepository.findUserByName(username);
    }
}
