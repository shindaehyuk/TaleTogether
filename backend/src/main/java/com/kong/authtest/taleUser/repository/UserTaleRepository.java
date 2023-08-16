package com.kong.authtest.taleUser.repository;

import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.taleUser.domain.UserTale;
import com.kong.authtest.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTaleRepository extends JpaRepository<UserTale, Long> {

    List<UserTale> findUserTalesByUser(User user);
}
