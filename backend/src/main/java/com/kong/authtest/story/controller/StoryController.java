package com.kong.authtest.story.controller;

import com.kong.authtest.story.dto.StoryDtoRequest;
import com.kong.authtest.story.dto.StoryDtoResponse;
import com.kong.authtest.story.service.StoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/story")
@RequiredArgsConstructor
@Slf4j
@RestController
@CrossOrigin("*")
public class StoryController {
    private final StoryService storyService;

    @PostMapping
    public ResponseEntity<StoryDtoResponse> register (@RequestBody StoryDtoRequest storyDtoRequest){
        return ResponseEntity.ok(storyService.register(storyDtoRequest));
    }

}
