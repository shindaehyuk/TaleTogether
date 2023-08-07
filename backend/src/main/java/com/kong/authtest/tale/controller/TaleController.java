package com.kong.authtest.tale.controller;

import com.kong.authtest.tale.dto.TaleDtoGetResponse;
import com.kong.authtest.tale.dto.TaleDtoRequest;
import com.kong.authtest.tale.dto.TaleDtoResponse;
import com.kong.authtest.tale.service.TaleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/tale")
@RequiredArgsConstructor
@Slf4j
@RestController
@CrossOrigin("*")
@Api(tags = "tale")
public class TaleController {

    private final TaleService taleService;

    @PostMapping("/register")
    @ApiOperation(value = "tale 작성 API", notes = "taleId와 userId만 작성되며, userId가 필요한 API", response = TaleDtoResponse.class)
    public ResponseEntity<TaleDtoResponse> register(@RequestBody TaleDtoRequest taleDtoRequest) {
        return ResponseEntity.ok(taleService.register(taleDtoRequest));
    }

    @GetMapping("/info/{taleId}")
    @ApiOperation(value = "tale 정보 얻는 API", notes = "taleId에 해당된 페이지 정보도 같이 가져오는 API", response = TaleDtoGetResponse.class)
    public ResponseEntity<TaleDtoGetResponse> getTaleResponse(@PathVariable Long taleId) {
        return ResponseEntity.ok(taleService.getTaleInfo(taleId));
    }

    @DeleteMapping("/delete/{taleId}")
    @ApiOperation(value = "tale 삭제하는 API", notes = "taleId에 해당되는 tale, page, community, comment 모두 삭제된다.", response = Boolean.class)
    public ResponseEntity<Boolean> delete(@PathVariable Long taleId) {
        taleService.delete(taleId);
        return ResponseEntity.ok(true);
    }

}
