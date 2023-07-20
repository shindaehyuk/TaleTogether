package com.kong.authtest.tale.controller;

import com.kong.authtest.tale.dto.TaleDtoGetResponse;
import com.kong.authtest.tale.dto.TaleDtoRequest;
import com.kong.authtest.tale.dto.TaleDtoResponse;
import com.kong.authtest.tale.service.TaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/info/{taleId}")
    public ResponseEntity<TaleDtoGetResponse> getTaleResponse(@PathVariable Long taleId){
        return ResponseEntity.ok(taleService.getTaleInfo(taleId));
    }
//
//    @DeleteMapping
//    public void deleteTale(@RequestBody TaleDtoGetRequest taleDtoGetRequest){
//         if(deleteTale(taleDtoGetRequest)){
//             System.out.println("success");
//         }else {
//             System.out.println("fail");
//         }
//    }
}
