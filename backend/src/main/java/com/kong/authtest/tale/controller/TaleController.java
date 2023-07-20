package com.kong.authtest.tale.controller;

import com.kong.authtest.images.dto.ImagesDtoRequest;
import com.kong.authtest.images.dto.ImagesDtoResponse;
import com.kong.authtest.story.dto.StoryDtoRequest;
import com.kong.authtest.story.model.Story;
import com.kong.authtest.story.repository.StoryRepository;
import com.kong.authtest.tale.dto.TaleDtoGetRequest;
import com.kong.authtest.tale.dto.TaleDtoGetResponse;
import com.kong.authtest.tale.dto.TaleDtoRequest;
import com.kong.authtest.tale.dto.TaleDtoResponse;
import com.kong.authtest.tale.service.TaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/tale")
@RequiredArgsConstructor
@Slf4j
@RestController
@CrossOrigin("*")
public class TaleController {

    private final TaleService taleService;

    @PostMapping
    public ResponseEntity<TaleDtoResponse> register (@RequestBody TaleDtoRequest taleDtoRequest){
        return ResponseEntity.ok(taleService.register(taleDtoRequest));
    }

    @PostMapping("/info")
    public ResponseEntity<TaleDtoGetResponse> getTaleResponse(@RequestBody TaleDtoGetRequest taleDtoGetRequest){
        return ResponseEntity.ok(taleService.getTaleInfo(taleDtoGetRequest));
    }

}
