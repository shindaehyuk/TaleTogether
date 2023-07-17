package com.kong.authtest.user.repository;

import com.kong.authtest.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer>, UserRepositoryCustom{
    Optional<User> findUserById(int id);
    User findUserByUserId(String userId);
    User findUserByName(String userName);
}
