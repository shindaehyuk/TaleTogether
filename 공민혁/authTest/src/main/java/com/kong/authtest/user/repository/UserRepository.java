package com.kong.authtest.user.repository;

import com.kong.authtest.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer>, UserRepositoryCustom{
    User findUserById();
}
