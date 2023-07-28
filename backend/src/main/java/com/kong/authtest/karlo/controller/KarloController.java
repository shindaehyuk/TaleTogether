package com.kong.authtest.karlo.controller;


import com.kong.authtest.karlo.dto.KarloRequest;
import com.kong.authtest.karlo.dto.KarloResponse;
import com.kong.authtest.karlo.service.KarloService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KarloController {

    private final KarloService karloService;


    @PostMapping("/create-image")
    public ResponseEntity<KarloResponse> createImage(@RequestBody KarloRequest karloRequest) throws Exception {
        return ResponseEntity.ok(karloService.createImage(karloRequest));
    }

}
