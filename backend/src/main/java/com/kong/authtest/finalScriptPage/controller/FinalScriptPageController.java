package com.kong.authtest.finalScriptPage.controller;


import com.kong.authtest.finalScriptPage.dto.FinalScriptPageResponse;
import com.kong.authtest.finalScriptPage.service.FinalScriptPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FinalScriptPageController {

    private final FinalScriptPageService finalScriptPageService;

    @GetMapping("/get-finalScript/{taleId}")
    public ResponseEntity<List<FinalScriptPageResponse>> findAll(@PathVariable Long taleId,
                                                                 final Authentication authentication) {
        return ResponseEntity.ok(finalScriptPageService.findAll(taleId));

    }
}
