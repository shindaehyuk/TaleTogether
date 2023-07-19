package com.kong.authtest.story.dto;

import com.kong.authtest.story.model.Story;
import lombok.Data;

@Data
public class StoryDtoResponse {
    private String story;

    public StoryDtoResponse(Story storyEntity){
        this.story = storyEntity.getStory();
    }
}
