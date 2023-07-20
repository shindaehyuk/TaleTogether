package com.kong.authtest.story.service;

import com.kong.authtest.story.dto.StoryDtoRequest;
import com.kong.authtest.story.dto.StoryDtoResponse;
import com.kong.authtest.story.repository.StoryRepository;
import com.kong.authtest.tale.repository.TaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class StoryService {
    private final StoryRepository storyRepository;
    private final TaleRepository taleRepository;

    @Transactional
    public StoryDtoResponse register(StoryDtoRequest storyDtoRequest){
        return new StoryDtoResponse(storyRepository.save(storyDtoRequest.toStory()
                .addTale(taleRepository.findById(storyDtoRequest.getTaleId())
                        .orElseThrow(() ->
                new IllegalArgumentException("taleId 잘못줬음")))));
    }
}
