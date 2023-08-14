package com.kong.authtest.tale.controller;

import antlr.Token;
import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.tale.dto.TaleDtoGetResponse;
import com.kong.authtest.tale.dto.TaleDtoRequest;
import com.kong.authtest.tale.dto.TaleDtoResponse;
import com.kong.authtest.tale.service.TaleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@RequestMapping("/api/tale")
@RequiredArgsConstructor
@Slf4j
@RestController
@Api(tags = "tale")
public class TaleController {

    private final TaleService taleService;

    @PostMapping("/register")
    @ApiOperation(value = "tale 작성 API", notes = "taleId와 userId만 작성되며, userId가 필요한 API", response = TaleDtoResponse.class)
    public ResponseEntity<TaleDtoResponse> register(@RequestBody TaleDtoRequest taleDtoRequest, final Authentication authentication) {
        taleDtoRequest.setUserId((String) authentication.getPrincipal());
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

    @GetMapping("/info/all")
    @ApiOperation(value = "userId에 맞는 모든 tale 가져오는 API", notes = "userId에 해당되는 모든 tale을 가져온다")
    public ResponseEntity<List<TaleDtoGetResponse>> getAllTale(final Authentication authentication) {
        return ResponseEntity.ok(taleService.getAllTaleByUserId((String) authentication.getPrincipal()));
    }

}
