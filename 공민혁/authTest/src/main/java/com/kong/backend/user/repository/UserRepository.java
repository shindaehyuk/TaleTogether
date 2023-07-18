package com.kong.backend.user.repository;

import com.kong.backend.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer>, UserRepositoryCustom{
    User findUserById(String userId);
    User findUserByName(String userName);
}
