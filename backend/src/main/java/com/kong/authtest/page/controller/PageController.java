package com.kong.authtest.page.controller;

import com.kong.authtest.page.dto.PageDtoPutRequest;
import com.kong.authtest.page.dto.PageDtoRequest;
import com.kong.authtest.page.dto.PageDtoResponse;
import com.kong.authtest.page.service.PageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/page")
@RequiredArgsConstructor
@Slf4j
@RestController
@CrossOrigin("*")
public class PageController {
    private final PageService pageService;

    @PostMapping
    public ResponseEntity<PageDtoResponse> register(@RequestBody PageDtoRequest PageDtoRequest) {
        return ResponseEntity.ok(pageService.register(PageDtoRequest));
    }

    @GetMapping("/detail/{postId}")
    public ResponseEntity<PageDtoResponse> detail(@PathVariable Long postId) {
        return ResponseEntity.ok(pageService.detail(postId));
    }

    @PutMapping("/modfiy")
    public ResponseEntity<PageDtoResponse> modify(@RequestBody PageDtoPutRequest pageDtoPutRequest){
        return ResponseEntity.ok(pageService.modify(pageDtoPutRequest));
    }

    @DeleteMapping("/delete/{pageId}")
    public ResponseEntity<Boolean> delete(@PathVariable Long pageId){
        pageService.delete(pageId);
        return ResponseEntity.ok(true);
    }
}
