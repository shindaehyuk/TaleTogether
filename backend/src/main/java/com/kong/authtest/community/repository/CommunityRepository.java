package com.kong.authtest.community.repository;

import com.kong.authtest.community.model.Community;
import com.kong.authtest.likes.model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
}