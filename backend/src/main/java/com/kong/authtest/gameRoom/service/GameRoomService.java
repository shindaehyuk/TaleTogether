package com.kong.authtest.gameRoom.service;

import com.kong.authtest.gameRoom.domain.GameRoom;
import com.kong.authtest.gameRoom.dto.GameRoomDeleteResponse;
import com.kong.authtest.gameRoom.dto.GameRoomRequest;
import com.kong.authtest.gameRoom.dto.GameRoomResponse;
import com.kong.authtest.gameRoom.repository.GameRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GameRoomService {

    private final GameRoomRepository gameRoomRepository;

    private final static String CODE = "ssafy";

    @Transactional
    public GameRoomResponse registerGame() {

        String code = generateCode();

        GameRoomResponse gameRoomResponse = new GameRoomResponse();
        gameRoomResponse.setSessionId(code);
        gameRoomResponse.setTimeStamp(LocalDateTime.now());

        GameRoom gameRoom = GameRoom.builder().sessionId(code).timestamp(LocalDateTime.now()).build();
        gameRoomRepository.save(gameRoom);

        return gameRoomResponse;
    }

    public GameRoomResponse enterGame(String sessionId) {
        return new GameRoomResponse(findGameRoomBySessionId(sessionId));
    }

    private GameRoom findGameRoomBySessionId(String sessionId) {
        return gameRoomRepository.findGameRoomBySessionId(sessionId).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 방"));
    }

    @Transactional
    public GameRoomDeleteResponse deleteGame(GameRoomRequest gameRoomRequest) {
        findGameRoomBySessionId(gameRoomRequest);
        gameRoomRepository.delete(gameRoomRequest.ToGameRoom());
        return new GameRoomDeleteResponse("정상적 으로 삭제됨");
    }

    private GameRoom findGameRoomBySessionId(GameRoomRequest gameRoomRequest) {
        return gameRoomRepository.findGameRoomBySessionId(gameRoomRequest.getSessionId())
                .orElseThrow(() -> new IllegalArgumentException("존재 하지 않는 게임방"));
    }

    private String generateCode() {
        Random rand = new Random();
        int randomNumber = rand.nextInt(9000) + 1000;  // generates a random number between 1000 and 9999
        return CODE + randomNumber;
    }
}
