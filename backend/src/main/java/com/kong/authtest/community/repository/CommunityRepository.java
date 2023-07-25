package com.kong.authtest.community.repository;

import com.kong.authtest.community.model.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {
}
