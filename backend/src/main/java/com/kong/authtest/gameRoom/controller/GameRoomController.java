package com.kong.authtest.gameRoom.controller;


import com.kong.authtest.gameRoom.dto.GameRoomDeleteResponse;
import com.kong.authtest.gameRoom.dto.GameRoomRequest;
import com.kong.authtest.gameRoom.dto.GameRoomResponse;
import com.kong.authtest.gameRoom.service.GameRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GameRoomController {

    private final GameRoomService gameRoomService;

    @RequestMapping(value = "/register-game/{userId}", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<GameRoomResponse> registerGame(@PathVariable String userId) {
        return ResponseEntity.ok(gameRoomService.registerGame(userId));
    }

    @DeleteMapping("/delete-game")
    public ResponseEntity<GameRoomDeleteResponse> deleteGame(@RequestBody GameRoomRequest gameRoomRequest) {
        return ResponseEntity.ok(gameRoomService.deleteGame(gameRoomRequest));
    }

    @GetMapping("{userId}/enter-game/{sessionId}")
    public ResponseEntity<GameRoomResponse> enterGame(@PathVariable("userId") String userId,
                                                      @PathVariable("sessionId") String sessionId){
        return ResponseEntity.ok(gameRoomService.enterGame(userId,sessionId));
    }
}
