package com.kong.authtest.user.service;

import com.kong.authtest.user.dto.UserDto;
import com.kong.authtest.user.model.User;

public interface UserService {
    boolean addUser(UserDto userDto);
    User getUserById(final Long id);
    User getUserByUserId(final String userId);
    User getUserByName(String username);
}
