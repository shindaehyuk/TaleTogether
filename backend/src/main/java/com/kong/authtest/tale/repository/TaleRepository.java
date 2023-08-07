package com.kong.authtest.tale.repository;

import com.kong.authtest.tale.dto.TaleDtoGetResponse;
import com.kong.authtest.tale.model.Tale;
import com.kong.authtest.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface TaleRepository extends JpaRepository<Tale, Long> {
    List<Tale> findAllByUser(User user);

}
