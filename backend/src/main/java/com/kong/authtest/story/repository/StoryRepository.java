package com.kong.authtest.story.repository;

import com.kong.authtest.story.dto.StoryDtoResponse;
import com.kong.authtest.story.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepository  extends JpaRepository<Story, Long> {
}
