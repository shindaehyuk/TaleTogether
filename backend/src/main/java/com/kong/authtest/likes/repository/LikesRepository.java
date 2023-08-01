package com.kong.authtest.likes.repository;

import com.kong.authtest.community.model.Community;
import com.kong.authtest.likes.model.Likes;
import com.kong.authtest.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> deleteByUserAndCommunity(User user, Community community);

    Optional<Likes> findLikesByUserAndCommunity(User user,Community community);

    Long countByCommunity(Community community);

}
