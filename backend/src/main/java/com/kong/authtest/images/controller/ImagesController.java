package com.kong.authtest.images.controller;

import com.kong.authtest.images.dto.ImagesDtoRequest;
import com.kong.authtest.images.dto.ImagesDtoResponse;
import com.kong.authtest.images.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/images")
@RequiredArgsConstructor
@Slf4j
@RestController
@CrossOrigin("*")
public class ImagesController {
    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<ImagesDtoResponse> register (@RequestBody ImagesDtoRequest imagesDtoRequest, Long taleId){
        return ResponseEntity.ok(imageService.register(imagesDtoRequest, taleId));
    }
}
