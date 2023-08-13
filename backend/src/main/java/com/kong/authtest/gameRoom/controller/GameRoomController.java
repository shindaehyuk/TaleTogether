package com.kong.authtest.gameRoom.controller;


import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.gameRoom.dto.GameRoomDeleteResponse;
import com.kong.authtest.gameRoom.dto.GameRoomRequest;
import com.kong.authtest.gameRoom.dto.GameRoomResponse;
import com.kong.authtest.gameRoom.service.GameRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GameRoomController {

    private final GameRoomService gameRoomService;
    private final TokenService tokenService;
    @RequestMapping(value = "/register-game", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> registerGame(@RequestHeader(HEADER_STRING) String token) {
        try {
            return ResponseEntity.ok(gameRoomService.registerGame(tokenService.decodeUserId(token)));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("registerGame 오류");
        }
    }

    @DeleteMapping("/delete-game")
    public ResponseEntity<?> deleteGame(@RequestBody GameRoomRequest gameRoomRequest) {
        try {
            return ResponseEntity.ok(gameRoomService.deleteGame(gameRoomRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("deleteGame 오류");
        }
    }

    @GetMapping("/enter-game/{sessionId}")
    public ResponseEntity<?> enterGame(@RequestHeader(HEADER_STRING) String token,
                                                      @PathVariable("sessionId") String sessionId){
        try {
            return ResponseEntity.ok(gameRoomService.enterGame(tokenService.decodeUserId(token),sessionId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("enterGame 오류");
        }
    }
}
