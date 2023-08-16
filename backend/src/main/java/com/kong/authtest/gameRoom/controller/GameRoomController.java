package com.kong.authtest.gameRoom.controller;


import com.kong.authtest.auth.service.TokenService;
import com.kong.authtest.gameRoom.dto.GameRoomDeleteResponse;
import com.kong.authtest.gameRoom.dto.GameRoomRequest;
import com.kong.authtest.gameRoom.dto.GameRoomResponse;
import com.kong.authtest.gameRoom.service.GameRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import static com.kong.authtest.auth.util.JwtTokenUtil.HEADER_STRING;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GameRoomController {

    private final GameRoomService gameRoomService;

    @RequestMapping(value = "/register-game", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<GameRoomResponse> registerGame(final Authentication authentication) {
        return ResponseEntity.ok(gameRoomService.registerGame((String) authentication.getPrincipal()));
    }

    @DeleteMapping("/delete-game")
    public ResponseEntity<GameRoomDeleteResponse> deleteGame(@RequestBody GameRoomRequest gameRoomRequest) {
        return ResponseEntity.ok(gameRoomService.deleteGame(gameRoomRequest));
    }

    @GetMapping("/enter-game/{sessionId}")
    public ResponseEntity<GameRoomResponse> enterGame(final Authentication authentication,
                                                      @PathVariable("sessionId") String sessionId) {
        return ResponseEntity.ok(gameRoomService.enterGame((String) authentication.getPrincipal(), sessionId));
    }
}
