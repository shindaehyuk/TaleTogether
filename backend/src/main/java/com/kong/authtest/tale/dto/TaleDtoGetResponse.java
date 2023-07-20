package com.kong.authtest.tale.dto;

import com.kong.authtest.images.dto.ImagesDtoResponse;
import com.kong.authtest.story.dto.StoryDtoResponse;
import com.kong.authtest.tale.model.Tale;
import lombok.Data;

import java.util.List;

@Data
public class TaleDtoGetResponse {
    private Long taleId;
    private List<StoryDtoResponse> storyList;
    private List<ImagesDtoResponse> imageList;


    public TaleDtoGetResponse (Tale tale){
        this.taleId = tale.getTaleId();
    }
}
