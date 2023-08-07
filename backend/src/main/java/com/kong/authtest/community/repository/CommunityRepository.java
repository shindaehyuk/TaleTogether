package com.kong.authtest.community.repository;

import com.kong.authtest.community.model.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
}
