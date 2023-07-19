package com.kong.authtest.story.dto;

import com.kong.authtest.story.model.Story;
import com.kong.authtest.tale.service.TaleService;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StoryDtoRequest {
    private Long storyId;
    private String story;
    private int sequence;

    public Story toStory(){
        return Story.builder()
                .storyId(this.storyId)
                .story(this.story)
                .sequence(this.sequence)
                .build();
    }
}
