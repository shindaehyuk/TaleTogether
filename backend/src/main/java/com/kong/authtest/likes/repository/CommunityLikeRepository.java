package com.kong.authtest.likes.repository;

import com.kong.authtest.community.model.Community;
import com.kong.authtest.likes.model.CommunityLike;
import com.kong.authtest.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {
    Optional<CommunityLike> deleteByUserAndCommunity(User user, Community community);

    Optional<CommunityLike> findLikesByUserAndCommunity(User user, Community community);

    List<CommunityLike> findCommunityLikesByUser(User user);
    Long countByCommunity(Community community);

}
