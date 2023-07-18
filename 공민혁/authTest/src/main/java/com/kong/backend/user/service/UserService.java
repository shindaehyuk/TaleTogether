package com.kong.backend.user.service;

import com.kong.backend.user.dto.UserDto;
import com.kong.backend.user.model.User;

public interface UserService {
    boolean addUser(UserDto userDto);
    User getUserById(final String userId);
    User getUserByName(String username);
}
