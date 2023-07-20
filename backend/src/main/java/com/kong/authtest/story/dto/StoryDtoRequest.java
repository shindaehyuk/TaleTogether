package com.kong.authtest.story.dto;

import com.kong.authtest.story.model.Story;
import com.kong.authtest.tale.service.TaleService;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StoryDtoRequest {
    private String story;
    private int sequence;
    private Long taleId;

    public Story toStory(){
        return Story.builder()
                .story(this.story)
                .sequence(this.sequence)
                .build();
    }
}
