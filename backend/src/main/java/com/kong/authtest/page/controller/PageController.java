package com.kong.authtest.page.controller;

import com.kong.authtest.page.dto.PageDtoPutRequest;
import com.kong.authtest.page.dto.PageDtoRequest;
import com.kong.authtest.page.dto.PageDtoResponse;
import com.kong.authtest.page.service.PageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/page")
@RequiredArgsConstructor
@Slf4j
@RestController
@CrossOrigin("*")
@Api(tags = "page")
public class PageController {
    private final PageService pageService;

    @PostMapping
    @ApiOperation(value = "page를 작성하는 API", notes = "page를 작성하기 위한 API, content, image, taleId가 필요하다.", response = PageDtoResponse.class)
    public ResponseEntity<PageDtoResponse> register(@RequestBody PageDtoRequest PageDtoRequest) {
        return ResponseEntity.ok(pageService.register(PageDtoRequest));
    }

    @GetMapping("/detail/{pageId}")
    @ApiOperation(value = "page 정보를 얻기위한 API", notes = "page 정보를 얻기위한 API, pageId가 필요하다", response = PageDtoResponse.class)
    public ResponseEntity<PageDtoResponse> detail(@PathVariable Long pageId) {
        return ResponseEntity.ok(pageService.detail(pageId));
    }

    @PutMapping("/modfiy")
    @ApiOperation(value = "page 정보를 수정하기위한 API", notes = "page정보를 수정하기 위해, image, content, sequence, pageId가 필요하다.", response = PageDtoResponse.class)
    public ResponseEntity<PageDtoResponse> modify(@RequestBody PageDtoPutRequest pageDtoPutRequest) {
        return ResponseEntity.ok(pageService.modify(pageDtoPutRequest));
    }

    @DeleteMapping("/delete/{pageId}")
    @ApiOperation(value = "page 정보를 삭제하기 위한 API", notes = "page 정보를 삭제하기 위해 pageId가 필요하다.", response = Boolean.class)
    public ResponseEntity<Boolean> delete(@PathVariable Long pageId) {
        pageService.delete(pageId);
        return ResponseEntity.ok(true);
    }
}
